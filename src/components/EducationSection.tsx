"use client";

import { useEffect, useState } from "react";
import styles from "./EducationSection.module.css";
import SectionHeading from "./SectionHeading";
import { motion } from "framer-motion";

const educationData = [
  { degree: "B.Tech. (CSM)", institution: "Aditya Institute of Technology and Management, Tekkali", year: "2023 – 2027", grade: "8.4 (CGPA)" },
  { degree: "Intermediate (MPC)", institution: "Sri Chaitanya Jr College, Palasa", year: "2022 – 2023", grade: "85.1%" },
  { degree: "SSC", institution: "Infant Jesus High School, Tekkali", year: "2021", grade: "100%" },
];

const listVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.16, delayChildren: 0.12 } }
};

const itemVariants = {
  hidden: { opacity: 0, x: -18 },
  visible: { opacity: 1, x: 0, transition: { type: "spring", stiffness: 140, damping: 18 } }
};

export default function EducationSection() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 800);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  return (
    <section className={isMobile ? styles.educationMobile : styles.educationDesktop} id="education">
      <div className={styles.container}>
        <SectionHeading
          title="Education"
          subtitle={isMobile ? "Tap entries to view details." : "Academic milestones — premium cards."}
        />

        <motion.div
          className={styles.grid}
          variants={listVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {educationData.map((item, idx) => (
            <motion.div key={idx} className={styles.card} variants={itemVariants} whileHover={{ y: -8 }}>
              <div className={styles.accent} />

              <div className={styles.cardContent}>
                <div className={styles.cardHeader}>
                  <h3 className={styles.degree}>{item.degree}</h3>
                  <span className={styles.gradeBadge}>{item.grade}</span>
                </div>

                <p className={styles.institution}>{item.institution}</p>
                <div className={styles.metaRow}>
                  <span className={styles.yearRange}>{item.year}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
