
import { useState, useRef, useEffect } from "react";
import { healthCategories, type HealthCategory } from "../data/health";
import { useCart } from "../context/CartContext";
import { useToast } from "../context/ToastContext";

export default function HealthSection() {
  const { addItems } = useCart();
  const { showToast } = useToast();
  const [selected, setSelected] = useState<HealthCategory | null>(null);
  const [added, setAdded] = useState(false);
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

  const handleAddToCart = (cat: HealthCategory) => {
    const items = cat.items.map((item, i) => ({
      id: `health-${cat.id}-${i}`,
      name: item.name,
      emoji: cat.emoji,
      quantity: item.quantity,
      price: item.price,
    }));
    addItems(items);
    showToast({
      emoji: cat.emoji,
      title: `${cat.items.length} healthy items added`,
      source: cat.name,
      itemCount: cat.items.length,
      type: "health",
    });
    setAdded(true);
    setTimeout(() => {
      setAdded(false);
      setSelected(null);
    }, 1800);
  };

  return (
    <section
      id="health"
      ref={ref}
      style={{
        padding: "5rem 0",
        background: "linear-gradient(180deg, #0f0520 0%, #120025 100%)",
        position: "relative",
      }}
    >
      <div style={{ position: "absolute", bottom: "10%", right: "5%", width: "400px", height: "400px", background: "radial-gradient(circle, rgba(124,58,237,0.12) 0%, transparent 70%)", pointerEvents: "none" }} />

      <div className="container-xl">
        <div className="text-center mb-5" style={{ opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(30px)", transition: "all 0.7s ease" }}>
          <span style={{ background: "rgba(16,185,129,0.2)", border: "1px solid rgba(16,185,129,0.4)", borderRadius: "50px", padding: "0.4rem 1.2rem", color: "#34d399", fontSize: "0.85rem", fontWeight: 600 }}>
            💚 Health-Based Shopping
          </span>
          <h2 style={{ color: "#fff", fontWeight: 800, fontSize: "clamp(1.8rem, 3vw, 2.8rem)", marginTop: "1rem", marginBottom: "0.5rem" }}>
            Shop by{" "}
            <span style={{ background: "linear-gradient(135deg, #34d399, #10b981)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
              Health Goals
            </span>
          </h2>
          <p style={{ color: "rgba(255,255,255,0.5)", maxWidth: "500px", margin: "0 auto" }}>
            20+ health-specific grocery packs curated by nutrition experts for your wellbeing
          </p>
        </div>

        <div className="row g-3">
          {healthCategories.map((cat, i) => {
            const healthImageMap: Record<string, string> = {
              "iron-blood":       "/images/health-iron-blood.png",
              "vitamin-d-calcium":"/images/health-vitamin-d-calcium.png",
              "pregnancy":        "/images/health-pregnancy.png",
              "diabetes":         "/images/health-diabetes.png",
              "weight-loss":      "/images/health-weight-loss.png",
              "weight-gain":      "/images/health-weight-gain.png",
              "high-protein":     "/images/health-high-protein.png",
              "kids-nutrition":   "/images/health-kids-nutrition.png",
              "senior-health":    "/images/health-senior-health.png",
              "immunity":         "/images/health-immunity.png",
              "heart-health":     "/images/health-food.png",
              "skin-glow":        "/images/veggies.png",
              "energy-boost":     "/images/health-food.png",
              "brain-health":     "/images/health-food.png",
              "pcos-friendly":    "/images/veggies.png",
              "low-cholesterol":  "/images/veggies.png",
            };
            const imgSrc = healthImageMap[cat.id] ?? "/images/health-food.png";
            return (
            <div key={cat.id} className="col-6 col-md-4 col-lg-3 col-xl-2" style={{ opacity: visible ? 1 : 0, transform: visible ? "scale(1)" : "scale(0.9)", transition: `all 0.4s ease ${i * 0.04}s` }}>
              <div
                style={{
                  background: "rgba(14,4,30,0.92)",
                  border: `1.5px solid ${cat.color}55`,
                  borderRadius: "18px",
                  cursor: "pointer",
                  transition: "all 0.3s cubic-bezier(0.4,0,0.2,1)",
                  overflow: "hidden",
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  boxShadow: `0 4px 20px ${cat.color}22`,
                }}
                onMouseEnter={(e) => {
                  const el = e.currentTarget as HTMLElement;
                  el.style.transform = "translateY(-6px) scale(1.03)";
                  el.style.borderColor = cat.color + "cc";
                  el.style.boxShadow = `0 16px 44px ${cat.color}44`;
                }}
                onMouseLeave={(e) => {
                  const el = e.currentTarget as HTMLElement;
                  el.style.transform = "translateY(0) scale(1)";
                  el.style.borderColor = cat.color + "55";
                  el.style.boxShadow = `0 4px 20px ${cat.color}22`;
                }}
                onClick={() => { setSelected(cat); setAdded(false); }}
              >
                {/* Food Image */}
                <div style={{ position: "relative", height: "clamp(80px,9vw,110px)", overflow: "hidden", flexShrink: 0 }}>
                  <img src={imgSrc} alt={cat.name} style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
                  <div style={{ position: "absolute", inset: 0, background: `linear-gradient(0deg, rgba(14,4,30,1) 0%, rgba(14,4,30,0.35) 60%, transparent 100%)` }} />
                  <div style={{ position: "absolute", top: "7px", left: "9px", fontSize: "1.4rem", filter: `drop-shadow(0 0 8px ${cat.color}90)` }}>{cat.emoji}</div>
                </div>

                {/* Card body */}
                <div style={{ padding: "0.65rem 0.75rem 0.8rem", display: "flex", flexDirection: "column", flex: 1, textAlign: "center" }}>
                  {/* Name */}
                  <div style={{ color: "#fff", fontWeight: 700, fontSize: "clamp(0.72rem,1.3vw,0.82rem)", lineHeight: 1.3, marginBottom: "0.55rem" }}>{cat.name}</div>

                  {/* ── NEON ITEMS BADGE ── */}
                  <div style={{
                    background: `${cat.color}18`,
                    border: `1.5px solid ${cat.color}55`,
                    borderRadius: "10px",
                    padding: "0.4rem 0.5rem",
                    marginTop: "auto",
                  }}>
                    <span style={{
                      fontWeight: 900,
                      fontSize: "clamp(1.05rem,2vw,1.3rem)",
                      color: cat.color,
                      textShadow: `0 0 8px ${cat.color}, 0 0 20px ${cat.color}bb, 0 0 38px ${cat.color}55`,
                      display: "block",
                      lineHeight: 1,
                    }}>
                      {cat.items.length}
                    </span>
                    <span style={{
                      fontWeight: 800,
                      fontSize: "clamp(0.58rem,1.1vw,0.66rem)",
                      color: cat.color,
                      textShadow: `0 0 6px ${cat.color}aa`,
                      letterSpacing: "0.08em",
                      textTransform: "uppercase",
                    }}>
                      Items
                    </span>
                  </div>
                </div>
              </div>
            </div>
            );
          })}
        </div>
      </div>

      {/* Health Detail Modal */}
      {selected && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0,0,0,0.75)",
            backdropFilter: "blur(10px)",
            zIndex: 1055,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "1rem",
          }}
          onClick={() => setSelected(null)}
        >
          <div
            style={{
              background: "linear-gradient(135deg, #0f0520 0%, #1a0535 100%)",
              border: `1px solid ${selected.color}50`,
              borderRadius: "24px",
              padding: "2rem",
              maxWidth: "680px",
              width: "100%",
              maxHeight: "88vh",
              overflowY: "auto",
              boxShadow: `0 0 60px ${selected.color}30`,
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="d-flex align-items-start justify-content-between mb-3">
              <div>
                <div style={{ fontSize: "3rem", filter: `drop-shadow(0 0 15px ${selected.color}80)` }}>{selected.emoji}</div>
                <h4 style={{ color: "#fff", fontWeight: 700, margin: "0.5rem 0 0.25rem" }}>{selected.name}</h4>
                <p style={{ color: "rgba(255,255,255,0.5)", fontSize: "0.85rem", margin: 0, fontStyle: "italic" }}>{selected.tagline}</p>
              </div>
              <button onClick={() => setSelected(null)} style={{ background: "rgba(255,255,255,0.1)", border: "none", color: "#fff", borderRadius: "10px", width: "36px", height: "36px", cursor: "pointer" }}>✕</button>
            </div>

            <p style={{ color: "rgba(255,255,255,0.6)", fontSize: "0.875rem", marginBottom: "1.25rem", lineHeight: 1.6 }}>
              {selected.description}
            </p>

            {/* Benefits */}
            <div style={{ marginBottom: "1.25rem" }}>
              <h6 style={{ color: "#fff", fontWeight: 700, marginBottom: "0.6rem" }}>✅ Key Benefits</h6>
              <div className="d-flex flex-wrap gap-2">
                {selected.benefits.map((b, i) => (
                  <span key={i} style={{ background: `${selected.color}20`, border: `1px solid ${selected.color}40`, borderRadius: "8px", padding: "4px 12px", fontSize: "0.78rem", color: selected.color }}>
                    {b}
                  </span>
                ))}
              </div>
            </div>

            {/* Items */}
            <h6 style={{ color: "#fff", fontWeight: 700, marginBottom: "0.75rem" }}>🛒 Recommended Items</h6>
            <div className="row g-2 mb-3">
              {selected.items.map((item, i) => (
                <div key={i} className="col-6">
                  <div
                    style={{
                      background: `${selected.color}10`,
                      border: `1px solid ${selected.color}30`,
                      borderRadius: "12px",
                      padding: "0.75rem 1rem",
                    }}
                  >
                    <div className="d-flex justify-content-between align-items-start">
                      <div>
                        <div style={{ color: "#fff", fontSize: "0.82rem", fontWeight: 600 }}>{item.name}</div>
                        <div style={{ color: "rgba(255,255,255,0.4)", fontSize: "0.7rem" }}>{item.quantity}</div>
                        <div style={{ color: selected.color, fontSize: "0.68rem", marginTop: "0.2rem" }}>{item.benefit}</div>
                      </div>
                      <div style={{ color: selected.color, fontWeight: 700, fontSize: "0.82rem", flexShrink: 0, marginLeft: "0.5rem" }}>₹{item.price}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Meal Suggestions */}
            <div style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "14px", padding: "1rem 1.2rem", marginBottom: "1.25rem" }}>
              <h6 style={{ color: "#fff", fontWeight: 700, marginBottom: "0.6rem" }}>🍽️ Meal Suggestions</h6>
              <div className="d-flex flex-wrap gap-2">
                {selected.mealSuggestions.map((meal, i) => (
                  <span key={i} style={{ background: "rgba(139,92,246,0.2)", border: "1px solid rgba(139,92,246,0.3)", borderRadius: "8px", padding: "4px 12px", fontSize: "0.78rem", color: "#c084fc" }}>
                    {meal}
                  </span>
                ))}
              </div>
            </div>

            <div className="d-flex gap-2">
              <button
                onClick={() => handleAddToCart(selected)}
                style={{
                  flex: 1,
                  background: added
                    ? "linear-gradient(135deg, #059669, #10b981)"
                    : `linear-gradient(135deg, ${selected.color}, #7c3aed)`,
                  border: "none",
                  color: "#fff",
                  borderRadius: "14px",
                  padding: "14px",
                  fontWeight: 700,
                  fontSize: "1rem",
                  cursor: "pointer",
                  boxShadow: `0 0 30px ${added ? "rgba(5,150,105,0.5)" : selected.color + "40"}`,
                  transition: "all 0.3s",
                }}
              >
                {added ? "✓ Added to Cart! Enjoy your healthy meal!" : `🛒 Add All to Cart — ₹${selected.items.reduce((s, i) => s + i.price, 0)}`}
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
