
import { useCart } from "../context/CartContext";
import { useToast } from "../context/ToastContext";

const recipeCards = [
  { img: "/images/food-spread.png", emoji: "🍽️", title: "Indian Feast", sub: "Full dinner spread", price: 580, tag: "BESTSELLER", color: "#c084fc" },
  { img: "/images/butter-chicken.png", emoji: "🍗", title: "Butter Chicken", sub: "Creamy & rich curry", price: 545, tag: "POPULAR", color: "#f472b6" },
  { img: "/images/biryani.png", emoji: "🍚", title: "Family Biryani", sub: "Aromatic layered rice", price: 645, tag: "FAMILY PACK", color: "#fb923c" },
  { img: "/images/grocery-basket.png", emoji: "🛒", title: "Fresh Essentials", sub: "Weekly staples bundle", price: 399, tag: "SAVE 20%", color: "#34d399" },
];

const healthCards = [
  { img: "/images/health-food.png", emoji: "💚", title: "Wellness Pack", sub: "Immunity + energy boost", price: 299, tag: "DOCTOR APPROVED", color: "#34d399" },
  { img: "/images/veggies.png", emoji: "🥦", title: "Fresh Veggies Cart", sub: "Farm to table daily", price: 199, tag: "ORGANIC", color: "#22d3ee" },
  { img: "/images/grocery-basket.png", emoji: "🌿", title: "Health Cart", sub: "Curated healthy picks", price: 449, tag: "HEALTH PACK", color: "#a78bfa" },
  { img: "/images/health-food.png", emoji: "🥗", title: "Diet Meal Kit", sub: "Nutritionist designed", price: 349, tag: "LOW CALORIE", color: "#f472b6" },
];

interface ScrollCardProps {
  img: string; emoji: string; title: string; sub: string;
  price: number; tag: string; color: string;
}

function ScrollCard({ img, emoji, title, sub, price, tag, color }: ScrollCardProps) {
  const { addItem } = useCart();
  const { showToast } = useToast();

  const handleAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    addItem({ id: `promo-${title}`, name: title, emoji, quantity: "1 pack", price });
    showToast({ emoji, title, source: "Featured Picks", type: "product" });
  };

  return (
    <div style={{
      flexShrink: 0,
      width: "clamp(200px, 22vw, 280px)",
      borderRadius: "20px",
      overflow: "hidden",
      background: "linear-gradient(160deg, rgba(26,5,53,0.95), rgba(45,10,69,0.95))",
      border: `1.5px solid ${color}44`,
      boxShadow: `0 4px 24px ${color}22`,
      position: "relative",
      transition: "transform 0.3s, box-shadow 0.3s",
      cursor: "pointer",
    }}
    onMouseEnter={(e) => {
      (e.currentTarget as HTMLElement).style.transform = "scale(1.04) translateY(-4px)";
      (e.currentTarget as HTMLElement).style.boxShadow = `0 16px 40px ${color}55`;
    }}
    onMouseLeave={(e) => {
      (e.currentTarget as HTMLElement).style.transform = "scale(1) translateY(0)";
      (e.currentTarget as HTMLElement).style.boxShadow = `0 4px 24px ${color}22`;
    }}
    >
      {/* Image */}
      <div style={{ position: "relative", height: "clamp(120px, 14vw, 160px)", overflow: "hidden" }}>
        <img
          src={img}
          alt={title}
          style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
          onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }}
        />
        <div style={{ position: "absolute", inset: 0, background: `linear-gradient(0deg, rgba(26,5,53,0.85) 0%, transparent 60%)` }} />
        {/* Tag badge */}
        <div style={{ position: "absolute", top: "10px", left: "10px", background: color, color: "#000", borderRadius: "8px", padding: "2px 8px", fontSize: "0.58rem", fontWeight: 800, letterSpacing: "0.05em" }}>
          {tag}
        </div>
        <div style={{ position: "absolute", bottom: "8px", left: "10px", fontSize: "1.8rem", filter: `drop-shadow(0 0 10px ${color})` }}>{emoji}</div>
      </div>

      {/* Info */}
      <div style={{ padding: "0.75rem 0.9rem 0.85rem" }}>
        <div style={{ color: "#fff", fontWeight: 800, fontSize: "0.9rem", marginBottom: "0.15rem", textShadow: `0 0 12px ${color}88` }}>{title}</div>
        <div style={{ color: "rgba(255,255,255,0.45)", fontSize: "0.72rem", marginBottom: "0.6rem" }}>{sub}</div>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <span style={{ color: color, fontWeight: 900, fontSize: "1rem", textShadow: `0 0 10px ${color}` }}>₹{price}</span>
          <button
            onClick={handleAdd}
            style={{
              background: `linear-gradient(135deg, #7c3aed, #db2777)`,
              border: "none",
              color: "#fff",
              borderRadius: "10px",
              padding: "5px 12px",
              fontSize: "0.72rem",
              fontWeight: 700,
              cursor: "pointer",
              boxShadow: "0 0 12px rgba(124,58,237,0.5)",
              transition: "all 0.2s",
            }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.transform = "scale(1.08)"; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.transform = "scale(1)"; }}
          >
            🛒 Add
          </button>
        </div>
      </div>
    </div>
  );
}

