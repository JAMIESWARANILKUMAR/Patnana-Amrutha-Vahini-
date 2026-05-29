"use client";

import styles from "./ProjectsSection.module.css";
import SectionHeading from "./SectionHeading";
import { motion } from "framer-motion";

const projectsData = [
  {
    title: "AI4Agro - AI-Based Smart Agriculture System",
    description: "Image-classification based system for crop disease detection, treatment recommendations, yield estimation and growth tracking. Built with Python, computer vision and a FastAPI backend.",
    tags: ["Python", "Computer Vision", "FastAPI"],
  },
  {
    title: "Online Banking System",
    description: "Secure web application with user authentication, account management and transaction features. Front-end implemented with HTML, CSS and JavaScript and backed by a database.",
    tags: ["Web", "HTML", "JavaScript"],
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.1,
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 40, scale: 0.95 },
  visible: { 
    opacity: 1, 
    y: 0, 
    scale: 1,
    transition: { type: "spring" as const, stiffness: 100, damping: 15 }
  }
};

export default function ProjectsSection() {
  return (
    <section className={styles.projects} id="projects">
      <div className={styles.container}>
        <SectionHeading title="Projects" subtitle="Personal and academic projects." />
        
        <motion.div 
          className={styles.carousel}
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {projectsData.map((project, index) => (
            <motion.article 
              key={index}
              className={styles.card}
              variants={itemVariants}
              whileHover={{ scale: 1.03, transition: { duration: 0.2 } }}
            >
              <div className={styles.cardInner}>
                <h3 className={styles.title}>{project.title}</h3>
                <p className={styles.description}>{project.description}</p>
                <div className={styles.tags}>
                  {project.tags.map((tag, tIdx) => (
                    <span key={tIdx} className={styles.tag}>{tag}</span>
                  ))}
                </div>
              </div>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
