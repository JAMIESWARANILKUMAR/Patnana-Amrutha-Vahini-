"use client";

import Image from "next/image";
import styles from "./AboutSection.module.css";
import { useEffect, useRef } from "react";
import SectionHeading from "./SectionHeading";
import { motion, useScroll, useTransform, useMotionValue, useSpring } from "framer-motion";

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
  hidden: { opacity: 0, scale: 0.85, y: 10 },
  visible: (i = 0) => ({
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { delay: 0.16 * i, type: "spring" as const, stiffness: 130, damping: 16 }
  })
};

export default function AboutSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  const imageY = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);

  // 3D interaction motion values for the portrait card
  const mvX = useMotionValue(0);
  const mvY = useMotionValue(0);
  const rotateX = useSpring(useTransform(mvY, [-0.5, 0.5], [18, -18]), { stiffness: 220, damping: 30 });
  const rotateY = useSpring(useTransform(mvX, [-0.5, 0.5], [-18, 18]), { stiffness: 220, damping: 30 });

  const handlePointerMove = (e: React.PointerEvent) => {
    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    mvX.set(x);
    mvY.set(y);
  };

  const handlePointerLeave = () => {
    mvX.set(0);
    mvY.set(0);
  };

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
              viewport={{ once: true, margin: "-120px" }}
              transition={{ duration: 0.9, ease: "easeOut" }}
              onPointerMove={handlePointerMove}
              onPointerLeave={handlePointerLeave}
              style={{ rotateX, rotateY, transformStyle: "preserve-3d" as any }}
            >
              <motion.div 
                className={styles.imageInner}
                style={{ y: imageY }}
              >
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
              <div className={styles.imageOverlay} />

              {/* pulsing halo */}
              <motion.div className={styles.halo} aria-hidden="true" initial={{ opacity: 0.6, scale: 0.96 }} animate={{ opacity: [0.6, 0.14, 0.6], scale: [1, 1.2, 1] }} transition={{ repeat: Infinity, duration: 3.6, ease: "easeInOut" }} />

              {/* Floating premium badges — staggered */}
              <motion.div className={styles.badgeContainer} initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
                <motion.div className={styles.floatingBadge} custom={0} variants={badgeVariants} initial="hidden" whileInView="visible" viewport={{ once: true }} whileHover={{ scale: 1.06 }}>
                  <div className={styles.badgeIcon}><i className="fa-solid fa-robot"></i></div>
                  <div className={styles.badgeText}><strong>AI · ML</strong><span>Modeling & CV</span></div>
                </motion.div>

                <motion.div className={`${styles.floatingBadge} ${styles.badgeSecondary}`} custom={1} variants={badgeVariants} initial="hidden" whileInView="visible" viewport={{ once: true }} whileHover={{ scale: 1.06 }}>
                  <div className={styles.badgeIcon}><i className="fa-solid fa-atom"></i></div>
                  <div className={styles.badgeText}><strong>Open to Work</strong><span>Internships & Projects</span></div>
                </motion.div>
              </motion.div>
            </motion.div>
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
