"use client";

import { useEffect, useState } from "react";
import styles from "./LiveClock.module.css";

const TIMEZONES = [
  { id: "Asia/Kolkata", label: "IST (Asia/Kolkata)" },
  { id: "UTC", label: "UTC" },
  { id: "local", label: "Local" },
];

function formatForTZ(date: Date, tz: string, hideSeconds: boolean) {
  const optsTime: Intl.DateTimeFormatOptions = {
    hour: "numeric",
    minute: "numeric",
    hour12: true,
    timeZone: tz === "local" ? undefined : tz,
  };
  if (!hideSeconds) optsTime.second = "numeric";

  const time = new Intl.DateTimeFormat("en-GB", optsTime).format(date);

  const day = new Intl.DateTimeFormat("en-GB", {
    weekday: "short",
    day: "2-digit",
    month: "short",
    year: "numeric",
    timeZone: tz === "local" ? undefined : tz,
  }).format(date);

  return { time, day };
}

export default function LiveClock() {
  const [now, setNow] = useState(new Date());
  const [tz, setTz] = useState(() => typeof window !== "undefined" ? (localStorage.getItem("liveclock-tz") || "Asia/Kolkata") : "Asia/Kolkata");
  const [hideSeconds, setHideSeconds] = useState(() => typeof window !== "undefined" ? (localStorage.getItem("liveclock-hideSeconds") === "1") : false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    try { localStorage.setItem("liveclock-tz", tz); } catch {}
  }, [tz]);

  useEffect(() => {
    try { localStorage.setItem("liveclock-hideSeconds", hideSeconds ? "1" : "0"); } catch {}
  }, [hideSeconds]);

  const { time, day } = formatForTZ(now, tz, hideSeconds);

  return (
    <div className={`${styles.clock} ${styles.floating}`} aria-hidden>
      <div className={styles.topRow}>
        <div>
          <div className={styles.time} title={tz}>{time}</div>
          <div className={styles.day}>{day} {tz === "local" ? "(Local)" : tz === "UTC" ? "(UTC)" : "IST"}</div>
        </div>
        <button className={styles.settingsBtn} aria-label="Clock settings" onClick={() => setOpen((v) => !v)}>
          <i className="fa-solid fa-gear"></i>
        </button>
      </div>

      <div className={styles.controls} data-open={open ? "1" : "0"}>
        <label className={styles.controlRow}>
          <span>Timezone</span>
          <select value={tz} onChange={(e) => setTz(e.target.value)}>
            {TIMEZONES.map((t) => (
              <option key={t.id} value={t.id}>{t.label}</option>
            ))}
          </select>
        </label>

        <label className={styles.controlRow}>
          <span>Hide seconds</span>
          <input type="checkbox" checked={hideSeconds} onChange={(e) => setHideSeconds(e.target.checked)} />
        </label>
      </div>
    </div>
  );
}
