"use client";

import { useEffect, useState } from "react";
import styles from "./LiveClock.module.css";

function formatIST(date: Date) {
  // Use Intl to format in Asia/Kolkata
  const time = new Intl.DateTimeFormat("en-GB", {
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
    hour12: true,
    timeZone: "Asia/Kolkata",
  }).format(date);

  const day = new Intl.DateTimeFormat("en-GB", {
    weekday: "short",
    day: "2-digit",
    month: "short",
    year: "numeric",
    timeZone: "Asia/Kolkata",
  }).format(date);

  return { time, day };
}

export default function LiveClock() {
  const [now, setNow] = useState(new Date());

  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(id);
  }, []);

  const { time, day } = formatIST(now);

  return (
    <div className={styles.clock} aria-hidden>
      <div className={styles.time}>{time}</div>
      <div className={styles.day}>{day} IST</div>
    </div>
  );
}
