
import { useState, useRef, useEffect } from "react";
import { featureCards } from "../data/products";
import { useCart } from "../context/CartContext";
import { useToast } from "../context/ToastContext";

const cardItems: Record<string, { emoji: string; price: number }[]> = {
  "recipe-to-cart": [
    { emoji: "🍗", price: 450 }, { emoji: "🍚", price: 580 }, { emoji: "🍝", price: 320 }, { emoji: "🫓", price: 180 }
  ],
  "health-shopping": [
    { emoji: "🩸", price: 280 }, { emoji: "🦴", price: 320 }, { emoji: "⚖️", price: 350 }, { emoji: "💪", price: 480 }
  ],
  "special-meals": [
    { emoji: "🎊", price: 650 }, { emoji: "🍽️", price: 780 }, { emoji: "🥩", price: 920 }, { emoji: "☕", price: 480 }
  ],
  "weekly-essentials": [
    { emoji: "🥬", price: 890 }, { emoji: "🥩", price: 1200 }, { emoji: "🥛", price: 450 }, { emoji: "🥐", price: 680 }
  ],
  "family-packs": [
    { emoji: "🌽", price: 1400 }, { emoji: "🍖", price: 1800 }, { emoji: "🧒", price: 900 }, { emoji: "👴", price: 1100 }
  ],
  "seasonal-bundles": [
    { emoji: "🍑", price: 380 }, { emoji: "🌧️", price: 320 }, { emoji: "🌰", price: 560 }, { emoji: "🪔", price: 720 }
  ],
};

interface ModalData {
  card: typeof featureCards[0];
  itemsData: { emoji: string; price: number }[];
}

