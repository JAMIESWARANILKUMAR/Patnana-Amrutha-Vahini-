"use client";

import { motion } from "framer-motion";
import styles from "./FloatingIcons.module.css";

const icons = [
  { id: "ai", icon: "fa-solid fa-robot", size: 36, color: "var(--accent-cyan)" },
  { id: "code", icon: "fa-solid fa-code", size: 34, color: "var(--accent-purple)" },
  { id: "nn", icon: "fa-solid fa-brain", size: 40, color: "var(--accent-orange)" },
  { id: "cloud", icon: "fa-solid fa-cloud", size: 32, color: "var(--accent-blue)" },
  { id: "spark", icon: "fa-solid fa-bolt", size: 30, color: "#9be8ff" },
];

export default function FloatingIcons() {
  return (
    <div className={styles.container} aria-hidden>
      {icons.map((it, i) => (
        <motion.div
          key={it.id}
          className={styles.iconWrap}
          style={{ left: `${8 + i * 14}%`, top: `${6 + (i % 3) * 12}%` }}
          animate={{ y: [0, -12, 0], rotate: [0, 6, 0] }}
          transition={{ duration: 6 + i, repeat: Infinity, ease: "easeInOut", delay: i * 0.6 }}
        >
          <i className={`${it.icon}`} style={{ fontSize: it.size, color: it.color }} />
        </motion.div>
      ))}

      {/* trailing small particles */}
      <motion.div className={styles.particles} animate={{ opacity: [0.7, 0.18, 0.7] }} transition={{ duration: 8, repeat: Infinity }} />
    </div>
  );
}
