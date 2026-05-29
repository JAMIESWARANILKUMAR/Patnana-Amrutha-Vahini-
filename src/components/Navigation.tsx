"use client";

import { useState, useEffect } from "react";
import styles from "./Navigation.module.css";
import { motion, AnimatePresence } from "framer-motion";

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);

      // Detect active section
      const sections = document.querySelectorAll("section");
      let current = "";
      sections.forEach((section) => {
        const sectionTop = section.offsetTop;
        if (window.scrollY >= sectionTop - 250) {
          current = section.getAttribute("id") || "";
        }
      });
      setActiveSection(current);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "About", href: "#about" },
    { name: "Education", href: "#education" },
    { name: "Skills", href: "#skills" },
    { name: "Experience", href: "#experience" },
    { name: "Certifications", href: "#certifications" },
    { name: "Projects", href: "#projects" },
  ];

  return (
    <>
      {/* Centered Floating Dock for Desktop */}
      <motion.div 
        className={`${styles.dockContainer} ${scrolled ? styles.dockScrolled : ""}`}
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
      >
        <div className={styles.dock}>
          <div className={styles.logo} onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
            PA
          </div>
          
          <nav className={styles.desktopNav}>
            {navLinks.map((link) => {
              const isActive = activeSection === link.href.substring(1);
              return (
                <a key={link.name} href={link.href} className={`${styles.navLink} ${isActive ? styles.activeText : ""}`}>
                  {isActive && (
                    <motion.div 
                      layoutId="activeDockPill"
                      className={styles.activePill}
                      transition={{ type: "spring", stiffness: 400, damping: 30 }}
                    />
                  )}
                  <span className={styles.navText}>{link.name}</span>
                </a>
              );
            })}
          </nav>

          <a href="#contact" className={styles.contactBtn}>
            Contact
          </a>

          <button 
            className={`${styles.menuToggle} ${isOpen ? styles.open : ""}`} 
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </motion.div>

      {/* Mobile Fullscreen Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            className={styles.mobileMenuOverlay}
            initial={{ opacity: 0, backdropFilter: "blur(0px)" }}
            animate={{ opacity: 1, backdropFilter: "blur(20px)" }}
            exit={{ opacity: 0, backdropFilter: "blur(0px)" }}
          >
            <motion.nav 
              className={styles.mobileNavLinks}
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.1 }}
            >
              {navLinks.map((link) => (
                <a 
                  key={link.name} 
                  href={link.href} 
                  className={styles.mobileNavLink}
                  onClick={() => setIsOpen(false)}
                >
                  {link.name}
                </a>
              ))}
              <a 
                href="#contact" 
                className={styles.mobileContactBtn}
                onClick={() => setIsOpen(false)}
              >
                Let's Talk
              </a>
            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
