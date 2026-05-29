"use client";

import { useRef, useEffect, useState } from "react";
import styles from "./HeroSection.module.css";
import LiveClock from "./LiveClock";
import { motion, useScroll, useTransform, useMotionValue, useSpring, AnimatePresence } from "framer-motion";

// Each letter bounces on hover; CSS handles the chrome shimmer
const HoverLetter = ({ letter, variants }: { letter: string; variants: any }) => {
  return (
    <motion.span
      variants={variants}
      style={{
        display: "inline-block",
        whiteSpace: letter === " " ? "pre" : "normal",
        cursor: "default",
      }}
      whileHover={{ scale: 1.35, y: -12, zIndex: 10 }}
      transition={{ type: "spring", stiffness: 450, damping: 14 }}
    >
      {letter}
    </motion.span>
  );
};

// Word-level wrapper that forces each word into its own premium font
const nameWords: { text: string; font: string; cls: string }[] = [
  { text: "PATNANA",        font: "'Unbounded', sans-serif",        cls: "wordPrimary" },
  { text: "AMRUTAVAHINI",  font: "'Syne', sans-serif",              cls: "wordSecondary" },
];

export default function HeroSection() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  
  const opacityText = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const scaleText = useTransform(scrollYProgress, [0, 1], [1, 0.8]);

  // Mouse Tracking Orb Physics
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 50, damping: 20 });
  const springY = useSpring(mouseY, { stiffness: 50, damping: 20 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      // Calculate position relative to the center of the screen
      const x = e.clientX - window.innerWidth / 2;
      const y = e.clientY - window.innerHeight / 2;
      mouseX.set(x);
      mouseY.set(y);
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  const welcomes = [
    { text: "Namaste", lang: "Hindi" },
    { text: "Namaskaram", lang: "Telugu" },
    { text: "Vanakkam", lang: "Tamil" },
    { text: "Nômōskar", lang: "Bengali" },
    { text: "Namaskar", lang: "Marathi" },
    { text: "Namaskara", lang: "Kannada" },
    { text: "Namaskaram", lang: "Malayalam" },
    { text: "Kem Chho", lang: "Gujarati" },
    { text: "Sat Sri Akal", lang: "Punjabi" },
    { text: "Namaskar", lang: "Odia" },
    { text: "Namaskar", lang: "Assamese" },
    { text: "Namo Namah", lang: "Sanskrit" },
    { text: "Adaab", lang: "Urdu" }
  ];

  const [welcomeIndex, setWelcomeIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setWelcomeIndex((prev) => (prev + 1) % welcomes.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const name = "PATNANA AMRUTAVAHINI";
  const nameArray = name.split("");

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.2,
      }
    }
  };
  
  const letterVariants = {
    hidden: { opacity: 0, scale: 3, filter: "blur(10px)" },
    visible: { 
      opacity: 1, 
      scale: 1, 
      filter: "blur(0px)",
      transition: { type: "spring" as const, stiffness: 150, damping: 15 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { type: "spring" as const, stiffness: 100, damping: 15, delay: 1.5 }
    }
  };

  return (
    <header className={styles.hero} id="hero" ref={ref}>
      
      {/* Interactive Glowing Orb */}
      <motion.div 
        className={styles.glowingOrb}
        style={{ x: springX, y: springY }}
      />
      <div className={styles.gridOverlay} />

      {/* Live IST clock */}
      <LiveClock />

      <motion.div 
        className={styles.content} 
        style={{ opacity: opacityText, scale: scaleText }}
      >
        <div className={styles.welcomeWrapper}>
          <AnimatePresence mode="wait">
            <motion.span
              key={welcomeIndex}
              className={styles.welcomeText}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.5 }}
            >
              {welcomes[welcomeIndex].text} <span className={styles.langLabel}>({welcomes[welcomeIndex].lang})</span>
            </motion.span>
          </AnimatePresence>
        </div>

        <motion.p 
          className={styles.eyebrow}
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          AI & ML Enthusiast • Front-end Developer
        </motion.p>
        
        <div className={styles.nameGlow}>
          <motion.h1
            className={styles.title}
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {nameWords.map((word, wi) => (
              <span
                key={wi}
                className={styles.wordGroup}
                style={{ fontFamily: word.font }}
              >
                {word.text.split("").map((letter, li) => (
                  <HoverLetter
                    key={li}
                    letter={letter}
                    variants={letterVariants}
                  />
                ))}
                {wi < nameWords.length - 1 && (
                  <motion.span
                    variants={letterVariants}
                    style={{ display: "inline-block", whiteSpace: "pre" }}
                  >
                    {" "}
                  </motion.span>
                )}
              </span>
            ))}
          </motion.h1>
        </div>
        
        <motion.p 
          className={styles.subtitle}
          variants={itemVariants}
          initial="hidden"
          animate="visible"
        >
          Motivated AI & ML student building practical ML projects and responsive web apps.
        </motion.p>
        
        <motion.p 
          className={styles.tagline}
          variants={itemVariants}
          initial="hidden"
          animate="visible"
        >
          Passionate about applying machine learning to real-world problems and building user-friendly front-end experiences.
        </motion.p>
        
        <motion.div 
          className={styles.actions}
          variants={itemVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.button 
            className={styles.primaryBtn}
            whileTap={{ scale: 0.96 }}
            onClick={() => document.getElementById("about")?.scrollIntoView({ behavior: "smooth" })}
          >
            <span className={styles.primaryBtnInner}>
              Discover More
              <i className="fa-solid fa-arrow-down" style={{ fontSize: "0.85em" }} />
            </span>
          </motion.button>
          <motion.a 
            className={styles.outlineBtn} 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            href="mailto:amruthapatnana217@gmail.com"
          >
            Get in touch
          </motion.a>
        </motion.div>
      </motion.div>
    </header>
  );
}
