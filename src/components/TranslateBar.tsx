"use client";

import { useState, useEffect } from "react";
import styles from "./TranslateBar.module.css";

const INDIAN_LANGUAGES = [
  { code: "hi", native: "हिन्दी", label: "Hindi" },
  { code: "te", native: "తెలుగు", label: "Telugu" },
  { code: "ta", native: "தமிழ்", label: "Tamil" },
  { code: "bn", native: "বাংলা", label: "Bengali" },
  { code: "mr", native: "मराठी", label: "Marathi" },
  { code: "kn", native: "ಕನ್ನಡ", label: "Kannada" },
  { code: "ml", native: "മലയാളം", label: "Malayalam" },
  { code: "gu", native: "ગુજરાતી", label: "Gujarati" },
  { code: "pa", native: "ਪੰਜਾਬੀ", label: "Punjabi" },
  { code: "or", native: "ଓଡ଼ିଆ", label: "Odia" },
  { code: "as", native: "অসমীয়া", label: "Assamese" },
  { code: "ur", native: "اردو", label: "Urdu" },
];

declare global {
  interface Window {
    googleTranslateElementInit?: () => void;
    google?: {
      translate?: {
        TranslateElement?: new (options: { pageLanguage: string; layout?: number }, el: string) => void;
      };
    };
  }
}

export default function TranslateBar() {
  const [activeLang, setActiveLang] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);

    // Inject Google Translate script
    const existing = document.getElementById("google-translate-script");
    if (!existing) {
      window.googleTranslateElementInit = () => {
        if (window.google?.translate?.TranslateElement) {
          new window.google.translate.TranslateElement(
            { pageLanguage: "en", layout: 0 },
            "google_translate_element"
          );
        }
      };

      const script = document.createElement("script");
      script.id = "google-translate-script";
      script.src =
        "//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
      script.async = true;
      document.body.appendChild(script);
    }
  }, []);

  const triggerTranslation = (langCode: string) => {
    setActiveLang(langCode);

    const tryTranslate = (attempts = 0) => {
      const select = document.querySelector<HTMLSelectElement>(
        ".goog-te-combo"
      );
      if (select) {
        select.value = langCode;
        select.dispatchEvent(new Event("change"));
      } else if (attempts < 20) {
        setTimeout(() => tryTranslate(attempts + 1), 300);
      }
    };

    tryTranslate();
  };

  const resetToEnglish = () => {
    setActiveLang(null);
    const iframe = document.querySelector<HTMLIFrameElement>(".goog-te-banner-frame");
    if (iframe) {
      const innerDoc = iframe.contentDocument || iframe.contentWindow?.document;
      const restoreBtn = innerDoc?.querySelector<HTMLElement>(".goog-te-banner-frame");
      restoreBtn?.click();
    }
    // Fallback: reload page
    const select = document.querySelector<HTMLSelectElement>(".goog-te-combo");
    if (select) {
      select.value = "en";
      select.dispatchEvent(new Event("change"));
    }
  };

  if (!mounted) return null;

  return (
    <div className={styles.bar} id="translate-bar">
      {/* Hidden Google Translate Element */}
      <div id="google_translate_element" style={{ display: "none" }} />

      <div className={styles.inner}>
        <span className={styles.label}>
          <i className="fa-solid fa-globe" />
          <span>Translate</span>
        </span>

        <div className={styles.langList}>
          {INDIAN_LANGUAGES.map((lang) => (
            <button
              key={lang.code}
              className={`${styles.langBtn} ${activeLang === lang.code ? styles.active : ""}`}
              onClick={() => triggerTranslation(lang.code)}
              title={lang.label}
              aria-label={`Translate to ${lang.label}`}
            >
              {lang.native}
            </button>
          ))}
        </div>

        {activeLang && (
          <button className={styles.resetBtn} onClick={resetToEnglish} title="Reset to English">
            <i className="fa-solid fa-xmark" />
            <span>English</span>
          </button>
        )}
      </div>
    </div>
  );
}