export default function FeatureCards() {
  const { addItems } = useCart();
  const { showToast } = useToast();
  const [modal, setModal] = useState<ModalData | null>(null);
  const [added, setAdded] = useState<string | null>(null);
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  const handleAddToCart = (card: typeof featureCards[0]) => {
    const itemsData = cardItems[card.id] || [];
    const items = card.items.map((name, i) => ({
      id: `${card.id}-${i}`,
      name,
      emoji: itemsData[i]?.emoji || "📦",
      quantity: "1 pack",
      price: itemsData[i]?.price || 299,
    }));
    addItems(items);
    showToast({
      emoji: card.icon,
      title: `${card.items.length} items added`,
      source: card.title,
      itemCount: card.items.length,
      type: "bundle",
    });
    setAdded(card.id);
    setModal(null);
    setTimeout(() => setAdded(null), 2000);
  };

  return (
    <section
      id="categories"
      ref={ref}
      style={{
        padding: "5rem 0",
        background: "linear-gradient(180deg, #0a0015 0%, #120025 100%)",
        position: "relative",
      }}
    >
      {/* Accent orbs */}
      <div style={{ position: "absolute", top: "20%", right: "5%", width: "300px", height: "300px", background: "radial-gradient(circle, rgba(139,92,246,0.1) 0%, transparent 70%)", pointerEvents: "none" }} />

      <div className="container-xl">
        <div className="text-center mb-5" style={{ opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(30px)", transition: "all 0.7s ease" }}>
          <span style={{ background: "rgba(139,92,246,0.2)", border: "1px solid rgba(139,92,246,0.4)", borderRadius: "50px", padding: "0.4rem 1.2rem", color: "#c084fc", fontSize: "0.85rem", fontWeight: 600 }}>
            🛍️ Featured Categories
          </span>
          <h2 style={{ color: "#fff", fontWeight: 800, fontSize: "clamp(1.8rem, 3vw, 2.8rem)", marginTop: "1rem", marginBottom: "0.5rem" }}>
            Everything You Need,{" "}
            <span style={{ background: "linear-gradient(135deg, #c084fc, #f43f5e)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
              One Click Away
            </span>
          </h2>
          <p style={{ color: "rgba(255,255,255,0.5)", maxWidth: "500px", margin: "0 auto" }}>
            From recipes to health goals — explore our curated grocery collections
          </p>
        </div>

        <div className="row g-4">
          {featureCards.map((card, i) => (
            <div
              key={card.id}
              className="col-12 col-sm-6 col-lg-4"
              style={{
                opacity: visible ? 1 : 0,
                transform: visible ? "translateY(0)" : "translateY(40px)",
                transition: `all 0.6s ease ${i * 0.1}s`,
              }}
            >
              <div
                className="h-100"
                style={{
                  background: "rgba(255,255,255,0.04)",
                  border: "1px solid rgba(139,92,246,0.2)",
                  borderRadius: "20px",
                  padding: "1.8rem",
                  cursor: "pointer",
                  transition: "all 0.35s cubic-bezier(0.4,0,0.2,1)",
                  position: "relative",
                  overflow: "hidden",
                  backdropFilter: "blur(10px)",
                }}
                onMouseEnter={(e) => {
                  const el = e.currentTarget as HTMLElement;
                  el.style.transform = "translateY(-8px) scale(1.02)";
                  el.style.borderColor = "rgba(139,92,246,0.5)";
                  el.style.boxShadow = "0 20px 50px rgba(124,58,237,0.3)";
                  el.style.background = "rgba(139,92,246,0.12)";
                }}
                onMouseLeave={(e) => {
                  const el = e.currentTarget as HTMLElement;
                  el.style.transform = "translateY(0) scale(1)";
                  el.style.borderColor = "rgba(139,92,246,0.2)";
                  el.style.boxShadow = "none";
                  el.style.background = "rgba(255,255,255,0.04)";
                }}
                onClick={() => setModal({ card, itemsData: cardItems[card.id] || [] })}
              >
                {/* Gradient accent top */}
                <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "3px", background: `linear-gradient(90deg, ${card.color.split("from-")[1]?.split(" ")[0] || "#7c3aed"}, transparent)`, opacity: 0.8 }} />

                <div style={{ fontSize: "2.8rem", marginBottom: "1rem" }}>{card.icon}</div>
                <h5 style={{ color: "#fff", fontWeight: 700, marginBottom: "0.75rem", fontSize: "1.15rem" }}>{card.title}</h5>
                <p style={{ color: "rgba(255,255,255,0.55)", fontSize: "0.875rem", lineHeight: 1.6, marginBottom: "1.2rem" }}>
                  {card.description}
                </p>

                <div className="d-flex flex-wrap gap-1 mb-3">
                  {card.items.slice(0, 3).map((item, j) => (
                    <span
                      key={j}
                      style={{
                        background: "rgba(139,92,246,0.15)",
                        border: "1px solid rgba(139,92,246,0.3)",
                        borderRadius: "6px",
                        padding: "2px 8px",
                        fontSize: "0.72rem",
                        color: "#c084fc",
                      }}
                    >
                      {item}
                    </span>
                  ))}
                  {card.items.length > 3 && (
                    <span style={{ background: "rgba(139,92,246,0.1)", borderRadius: "6px", padding: "2px 8px", fontSize: "0.72rem", color: "rgba(255,255,255,0.4)" }}>
                      +{card.items.length - 3} more
                    </span>
                  )}
                </div>

                <button
                  className="btn btn-sm w-100"
                  style={{
                    background: added === card.id
                      ? "linear-gradient(135deg, #059669, #10b981)"
                      : "linear-gradient(135deg, rgba(124,58,237,0.5), rgba(219,39,119,0.5))",
                    border: "1px solid rgba(139,92,246,0.4)",
                    color: "#fff",
                    borderRadius: "10px",
                    padding: "8px",
                    fontWeight: 600,
                    fontSize: "0.85rem",
                    transition: "all 0.3s",
                  }}
                >
                  {added === card.id ? "✓ Added to Cart!" : "View Items →"}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal */}
      {modal && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0,0,0,0.7)",
            backdropFilter: "blur(8px)",
            zIndex: 1055,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "1rem",
          }}
          onClick={() => setModal(null)}
        >
          <div
            style={{
              background: "linear-gradient(135deg, #1a0535, #2d0a45)",
              border: "1px solid rgba(139,92,246,0.4)",
              borderRadius: "24px",
              padding: "2.5rem",
              maxWidth: "520px",
              width: "100%",
              maxHeight: "80vh",
              overflowY: "auto",
              boxShadow: "0 0 60px rgba(124,58,237,0.4)",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="d-flex align-items-start justify-content-between mb-4">
              <div>
                <div style={{ fontSize: "2.5rem" }}>{modal.card.icon}</div>
                <h4 style={{ color: "#fff", fontWeight: 700, margin: "0.5rem 0 0.25rem" }}>{modal.card.title}</h4>
                <p style={{ color: "rgba(255,255,255,0.5)", fontSize: "0.875rem", margin: 0 }}>{modal.card.description}</p>
              </div>
              <button onClick={() => setModal(null)} style={{ background: "rgba(255,255,255,0.1)", border: "none", color: "#fff", borderRadius: "10px", width: "36px", height: "36px", cursor: "pointer", fontSize: "1rem" }}>✕</button>
            </div>

            <div className="d-flex flex-column gap-2 mb-4">
              {modal.card.items.map((item, i) => (
                <div
                  key={i}
                  style={{
                    background: "rgba(139,92,246,0.12)",
                    border: "1px solid rgba(139,92,246,0.25)",
                    borderRadius: "12px",
                    padding: "0.8rem 1.2rem",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <div className="d-flex align-items-center gap-2">
                    <span style={{ fontSize: "1.4rem" }}>{modal.itemsData[i]?.emoji || "📦"}</span>
                    <span style={{ color: "#fff", fontSize: "0.9rem", fontWeight: 500 }}>{item}</span>
                  </div>
                  <span style={{ color: "#c084fc", fontWeight: 700, fontSize: "0.9rem" }}>
                    ₹{modal.itemsData[i]?.price || 299}
                  </span>
                </div>
              ))}
            </div>

            <button
              className="btn w-100"
              onClick={() => handleAddToCart(modal.card)}
              style={{
                background: "linear-gradient(135deg, #7c3aed, #db2777)",
                border: "none",
                color: "#fff",
                borderRadius: "14px",
                padding: "14px",
                fontWeight: 700,
                fontSize: "1rem",
                boxShadow: "0 0 30px rgba(124,58,237,0.4)",
                cursor: "pointer",
              }}
            >
              🛒 Add All Items to Cart
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
