"use client";

import { useState } from "react";
import styles from "./ContactSection.module.css";
import SectionHeading from "./SectionHeading";
import { motion } from "framer-motion";

export default function ContactSection() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email) {
      setStatus("Please fill in the required fields.");
      return;
    }
    const whatsappNumber = "918985020650";
    const whatsappText = `Hi Patnana, I'm ${name} (${email}). ${message ? `Project details: ${message}` : ""}`;
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappText)}`;
    
    setStatus("Opening WhatsApp...");
    window.open(whatsappUrl, "_blank");
    setName("");
    setEmail("");
    setMessage("");
    setTimeout(() => setStatus(""), 4000);
  };

  return (
    <section className={styles.contact} id="contact">
      <div className={styles.container}>
        <SectionHeading title="Get in touch" subtitle="Let's collaborate on Human Resources, AI, or marketing journeys." />
        
        <div className={styles.grid}>
          <motion.article 
            className={styles.infoCard}
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className={styles.headerRow}>
              <h3>Get in touch</h3>
              <span className={styles.opportunity}><strong>Looking for opportunities</strong></span>
            </div>
            <p className={styles.lead}>
              I'm available for internships, project collaborations, and front-end or ML tasks. Reach out to discuss opportunities.
            </p>
            
            <div className={styles.stats}>
              <div>
                <strong>24h</strong>
                <span>Response</span>
              </div>
            </div>

            <ul className={styles.metaList}>
              <li>
                <i className="fa-solid fa-envelope"></i>
                <a href="mailto:amruthapatnana217@gmail.com">amruthapatnana217@gmail.com</a>
              </li>
              <li>
                <i className="fa-solid fa-phone"></i>
                <a href="tel:+918985020650">+91-8985020650</a>
              </li>
              <li>
                <i className="fa-solid fa-briefcase"></i>
                <span>Based in Tekkali, Srikakulam · Open to opportunities</span>
              </li>
              <li>
                <i className="fa-brands fa-linkedin"></i>
                <a href="https://linkedin.com/in/patnana-amrutavahini-664bab30b" target="_blank" rel="noreferrer">LinkedIn</a>
              </li>
            </ul>
          </motion.article>

          <motion.form 
            className={styles.form}
            onSubmit={handleSubmit}
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className={styles.fieldGrid}>
              <label>
                Name
                <input 
                  type="text" 
                  value={name} 
                  onChange={(e) => setName(e.target.value)} 
                  placeholder="Your name" 
                  required 
                />
              </label>
              <label>
                Email
                <input 
                  type="email" 
                  value={email} 
                  onChange={(e) => setEmail(e.target.value)} 
                  placeholder="your@email.com" 
                  required 
                />
              </label>
            </div>
            <label>
              Project details
              <textarea 
                rows={4} 
                value={message} 
                onChange={(e) => setMessage(e.target.value)} 
                placeholder="Tell me about your project"
              ></textarea>
            </label>
            <div className={styles.formActions}>
              <button type="submit" className={styles.submitBtn}>Send Message</button>
              <span className={styles.formNote}>I typically reply within one business day.</span>
            </div>
            {status && <p className={styles.statusMessage}>{status}</p>}
          </motion.form>
        </div>
      </div>
    </section>
  );
}
