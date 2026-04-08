
import { useState, useEffect } from "react";
import { useCart } from "../context/CartContext";

interface NavbarProps {
  onCartOpen: () => void;
  darkMode: boolean;
  onDarkModeToggle: () => void;
  onSectionNav: (section: string) => void;
}

export default function Navbar({ onCartOpen, darkMode, onDarkModeToggle, onSectionNav }: NavbarProps) {
  const { totalItems } = useCart();
  const [scrolled, setScrolled] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className={`navbar navbar-expand-lg fixed-top ${scrolled ? "navbar-scrolled" : ""}`}
      style={{
        background: scrolled
          ? "rgba(15, 5, 30, 0.95)"
          : "rgba(15, 5, 30, 0.7)",
        backdropFilter: "blur(20px)",
        borderBottom: "1px solid rgba(139, 92, 246, 0.3)",
        transition: "all 0.3s ease",
        padding: "0.75rem 0",
      }}
    >
      <div className="container-xl">
        <a
          className="navbar-brand d-flex align-items-center gap-2"
          href="#"
          onClick={() => onSectionNav("hero")}
          style={{ textDecoration: "none" }}
        >
          <span style={{ fontSize: "1.8rem" }}>🛒</span>
          <span
            style={{
              background: "linear-gradient(135deg, #c084fc, #f43f5e)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              fontWeight: 800,
              fontSize: "1.4rem",
              letterSpacing: "-0.5px",
            }}
          >
            FreshMart
          </span>
        </a>

        <button
          className="navbar-toggler border-0"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          style={{ color: "#c084fc" }}
        >
          <span className="navbar-toggler-icon" style={{ filter: "invert(0.7) sepia(1) saturate(5) hue-rotate(240deg)" }}></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav mx-auto gap-1">
            {[
              { label: "Home", section: "hero" },
              { label: "Recipes", section: "recipes" },
              { label: "Health Goals", section: "health" },
              { label: "Categories", section: "categories" },
              { label: "Offers", section: "offers" },
            ].map(({ label, section }) => (
              <li key={section} className="nav-item">
                <button
                  className="nav-link btn btn-link px-3 py-2"
                  onClick={() => onSectionNav(section)}
                  style={{
                    color: "rgba(255,255,255,0.85)",
                    fontWeight: 500,
                    textDecoration: "none",
                    borderRadius: "8px",
                    transition: "all 0.2s",
                    border: "none",
                    background: "none",
                  }}
                  onMouseEnter={(e) => {
                    (e.target as HTMLElement).style.color = "#c084fc";
                    (e.target as HTMLElement).style.background = "rgba(139,92,246,0.15)";
                  }}
                  onMouseLeave={(e) => {
                    (e.target as HTMLElement).style.color = "rgba(255,255,255,0.85)";
                    (e.target as HTMLElement).style.background = "none";
                  }}
                >
                  {label}
                </button>
              </li>
            ))}
          </ul>

          <div className="d-flex align-items-center gap-3">
            <div className="input-group" style={{ maxWidth: "220px" }}>
              <span
                className="input-group-text"
                style={{
                  background: "rgba(139,92,246,0.2)",
                  border: "1px solid rgba(139,92,246,0.4)",
                  color: "#c084fc",
                }}
              >
                🔍
              </span>
              <input
                type="search"
                className="form-control"
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={{
                  background: "rgba(139,92,246,0.1)",
                  border: "1px solid rgba(139,92,246,0.4)",
                  color: "#fff",
                  fontSize: "0.85rem",
                }}
              />
            </div>

            <button
              className="btn btn-sm"
              onClick={onDarkModeToggle}
              style={{
                background: "rgba(139,92,246,0.2)",
                border: "1px solid rgba(139,92,246,0.4)",
                color: "#c084fc",
                borderRadius: "10px",
                padding: "6px 12px",
              }}
            >
              {darkMode ? "☀️" : "🌙"}
            </button>

            <button
              className="btn position-relative"
              onClick={onCartOpen}
              style={{
                background: "linear-gradient(135deg, #7c3aed, #db2777)",
                border: "none",
                color: "#fff",
                borderRadius: "12px",
                padding: "8px 18px",
                fontWeight: 600,
                boxShadow: "0 0 20px rgba(124, 58, 237, 0.4)",
                transition: "all 0.3s",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.transform = "scale(1.05)";
                (e.currentTarget as HTMLElement).style.boxShadow = "0 0 30px rgba(124, 58, 237, 0.6)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.transform = "scale(1)";
                (e.currentTarget as HTMLElement).style.boxShadow = "0 0 20px rgba(124, 58, 237, 0.4)";
              }}
            >
              🛒 Cart
              {totalItems > 0 && (
                <span
                  className="position-absolute top-0 start-100 translate-middle badge rounded-pill"
                  style={{
                    background: "linear-gradient(135deg, #f43f5e, #fb923c)",
                    fontSize: "0.65rem",
                    animation: "pulse 1.5s infinite",
                  }}
                >
                  {totalItems}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
