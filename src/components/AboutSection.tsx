"use client";

import Image from "next/image";
import styles from "./AboutSection.module.css";
import { useEffect, useRef } from "react";
import SectionHeading from "./SectionHeading";
import { motion, useScroll, useTransform } from "framer-motion";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.1,
    }
  }
};

const textVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { type: "spring" as const, stiffness: 100, damping: 20 }
  }
};

const badgeVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: { 
    opacity: 1, 
    scale: 1,
    transition: { type: "spring" as const, stiffness: 120, damping: 15 }
  }
};

export default function AboutSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  const imageY = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);

  return (
    <section className={styles.about} id="about" ref={sectionRef}>
      <div className={styles.container}>
        <div className={styles.grid}>
          
          {/* Left Column: Asymmetric Image Frame */}
          <div className={styles.imageColumn}>
            <motion.div 
              className={styles.imageMask}
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <motion.div style={{ y: imageY, width: "100%", height: "120%", position: "absolute", top: "-10%" }}>
                <Image 
                  src="/Amrutha.jpeg" 
                  alt="Portrait of Patnana Amrutavahini" 
                  fill
                  className={styles.image}
                  sizes="(max-width: 960px) 100vw, 50vw"
                  priority
                />
              </motion.div>
              <div className={styles.imageOverlay} />
            </motion.div>

            {/* Floating badges removed per request */}
          </div>

          {/* Right Column: Editorial Typography */}
          <div className={styles.textColumn}>
            <SectionHeading title="About Me" subtitle="Motivated AI & ML enthusiast with practical web skills." />
            
            <motion.div 
              className={styles.content}
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
            >
              <motion.h3 className={styles.headline} variants={textVariants}>
                Patnana Amrutavahini
              </motion.h3>
              
              <motion.p className={styles.paragraph} variants={textVariants}>
                Motivated AI & ML enthusiast with strong analytical and problem-solving skills. Passionate about applying machine learning to real-world problems and continuously improving technical expertise through hands-on projects. Also skilled in front-end web development for creating responsive and user-friendly web applications.
              </motion.p>
              
              <motion.ul className={styles.list} variants={containerVariants}>
                <motion.li variants={textVariants}>
                  <i className="fa-solid fa-code"></i>
                  <span>Programming: C++, Java, Python.</span>
                </motion.li>
                <motion.li variants={textVariants}>
                  <i className="fa-solid fa-laptop-code"></i>
                  <span>Web: HTML, CSS, JavaScript; front-end development.</span>
                </motion.li>
                {/* Database and OS removed as requested */}
              </motion.ul>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}
