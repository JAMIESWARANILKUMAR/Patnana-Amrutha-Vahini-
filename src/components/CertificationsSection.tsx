"use client";

import styles from "./CertificationsSection.module.css";
import SectionHeading from "./SectionHeading";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

const certData = [
  { title: "Generative AI for Educators", issuer: "Google (with MIT RAISE)", link: "", date: "2025", color: "cyan" },
  { title: "The Joy of Computing Using Python", issuer: "NPTEL (IIT Madras)", link: "", date: "2024", color: "purple" },
];

const SpotlightCard = ({ cert }: { cert: any }) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const glowX = useMotionValue(0);
  const glowY = useMotionValue(0);

  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [15, -15]), { stiffness: 100, damping: 20 });
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-15, 15]), { stiffness: 100, damping: 20 });
  
  const glowXSpring = useSpring(glowX, { stiffness: 150, damping: 25 });
  const glowYSpring = useSpring(glowY, { stiffness: 150, damping: 25 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    
    x.set(mouseX / rect.width - 0.5);
    y.set(mouseY / rect.height - 0.5);
    
    glowX.set(mouseX);
    glowY.set(mouseY);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
    // Move glow off-screen/center
    glowX.set(-200);
    glowY.set(-200);
  };

  return (
    <div className={styles.perspectiveWrapper} style={{ perspective: 1000 }}>
      <motion.div
        className={`${styles.spotlightCard} ${cert.color === "purple" ? styles.purpleCard : styles.cyanCard}`}
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        whileHover={{ scale: 1.02 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
      >
        <motion.div 
          className={styles.spotlight}
          style={{ 
            left: glowXSpring, 
            top: glowYSpring,
            transform: "translate(-50%, -50%)"
          }}
        />
        
        <a href={cert.link} target="_blank" rel="noreferrer" className={styles.cardLink}>
          <div className={styles.cardHeader} style={{ transform: "translateZ(20px)" }}>
            <div className={styles.iconWrapper}>
              <i className="fa-solid fa-certificate"></i>
            </div>
            <span className={styles.dateBadge}>{cert.date}</span>
          </div>
          
          <div className={styles.cardBody} style={{ transform: "translateZ(30px)" }}>
            <h3 className={styles.title}>{cert.title}</h3>
            <p className={styles.issuer}>Issued by {cert.issuer}</p>
          </div>
          
          <div className={styles.cardFooter} style={{ transform: "translateZ(20px)" }}>
            <span className={styles.viewLink}>
              View Credential <i className="fa-solid fa-arrow-right"></i>
            </span>
          </div>
        </a>
      </motion.div>
    </div>
  );
};

export default function CertificationsSection() {
  return (
    <section className={styles.certifications} id="certifications">
      <div className={styles.container}>
        <SectionHeading title="Certifications" subtitle="Verified credentials with interactive 3D spotlight motion." />
        
        <div className={styles.grid}>
          {certData.map((cert, index) => (
            <SpotlightCard key={index} cert={cert} />
          ))}
        </div>
      </div>
    </section>
  );
}
