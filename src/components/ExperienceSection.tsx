"use client";

import styles from "./ExperienceSection.module.css";
import SectionHeading from "./SectionHeading";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const experienceData = [
  {
    title: "Web Development Intern",
    subtitle: "CodSoft",
    details: "Completed a virtual internship focused on front-end web development. Designed responsive webpages, improved UI layouts and followed best practices for clean code and deadlines.",
    date: "Aug 2024 - Sep 2024"
  },
  {
    title: "ServiceNow Internship Training Program",
    subtitle: "SmartBridge in association with ADITYA INSTITUTE OF TECHNOLOGY AND MANAGEMENT",
    details: "Completed a ServiceNow internship training program where I gained hands-on experience in platform configuration, workflow automation, forms, and client scripts. Improved technical knowledge and problem-solving skills through practical learning and projects.",
    date: "Training Program"
  },
];

export default function ExperienceSection() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"]
  });

  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section className={styles.experience} id="experience">
      <div className={styles.container}>
        <SectionHeading title="Experience" subtitle="A timeline of my professional journey." />
        
        <div className={styles.timelineContainer} ref={containerRef}>
          <motion.div className={styles.timelineLine} style={{ height: lineHeight }} />
          <div className={styles.timelineTrack} />

          {experienceData.map((item, index) => (
            <div key={index} className={styles.timelineItem}>
              <motion.div 
                className={styles.timelineDot}
                initial={{ scale: 0, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.4, delay: 0.2 }}
              />
              <motion.div 
                className={styles.timelineContent}
                initial={{ opacity: 0, x: index % 2 === 0 ? 50 : -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ type: "spring", stiffness: 100, damping: 15, delay: 0.1 }}
                whileHover={{ scale: 1.02 }}
              >
                <div className={styles.dateBadge}>{item.date}</div>
                <h3 className={styles.title}>{item.title}</h3>
                <p className={styles.subtitle}>{item.subtitle}</p>
                <p className={styles.details}>{item.details}</p>
              </motion.div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