export default function PromoScroll() {
  const doubled1 = [...recipeCards, ...recipeCards, ...recipeCards];
  const doubled2 = [...healthCards, ...healthCards, ...healthCards];

  return (
    <section style={{
      padding: "4rem 0",
      background: "linear-gradient(180deg, #0a0015 0%, #120025 100%)",
      overflow: "hidden",
      position: "relative",
    }}>
      {/* Background glow orbs */}
      <div style={{ position: "absolute", top: "20%", left: "10%", width: "300px", height: "300px", background: "radial-gradient(circle, rgba(124,58,237,0.12) 0%, transparent 70%)", pointerEvents: "none" }} />
      <div style={{ position: "absolute", bottom: "10%", right: "5%", width: "250px", height: "250px", background: "radial-gradient(circle, rgba(16,185,129,0.1) 0%, transparent 70%)", pointerEvents: "none" }} />

      <div className="container-xl mb-4">
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "1rem" }}>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: "0.6rem", marginBottom: "0.35rem" }}>
              <span style={{ background: "rgba(124,58,237,0.25)", border: "1px solid rgba(139,92,246,0.5)", borderRadius: "50px", padding: "0.3rem 1rem", color: "#c084fc", fontSize: "0.8rem", fontWeight: 600 }}>
                🔥 Hot Right Now
              </span>
              <span style={{ background: "rgba(16,185,129,0.2)", border: "1px solid rgba(52,211,153,0.4)", borderRadius: "50px", padding: "0.3rem 1rem", color: "#34d399", fontSize: "0.8rem", fontWeight: 600 }}>
                💚 Health Carts Available
              </span>
            </div>
            <h2 style={{ color: "#fff", fontWeight: 800, fontSize: "clamp(1.5rem,3vw,2.2rem)", margin: 0 }}>
              Today's{" "}
              <span style={{ background: "linear-gradient(135deg,#c084fc,#f472b6,#fb923c)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                Fresh Picks
              </span>
            </h2>
          </div>
          <div style={{ display: "flex", gap: "0.5rem" }}>
            <div style={{ background: "rgba(52,211,153,0.15)", border: "1px solid rgba(52,211,153,0.4)", borderRadius: "12px", padding: "0.5rem 1rem", textAlign: "center" }}>
              <div style={{ color: "#34d399", fontWeight: 800, fontSize: "0.95rem" }}>FREE</div>
              <div style={{ color: "rgba(255,255,255,0.4)", fontSize: "0.65rem" }}>Delivery ₹499+</div>
            </div>
            <div style={{ background: "rgba(251,146,60,0.15)", border: "1px solid rgba(251,146,60,0.4)", borderRadius: "12px", padding: "0.5rem 1rem", textAlign: "center" }}>
              <div style={{ color: "#fb923c", fontWeight: 800, fontSize: "0.95rem" }}>5% OFF</div>
              <div style={{ color: "rgba(255,255,255,0.4)", fontSize: "0.65rem" }}>on Cart</div>
            </div>
          </div>
        </div>
      </div>

      {/* Row 1: Recipe images scrolling LEFT */}
      <div style={{ marginBottom: "1.25rem", position: "relative" }}>
        {/* Fade edges */}
        <div style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: "80px", background: "linear-gradient(90deg, #0a0015, transparent)", zIndex: 2, pointerEvents: "none" }} />
        <div style={{ position: "absolute", right: 0, top: 0, bottom: 0, width: "80px", background: "linear-gradient(270deg, #0a0015, transparent)", zIndex: 2, pointerEvents: "none" }} />
        <div
          style={{
            display: "flex",
            gap: "1rem",
            animation: "scrollLeft 40s linear infinite",
            width: "max-content",
            paddingLeft: "1rem",
          }}
          onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.animationPlayState = "paused"; }}
          onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.animationPlayState = "running"; }}
        >
          {doubled1.map((card, i) => (
            <ScrollCard key={i} {...card} />
          ))}
        </div>
      </div>

      {/* Row 2: Health images scrolling RIGHT */}
      <div style={{ position: "relative" }}>
        <div style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: "80px", background: "linear-gradient(90deg, #120025, transparent)", zIndex: 2, pointerEvents: "none" }} />
        <div style={{ position: "absolute", right: 0, top: 0, bottom: 0, width: "80px", background: "linear-gradient(270deg, #120025, transparent)", zIndex: 2, pointerEvents: "none" }} />
        <div
          style={{
            display: "flex",
            gap: "1rem",
            animation: "scrollRight 45s linear infinite",
            width: "max-content",
            paddingLeft: "1rem",
          }}
          onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.animationPlayState = "paused"; }}
          onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.animationPlayState = "running"; }}
        >
          {doubled2.map((card, i) => (
            <ScrollCard key={i} {...card} />
          ))}
        </div>
      </div>

      {/* Health Carts Available Banner */}
      <div className="container-xl mt-4">
        <div style={{
          background: "linear-gradient(135deg, rgba(16,185,129,0.15), rgba(6,182,212,0.1))",
          border: "1.5px solid rgba(52,211,153,0.4)",
          borderRadius: "18px",
          padding: "1.1rem 1.5rem",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          flexWrap: "wrap",
          gap: "1rem",
          boxShadow: "0 0 30px rgba(16,185,129,0.15)",
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
            <span style={{ fontSize: "2.2rem", filter: "drop-shadow(0 0 12px rgba(52,211,153,0.8))" }}>💚</span>
            <div>
              <div style={{ color: "#34d399", fontWeight: 800, fontSize: "clamp(0.95rem,2vw,1.15rem)", textShadow: "0 0 12px rgba(52,211,153,0.6)" }}>
                Health Carts are Available Now!
              </div>
              <div style={{ color: "rgba(255,255,255,0.5)", fontSize: "0.8rem", marginTop: "2px" }}>
                Pre-curated grocery carts for your health goals — Immunity, Weight Loss, Gym, Kids & more
              </div>
            </div>
          </div>
          <div style={{ display: "flex", gap: "0.5rem", alignItems: "center" }}>
            {["💪 Gym Pack", "🧘 Wellness", "👶 Kids", "🤰 Prenatal"].map((tag) => (
              <span key={tag} style={{ background: "rgba(52,211,153,0.15)", border: "1px solid rgba(52,211,153,0.35)", borderRadius: "20px", padding: "4px 12px", color: "#34d399", fontSize: "0.72rem", fontWeight: 600, whiteSpace: "nowrap" }}>{tag}</span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
