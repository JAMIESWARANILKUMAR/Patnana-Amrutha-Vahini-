import LiveClock from "./LiveClock";

export default function Footer() {
  return (
    <footer style={{
      textAlign: "center",
      padding: "3rem 1rem",
      borderTop: "1px solid rgba(255,255,255,0.1)",
      background: "var(--bg)",
      color: "var(--text-muted)",
      fontSize: "0.9rem",
      position: "relative"
    }}>
      {/* floating clock */}
      <LiveClock />

      <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', marginBottom: '0.75rem', alignItems: 'center' }}>
        <a href="https://linkedin.com/in/patnana-amrutavahini-664bab30b" target="_blank" rel="noreferrer" style={{ color: 'inherit' }} aria-label="LinkedIn">
          <i className="fa-brands fa-linkedin" style={{ fontSize: '1.15rem' }} />
        </a>
        <a href="mailto:amruthapatnana217@gmail.com" style={{ color: 'inherit' }} aria-label="Email">
          <i className="fa-solid fa-envelope" style={{ fontSize: '1.05rem' }} />
        </a>
      </div>
      <p>Copyrights © 2026 Patnana Amrutavahini - Portfolio</p>
    </footer>
  );
}
