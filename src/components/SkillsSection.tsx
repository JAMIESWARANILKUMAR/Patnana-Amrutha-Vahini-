"use client";

import styles from "./SkillsSection.module.css";
import SectionHeading from "./SectionHeading";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { ReactNode } from "react";

const skillsData = [
  {
    category: "Programming Languages",
    skills: ["C++", "Java", "Python"],
    badges: ["Algorithmic Thinking", "OOP", "Scripting"],
  },
  {
    category: "Web Development",
    skills: ["HTML", "CSS", "JavaScript"],
    badges: ["Responsive UI", "Accessibility", "Frontend"],
  },
  {
    category: "Data & Tools",
    skills: ["MongoDB", "Computer Vision (Python)", "FastAPI"],
    badges: ["Modeling", "APIs", "Deployment"],
  },
  {
    category: "Operating Systems",
    skills: ["Windows"],
    badges: ["Desktop Dev"],
  },
];

const HolographicCard = ({ children }: { children: ReactNode }) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["10deg", "-10deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-10deg", "10deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <div style={{ perspective: 1000 }} className={styles.perspectiveWrapper}>
      <motion.div
        className={styles.hologramCard}
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        whileHover={{ scale: 1.05 }}
        transition={{ type: "spring", stiffness: 400, damping: 30 }}
      >
        <div className={styles.hologramGlare} />
        {children}
      </motion.div>
    </div>
  );
};

export default function SkillsSection() {
  const marqueeText = "AI · ML · Web Development · Computer Vision · FastAPI · MongoDB · ";

  return (
    <section className={styles.skills} id="skills">
      
      {/* Infinite Marquee Background */}
      <div className={styles.marqueeContainer}>
        <motion.div 
          className={styles.marqueeTrack}
          animate={{ x: ["0%", "-50%"] }}
          transition={{ ease: "linear", duration: 20, repeat: Infinity }}
        >
          <h2 className={styles.marqueeText}>{marqueeText}{marqueeText}</h2>
        </motion.div>
      </div>

      <div className={styles.container}>
        <SectionHeading title="Skills Known" subtitle="Core competencies mapped across multiple domains." />
        
        <div className={styles.grid}>
          {skillsData.map((category, idx) => (
            <HolographicCard key={idx}>
              <div className={styles.cardContent} style={{ transform: "translateZ(30px)" }}>
                <h3 className={styles.categoryTitle}>{category.category}</h3>
                <ul className={styles.skillsList}>
                  {category.skills.map((skill, sIdx) => (
                    <li key={sIdx}>{skill}</li>
                  ))}
                </ul>
                <div className={styles.badges}>
                  {category.badges.map((badge, bIdx) => (
                    <span key={bIdx} className={styles.badge}>{badge}</span>
                  ))}
                </div>
              </div>
            </HolographicCard>
          ))}
        </div>
      </div>
    </section>
  );
}
