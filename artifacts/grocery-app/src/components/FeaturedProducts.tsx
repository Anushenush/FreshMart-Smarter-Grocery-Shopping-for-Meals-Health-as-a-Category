
import { useState, useRef, useEffect } from "react";
import { featuredProducts } from "../data/products";
import { useCart } from "../context/CartContext";

export default function FeaturedProducts() {
  const { addItem } = useCart();
  const [added, setAdded] = useState<string | null>(null);
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.05 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  const handleAdd = (p: typeof featuredProducts[0]) => {
    addItem({ id: p.id, name: p.name, emoji: p.emoji, quantity: p.quantity, price: p.price });
    setAdded(p.id);
    setTimeout(() => setAdded(null), 1500);
  };

  return (
    <section
      id="offers"
      ref={ref}
      style={{
        padding: "5rem 0",
        background: "linear-gradient(180deg, #120025 0%, #0a0015 100%)",
        position: "relative",
      }}
    >
      <div className="container-xl">
        <div className="text-center mb-5" style={{ opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(30px)", transition: "all 0.7s ease" }}>
          <span style={{ background: "rgba(251,146,60,0.2)", border: "1px solid rgba(251,146,60,0.4)", borderRadius: "50px", padding: "0.4rem 1.2rem", color: "#fb923c", fontSize: "0.85rem", fontWeight: 600 }}>
            🔥 Hot Deals
          </span>
          <h2 style={{ color: "#fff", fontWeight: 800, fontSize: "clamp(1.8rem, 3vw, 2.8rem)", marginTop: "1rem", marginBottom: "0.5rem" }}>
            Featured{" "}
            <span style={{ background: "linear-gradient(135deg, #fb923c, #f43f5e)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
              Products
            </span>
          </h2>
          <p style={{ color: "rgba(255,255,255,0.5)", maxWidth: "500px", margin: "0 auto" }}>
            Hand-picked fresh produce, dairy, meats and pantry essentials at the best prices
          </p>
        </div>

        <div className="row g-3">
          {featuredProducts.map((p, i) => (
            <div key={p.id} className="col-6 col-md-4 col-lg-3 col-xl-2" style={{ opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(30px)", transition: `all 0.4s ease ${i * 0.04}s` }}>
              <div
                style={{
                  background: "rgba(255,255,255,0.04)",
                  border: "1px solid rgba(139,92,246,0.2)",
                  borderRadius: "18px",
                  padding: "1.2rem",
                  position: "relative",
                  overflow: "hidden",
                  transition: "all 0.3s cubic-bezier(0.4,0,0.2,1)",
                  backdropFilter: "blur(10px)",
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                }}
                onMouseEnter={(e) => {
                  const el = e.currentTarget as HTMLElement;
                  el.style.transform = "translateY(-6px)";
                  el.style.borderColor = "rgba(139,92,246,0.5)";
                  el.style.boxShadow = "0 15px 40px rgba(124,58,237,0.25)";
                  el.style.background = "rgba(139,92,246,0.1)";
                }}
                onMouseLeave={(e) => {
                  const el = e.currentTarget as HTMLElement;
                  el.style.transform = "translateY(0)";
                  el.style.borderColor = "rgba(139,92,246,0.2)";
                  el.style.boxShadow = "none";
                  el.style.background = "rgba(255,255,255,0.04)";
                }}
              >
                {p.badge && (
                  <span
                    style={{
                      position: "absolute",
                      top: "10px",
                      right: "10px",
                      background: "linear-gradient(135deg, #7c3aed, #db2777)",
                      color: "#fff",
                      borderRadius: "8px",
                      padding: "2px 8px",
                      fontSize: "0.65rem",
                      fontWeight: 700,
                    }}
                  >
                    {p.badge}
                  </span>
                )}

                {p.originalPrice && (
                  <span
                    style={{
                      position: "absolute",
                      top: "10px",
                      left: "10px",
                      background: "linear-gradient(135deg, #f43f5e, #fb923c)",
                      color: "#fff",
                      borderRadius: "6px",
                      padding: "1px 6px",
                      fontSize: "0.6rem",
                      fontWeight: 700,
                    }}
                  >
                    -{Math.round((1 - p.price / p.originalPrice) * 100)}%
                  </span>
                )}

                <div style={{ textAlign: "center", marginBottom: "0.75rem", marginTop: p.originalPrice ? "0.5rem" : 0 }}>
                  <span style={{ fontSize: "3rem", filter: "drop-shadow(0 0 8px rgba(192,132,252,0.4))" }}>{p.emoji}</span>
                </div>

                <div style={{ flex: 1 }}>
                  <div style={{ color: "#fff", fontWeight: 600, fontSize: "0.85rem", marginBottom: "0.2rem" }}>{p.name}</div>
                  <div style={{ color: "rgba(255,255,255,0.4)", fontSize: "0.72rem", marginBottom: "0.4rem" }}>{p.quantity}</div>

                  <div className="d-flex align-items-center gap-1 mb-0.5">
                    <span style={{ color: "#fbbf24", fontSize: "0.7rem" }}>{"★".repeat(Math.round(p.rating))}</span>
                    <span style={{ color: "rgba(255,255,255,0.3)", fontSize: "0.65rem" }}>({p.reviews})</span>
                  </div>
                </div>

                <div className="d-flex align-items-center justify-content-between mt-2">
                  <div>
                    <div style={{ background: "linear-gradient(135deg, #c084fc, #f472b6)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", fontWeight: 800, fontSize: "1rem" }}>
                      ₹{p.price}
                    </div>
                    {p.originalPrice && (
                      <div style={{ color: "rgba(255,255,255,0.3)", fontSize: "0.7rem", textDecoration: "line-through" }}>₹{p.originalPrice}</div>
                    )}
                  </div>

                  <button
                    onClick={() => handleAdd(p)}
                    style={{
                      width: "34px",
                      height: "34px",
                      borderRadius: "10px",
                      border: "none",
                      background: added === p.id
                        ? "linear-gradient(135deg, #059669, #10b981)"
                        : "linear-gradient(135deg, #7c3aed, #db2777)",
                      color: "#fff",
                      cursor: "pointer",
                      fontSize: "1rem",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      transition: "all 0.3s",
                      flexShrink: 0,
                      boxShadow: "0 0 15px rgba(124,58,237,0.4)",
                    }}
                  >
                    {added === p.id ? "✓" : "+"}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
