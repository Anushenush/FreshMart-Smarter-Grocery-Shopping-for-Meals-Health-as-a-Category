
import { useState } from "react";

export default function Footer() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail("");
      setTimeout(() => setSubscribed(false), 3000);
    }
  };

  return (
    <footer
      style={{
        background: "linear-gradient(180deg, #0a0015 0%, #060010 100%)",
        borderTop: "1px solid rgba(139,92,246,0.2)",
        paddingTop: "4rem",
      }}
    >
      <div className="container-xl">
        <div className="row g-4 mb-5">
          {/* Brand */}
          <div className="col-12 col-lg-4">
            <div className="d-flex align-items-center gap-2 mb-3">
              <span style={{ fontSize: "2rem" }}>🛒</span>
              <span
                style={{
                  background: "linear-gradient(135deg, #c084fc, #f43f5e)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  fontWeight: 800,
                  fontSize: "1.5rem",
                }}
              >
                FreshMart
              </span>
            </div>
            <p style={{ color: "rgba(255,255,255,0.5)", fontSize: "0.875rem", lineHeight: 1.7, marginBottom: "1.5rem" }}>
              Your premium grocery shopping destination with smart recipe-to-cart and health-based personalized shopping.
            </p>
            <div className="d-flex gap-3">
              {["🐦", "📘", "📷", "▶️"].map((icon, i) => (
                <button
                  key={i}
                  style={{
                    width: "38px",
                    height: "38px",
                    borderRadius: "10px",
                    border: "1px solid rgba(139,92,246,0.3)",
                    background: "rgba(139,92,246,0.1)",
                    cursor: "pointer",
                    fontSize: "1rem",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    transition: "all 0.2s",
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.background = "rgba(139,92,246,0.3)";
                    (e.currentTarget as HTMLElement).style.transform = "translateY(-2px)";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.background = "rgba(139,92,246,0.1)";
                    (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
                  }}
                >
                  {icon}
                </button>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="col-6 col-lg-2">
            <h6 style={{ color: "#fff", fontWeight: 700, marginBottom: "1.2rem" }}>Quick Links</h6>
            <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
              {["Home", "Recipes", "Health Goals", "Categories", "Offers", "Trending"].map((link) => (
                <li key={link} style={{ marginBottom: "0.6rem" }}>
                  <a
                    href="#"
                    style={{
                      color: "rgba(255,255,255,0.5)",
                      textDecoration: "none",
                      fontSize: "0.875rem",
                      transition: "all 0.2s",
                    }}
                    onMouseEnter={(e) => { (e.target as HTMLElement).style.color = "#c084fc"; }}
                    onMouseLeave={(e) => { (e.target as HTMLElement).style.color = "rgba(255,255,255,0.5)"; }}
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* About */}
          <div className="col-6 col-lg-2">
            <h6 style={{ color: "#fff", fontWeight: 700, marginBottom: "1.2rem" }}>About</h6>
            <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
              {["About Us", "How It Works", "Blog", "Careers", "Contact", "Press"].map((link) => (
                <li key={link} style={{ marginBottom: "0.6rem" }}>
                  <a
                    href="#"
                    style={{ color: "rgba(255,255,255,0.5)", textDecoration: "none", fontSize: "0.875rem", transition: "all 0.2s" }}
                    onMouseEnter={(e) => { (e.target as HTMLElement).style.color = "#c084fc"; }}
                    onMouseLeave={(e) => { (e.target as HTMLElement).style.color = "rgba(255,255,255,0.5)"; }}
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div className="col-12 col-lg-4">
            <h6 style={{ color: "#fff", fontWeight: 700, marginBottom: "1.2rem" }}>Stay Updated</h6>
            <p style={{ color: "rgba(255,255,255,0.5)", fontSize: "0.875rem", marginBottom: "1.2rem" }}>
              Get weekly recipe ideas and exclusive grocery deals delivered to your inbox.
            </p>
            <form onSubmit={handleSubscribe} className="d-flex gap-2 mb-4">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Your email address"
                style={{
                  flex: 1,
                  background: "rgba(139,92,246,0.1)",
                  border: "1px solid rgba(139,92,246,0.35)",
                  borderRadius: "12px",
                  padding: "10px 14px",
                  color: "#fff",
                  outline: "none",
                  fontSize: "0.85rem",
                }}
              />
              <button
                type="submit"
                style={{
                  background: subscribed ? "linear-gradient(135deg, #059669, #10b981)" : "linear-gradient(135deg, #7c3aed, #db2777)",
                  border: "none",
                  color: "#fff",
                  borderRadius: "12px",
                  padding: "10px 20px",
                  fontWeight: 600,
                  cursor: "pointer",
                  fontSize: "0.85rem",
                  whiteSpace: "nowrap",
                  transition: "all 0.3s",
                }}
              >
                {subscribed ? "✓ Done!" : "Subscribe"}
              </button>
            </form>

            {/* App Download Buttons */}
            <div className="d-flex gap-3">
              {[
                { icon: "📱", store: "App Store", sub: "Download on the" },
                { icon: "🤖", store: "Google Play", sub: "Get it on" },
              ].map((app, i) => (
                <button
                  key={i}
                  style={{
                    flex: 1,
                    background: "rgba(139,92,246,0.15)",
                    border: "1px solid rgba(139,92,246,0.3)",
                    borderRadius: "12px",
                    padding: "8px 12px",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    gap: "0.5rem",
                    transition: "all 0.2s",
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.background = "rgba(139,92,246,0.3)";
                    (e.currentTarget as HTMLElement).style.transform = "translateY(-2px)";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.background = "rgba(139,92,246,0.15)";
                    (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
                  }}
                >
                  <span style={{ fontSize: "1.4rem" }}>{app.icon}</span>
                  <div style={{ textAlign: "left" }}>
                    <div style={{ color: "rgba(255,255,255,0.4)", fontSize: "0.6rem" }}>{app.sub}</div>
                    <div style={{ color: "#fff", fontWeight: 600, fontSize: "0.78rem" }}>{app.store}</div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div
          style={{
            borderTop: "1px solid rgba(139,92,246,0.15)",
            padding: "1.5rem 0",
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "space-between",
            alignItems: "center",
            gap: "1rem",
          }}
        >
          <p style={{ color: "rgba(255,255,255,0.3)", fontSize: "0.8rem", margin: 0 }}>
            © 2026 FreshMart. All rights reserved. Made with 💜 for smarter grocery shopping.
          </p>
          <div className="d-flex gap-3">
            {["Privacy Policy", "Terms of Service", "Cookie Policy"].map((link) => (
              <a
                key={link}
                href="#"
                style={{ color: "rgba(255,255,255,0.3)", textDecoration: "none", fontSize: "0.75rem", transition: "color 0.2s" }}
                onMouseEnter={(e) => { (e.target as HTMLElement).style.color = "#c084fc"; }}
                onMouseLeave={(e) => { (e.target as HTMLElement).style.color = "rgba(255,255,255,0.3)"; }}
              >
                {link}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
