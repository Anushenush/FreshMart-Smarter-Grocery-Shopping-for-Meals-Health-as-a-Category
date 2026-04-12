
import { useState, useRef, useEffect } from "react";
import { recipes, recipeCategories, type Recipe } from "../data/recipes";
import { useCart } from "../context/CartContext";
import { useToast } from "../context/ToastContext";

const TABS = ["🧾 Ingredients", "👨‍🍳 How to Cook", "✨ Taste & Benefits"] as const;
type Tab = typeof TABS[number];

export default function RecipeSection() {
  const { addItems } = useCart();
  const { showToast } = useToast();
  const [category, setCategory] = useState("All");
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState<Recipe | null>(null);
  const [servings, setServings] = useState(4);
  const [added, setAdded] = useState(false);
  const [activeTab, setActiveTab] = useState<Tab>(TABS[0]);
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

  useEffect(() => {
    if (selected) {
      document.body.style.overflow = "hidden";
      setActiveTab(TABS[0]);
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [selected]);

  const filtered = recipes.filter((r) => {
    const matchCat = category === "All" || r.category === category;
    const matchSearch = r.name.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  const scale = servings / (selected?.servings || 4);

  const handleAddToCart = () => {
    if (!selected) return;
    const items = selected.ingredients.map((ing, i) => ({
      id: `${selected.id}-ing-${i}`,
      name: ing.name,
      emoji: ing.emoji,
      quantity: ing.quantity,
      price: Math.round(ing.price * scale),
    }));
    addItems(items);
    showToast({
      emoji: selected.emoji,
      title: `${selected.ingredients.length} ingredients added`,
      source: `${selected.name} Recipe`,
      itemCount: selected.ingredients.length,
      type: "recipe",
    });
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  const totalCost = selected?.ingredients.reduce((sum, ing) => sum + Math.round(ing.price * scale), 0) ?? 0;

  const neonColors = [
    { bg: "rgba(124,58,237,0.15)", border: "rgba(139,92,246,0.5)", text: "#c084fc", glow: "rgba(139,92,246,0.3)" },
    { bg: "rgba(219,39,119,0.15)", border: "rgba(244,114,182,0.5)", text: "#f472b6", glow: "rgba(219,39,119,0.3)" },
    { bg: "rgba(6,182,212,0.15)", border: "rgba(6,182,212,0.5)", text: "#22d3ee", glow: "rgba(6,182,212,0.3)" },
    { bg: "rgba(16,185,129,0.15)", border: "rgba(52,211,153,0.5)", text: "#34d399", glow: "rgba(16,185,129,0.3)" },
    { bg: "rgba(251,146,60,0.15)", border: "rgba(251,146,60,0.5)", text: "#fb923c", glow: "rgba(251,146,60,0.3)" },
  ];

  return (
    <section
      id="recipes"
      ref={ref}
      style={{
        padding: "5rem 0",
        background: "linear-gradient(180deg, #120025 0%, #0f0520 100%)",
        position: "relative",
      }}
    >
      <div style={{ position: "absolute", top: "10%", left: "5%", width: "350px", height: "350px", background: "radial-gradient(circle, rgba(219,39,119,0.1) 0%, transparent 70%)", pointerEvents: "none" }} />

      <div className="container-xl">
        {/* Heading */}
        <div className="text-center mb-5" style={{ opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(30px)", transition: "all 0.7s ease" }}>
          <span style={{ background: "rgba(219,39,119,0.2)", border: "1px solid rgba(219,39,119,0.4)", borderRadius: "50px", padding: "0.4rem 1.2rem", color: "#f472b6", fontSize: "0.85rem", fontWeight: 600 }}>
            🍽️ Recipe-to-Cart
          </span>
          <h2 style={{ color: "#fff", fontWeight: 800, fontSize: "clamp(1.8rem, 3vw, 2.8rem)", marginTop: "1rem", marginBottom: "0.5rem" }}>
            Cook by{" "}
            <span style={{ background: "linear-gradient(135deg, #f472b6, #fb923c)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
              Recipe
            </span>
          </h2>
          <p style={{ color: "rgba(255,255,255,0.5)", maxWidth: "500px", margin: "0 auto" }}>
            Select any meal — see ingredients, cooking steps, taste & health benefits, then add everything to your cart instantly
          </p>
        </div>

        {/* Search */}
        <div className="row mb-4 justify-content-center" style={{ opacity: visible ? 1 : 0, transition: "all 0.7s ease 0.2s" }}>
          <div className="col-12 col-md-6">
            <div style={{ display: "flex", gap: 0 }}>
              <span style={{ background: "rgba(139,92,246,0.2)", border: "1px solid rgba(139,92,246,0.4)", borderRight: "none", color: "#c084fc", display: "flex", alignItems: "center", padding: "0 1rem", borderRadius: "14px 0 0 14px", fontSize: "1.1rem" }}>
                🔍
              </span>
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search recipes..."
                style={{
                  background: "rgba(139,92,246,0.1)",
                  border: "1px solid rgba(139,92,246,0.4)",
                  borderLeft: "none",
                  color: "#fff",
                  padding: "0.8rem 1.2rem",
                  borderRadius: "0 14px 14px 0",
                  outline: "none",
                  width: "100%",
                  fontSize: "0.95rem",
                }}
              />
            </div>
          </div>
        </div>

        {/* Category Pills */}
        <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap", justifyContent: "center", marginBottom: "3rem", opacity: visible ? 1 : 0, transition: "all 0.7s ease 0.3s" }}>
          {recipeCategories.map((cat) => (
            <button
              key={cat}
              onClick={() => setCategory(cat)}
              style={{
                background: category === cat ? "linear-gradient(135deg, #7c3aed, #db2777)" : "rgba(139,92,246,0.1)",
                border: category === cat ? "1px solid transparent" : "1px solid rgba(139,92,246,0.3)",
                color: category === cat ? "#fff" : "rgba(255,255,255,0.6)",
                borderRadius: "50px",
                padding: "6px 18px",
                fontSize: "0.8rem",
                fontWeight: category === cat ? 600 : 400,
                cursor: "pointer",
                transition: "all 0.25s",
                boxShadow: category === cat ? "0 0 15px rgba(124,58,237,0.4)" : "none",
                whiteSpace: "nowrap",
              }}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Recipe Grid */}
        <div className="row g-3 g-md-4">
          {filtered.map((recipe, i) => {
            const cardThemes = [
              { border: "rgba(192,132,252,0.55)", glow: "rgba(124,58,237,0.6)", accent: "#c084fc", ingGlow: "#e879f9" },
              { border: "rgba(244,114,182,0.55)", glow: "rgba(219,39,119,0.6)", accent: "#fb923c", ingGlow: "#f472b6" },
              { border: "rgba(34,211,238,0.55)",  glow: "rgba(6,182,212,0.6)",   accent: "#22d3ee", ingGlow: "#22d3ee" },
              { border: "rgba(52,211,153,0.55)",  glow: "rgba(16,185,129,0.6)",  accent: "#34d399", ingGlow: "#34d399" },
            ];
            const theme = cardThemes[i % cardThemes.length];
            const totalIngCost = recipe.ingredients.reduce((s, ing) => s + ing.price, 0);

            const imageMap: Record<string, string> = {
              "butter-chicken":       "/images/butter-chicken.png",
              "biryani":              "/images/biryani.png",
              "dosa-chutney":         "/images/food-spread.png",
              "paneer-butter-masala": "/images/food-spread.png",
              "chicken-fried-rice":   "/images/food-spread.png",
              "pasta-alfredo":        "/images/food-spread.png",
              "veg-sandwich":         "/images/veggies.png",
              "idli-sambar":          "/images/food-spread.png",
              "pregnancy-meal":       "/images/health-food.png",
              "high-protein-gym":     "/images/health-food.png",
              "kids-meal":            "/images/grocery-basket.png",
              "avocado-toast":        "/images/veggies.png",
            };
            const imgSrc = imageMap[recipe.id] ?? "/images/food-spread.png";

            return (
            <div key={recipe.id} className="col-6 col-sm-4 col-md-4 col-lg-3" style={{ opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(30px)", transition: `all 0.5s ease ${i * 0.05}s` }}>
              <div
                style={{
                  background: "rgba(14,4,30,0.92)",
                  border: `1.5px solid ${theme.border}`,
                  borderRadius: "22px",
                  cursor: "pointer",
                  transition: "all 0.35s cubic-bezier(0.4,0,0.2,1)",
                  height: "100%",
                  backdropFilter: "blur(16px)",
                  boxShadow: `0 4px 24px ${theme.glow}44`,
                  overflow: "hidden",
                  display: "flex",
                  flexDirection: "column",
                }}
                onMouseEnter={(e) => {
                  const el = e.currentTarget as HTMLElement;
                  el.style.transform = "translateY(-8px) scale(1.02)";
                  el.style.boxShadow = `0 20px 50px ${theme.glow}88`;
                  el.style.borderColor = theme.border.replace("0.55", "1");
                }}
                onMouseLeave={(e) => {
                  const el = e.currentTarget as HTMLElement;
                  el.style.transform = "translateY(0) scale(1)";
                  el.style.boxShadow = `0 4px 24px ${theme.glow}44`;
                  el.style.borderColor = theme.border;
                }}
                onClick={() => { setSelected(recipe); setServings(recipe.servings); setAdded(false); }}
              >
                {/* Food Image */}
                <div style={{ position: "relative", height: "clamp(110px,13vw,150px)", overflow: "hidden", flexShrink: 0 }}>
                  <img
                    src={imgSrc}
                    alt={recipe.name}
                    style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
                  />
                  {/* Dark overlay + emoji overlay */}
                  <div style={{ position: "absolute", inset: 0, background: "linear-gradient(0deg, rgba(14,4,30,1) 0%, rgba(14,4,30,0.4) 60%, transparent 100%)" }} />
                  <div style={{ position: "absolute", top: "8px", left: "10px", fontSize: "1.6rem", filter: `drop-shadow(0 0 10px ${theme.glow})` }}>{recipe.emoji}</div>
                  {/* Cook time badge */}
                  <div style={{ position: "absolute", top: "8px", right: "10px", background: "rgba(0,0,0,0.65)", border: `1px solid ${theme.border}`, borderRadius: "8px", padding: "2px 7px", fontSize: "0.62rem", color: theme.accent, fontWeight: 700 }}>⏱ {recipe.cookingTime}</div>
                </div>

                {/* Card body */}
                <div style={{ padding: "0.75rem 0.9rem 0.85rem", display: "flex", flexDirection: "column", flex: 1 }}>
                  {/* Recipe name */}
                  <div style={{ color: "#fff", fontWeight: 800, fontSize: "clamp(0.82rem,1.5vw,0.95rem)", lineHeight: 1.25, marginBottom: "0.6rem" }}>{recipe.name}</div>

                  {/* ── NEON INGREDIENTS BADGE — the unique hero ── */}
                  <div style={{
                    background: `linear-gradient(135deg, ${theme.glow.replace("0.6","0.18")}, ${theme.glow.replace("0.6","0.08")})`,
                    border: `1.5px solid ${theme.border}`,
                    borderRadius: "12px",
                    padding: "0.5rem 0.7rem",
                    marginBottom: "0.6rem",
                    textAlign: "center",
                  }}>
                    <span style={{
                      fontWeight: 900,
                      fontSize: "clamp(1.1rem,2.2vw,1.35rem)",
                      color: theme.ingGlow,
                      textShadow: `0 0 10px ${theme.ingGlow}, 0 0 22px ${theme.ingGlow}aa, 0 0 40px ${theme.ingGlow}55`,
                      letterSpacing: "-0.01em",
                      display: "block",
                      lineHeight: 1,
                    }}>
                      {recipe.ingredients.length}
                    </span>
                    <span style={{
                      fontWeight: 800,
                      fontSize: "clamp(0.62rem,1.2vw,0.72rem)",
                      color: theme.ingGlow,
                      textShadow: `0 0 8px ${theme.ingGlow}, 0 0 16px ${theme.ingGlow}88`,
                      letterSpacing: "0.1em",
                      textTransform: "uppercase",
                    }}>
                      Ingredients
                    </span>
                  </div>

                  {/* Price + servings row */}
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.65rem", marginTop: "auto" }}>
                    <span style={{ color: theme.accent, fontWeight: 900, fontSize: "clamp(0.9rem,1.8vw,1.05rem)", textShadow: `0 0 10px ${theme.glow}` }}>₹{totalIngCost}</span>
                    <span style={{ color: "rgba(255,255,255,0.4)", fontSize: "0.68rem" }}>🍴 {recipe.servings} servings</span>
                  </div>

                  {/* CTA */}
                  <div style={{ background: "linear-gradient(135deg,#7c3aed,#db2777)", borderRadius: "12px", padding: "8px", color: "#fff", fontSize: "0.78rem", fontWeight: 800, textAlign: "center", boxShadow: `0 0 16px ${theme.glow}66` }}>
                    🛒 Add to Cart
                  </div>
                </div>
              </div>
            </div>
            );
          })}
          {filtered.length === 0 && (
            <div className="col-12 text-center" style={{ padding: "3rem", color: "rgba(255,255,255,0.4)" }}>
              No recipes found. Try a different search or category.
            </div>
          )}
        </div>
      </div>

      {/* ─── Recipe Detail Modal ─── */}
      {selected && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0,0,0,0.8)",
            backdropFilter: "blur(12px)",
            zIndex: 1055,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "env(safe-area-inset-top, 0.75rem) 0.75rem env(safe-area-inset-bottom, 0.75rem)",
          }}
          onClick={() => setSelected(null)}
        >
          <div
            style={{
              background: "linear-gradient(135deg, #1a0535 0%, #2d0a45 100%)",
              border: "1px solid rgba(139,92,246,0.45)",
              borderRadius: "clamp(16px,3vw,26px)",
              width: "100%",
              maxWidth: "720px",
              maxHeight: "92dvh",
              display: "flex",
              flexDirection: "column",
              boxShadow: "0 0 80px rgba(124,58,237,0.45), 0 0 0 1px rgba(192,132,252,0.1)",
              overflow: "hidden",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* ── Modal Header ── */}
            <div style={{
              padding: "clamp(1rem,3vw,1.75rem) clamp(1rem,3vw,1.75rem) 0",
              flexShrink: 0,
            }}>
              <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: "1rem", marginBottom: "1rem" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "clamp(0.75rem,2vw,1rem)", minWidth: 0 }}>
                  <div style={{ fontSize: "clamp(2.8rem,6vw,4rem)", filter: "drop-shadow(0 0 18px rgba(192,132,252,0.6))", flexShrink: 0 }}>{selected.emoji}</div>
                  <div style={{ minWidth: 0 }}>
                    <h4 style={{ color: "#fff", fontWeight: 800, margin: 0, fontSize: "clamp(1.1rem,2.5vw,1.5rem)", lineHeight: 1.2 }}>{selected.name}</h4>
                    <p style={{ color: "rgba(255,255,255,0.5)", fontSize: "clamp(0.72rem,1.5vw,0.88rem)", margin: "0.3rem 0 0", lineHeight: 1.4 }}>{selected.description}</p>
                  </div>
                </div>
                <button
                  onClick={() => setSelected(null)}
                  style={{ background: "rgba(255,255,255,0.1)", border: "1px solid rgba(255,255,255,0.15)", color: "#fff", borderRadius: "12px", width: "38px", height: "38px", cursor: "pointer", fontSize: "1rem", flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center" }}
                >✕</button>
              </div>

              {/* Info Badges */}
              <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap", marginBottom: "1rem" }}>
                {[
                  { icon: "⏱️", text: selected.cookingTime },
                  { icon: "📊", text: selected.difficulty },
                  { icon: "🍴", text: `${selected.servings} servings` },
                  { icon: "🔥", text: `${selected.nutrition.calories} kcal` },
                  { icon: "💪", text: `${selected.nutrition.protein} protein` },
                ].map(({ icon, text }, i) => (
                  <span key={i} style={{ background: "rgba(139,92,246,0.2)", border: "1px solid rgba(139,92,246,0.35)", borderRadius: "8px", padding: "4px 10px", fontSize: "clamp(0.7rem,1.3vw,0.82rem)", color: "#c084fc", whiteSpace: "nowrap" }}>
                    {icon} {text}
                  </span>
                ))}
              </div>

              {/* Tabs */}
              <div style={{ display: "flex", gap: "0.4rem", borderBottom: "1px solid rgba(139,92,246,0.2)", paddingBottom: 0, overflowX: "auto" }}>
                {TABS.map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    style={{
                      background: activeTab === tab ? "rgba(139,92,246,0.2)" : "transparent",
                      border: "none",
                      borderBottom: activeTab === tab ? "2px solid #c084fc" : "2px solid transparent",
                      color: activeTab === tab ? "#c084fc" : "rgba(255,255,255,0.45)",
                      padding: "0.6rem 0.9rem",
                      cursor: "pointer",
                      fontWeight: activeTab === tab ? 700 : 400,
                      fontSize: "clamp(0.72rem,1.5vw,0.85rem)",
                      borderRadius: "8px 8px 0 0",
                      whiteSpace: "nowrap",
                      transition: "all 0.2s",
                    }}
                  >
                    {tab}
                  </button>
                ))}
              </div>
            </div>

            {/* ── Tab Content (scrollable) ── */}
            <div style={{ flex: 1, overflowY: "auto", padding: "clamp(1rem,3vw,1.5rem) clamp(1rem,3vw,1.75rem)" }}>

              {/* ── TAB 1: INGREDIENTS ── */}
              {activeTab === TABS[0] && (
                <div>
                  {/* Servings Selector */}
                  <div style={{ background: "rgba(139,92,246,0.1)", border: "1px solid rgba(139,92,246,0.25)", borderRadius: "14px", padding: "0.9rem 1.1rem", marginBottom: "1.25rem" }}>
                    <div style={{ color: "rgba(255,255,255,0.5)", fontSize: "0.75rem", fontWeight: 700, marginBottom: "0.6rem", letterSpacing: "0.08em" }}>SERVING SIZE</div>
                    <div style={{ display: "flex", gap: "0.5rem" }}>
                      {[1, 2, 4, 6].map((s) => (
                        <button
                          key={s}
                          onClick={() => setServings(s)}
                          style={{
                            flex: 1,
                            background: servings === s ? "linear-gradient(135deg, #7c3aed, #db2777)" : "rgba(139,92,246,0.15)",
                            border: servings === s ? "1px solid transparent" : "1px solid rgba(139,92,246,0.3)",
                            color: "#fff",
                            borderRadius: "10px",
                            padding: "8px 4px",
                            cursor: "pointer",
                            fontWeight: 600,
                            fontSize: "clamp(0.72rem,1.5vw,0.85rem)",
                            transition: "all 0.2s",
                            boxShadow: servings === s ? "0 0 15px rgba(124,58,237,0.4)" : "none",
                          }}
                        >
                          {s} {s === 1 ? "person" : "people"}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div style={{ marginBottom: "1.1rem" }}>
                    <div style={{
                      fontWeight: 900,
                      fontSize: "clamp(1.3rem,3vw,1.7rem)",
                      letterSpacing: "-0.01em",
                      lineHeight: 1.1,
                      background: "linear-gradient(135deg, #e879f9, #c084fc, #f472b6)",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                      filter: "drop-shadow(0 0 12px rgba(192,132,252,0.8)) drop-shadow(0 0 28px rgba(244,114,182,0.5))",
                      display: "inline-block",
                    }}>
                      🧾 {selected.ingredients.length} Ingredients
                    </div>
                    <div style={{ color: "rgba(255,255,255,0.4)", fontSize: "0.82rem", marginTop: "2px" }}>
                      for {servings} {servings === 1 ? "person" : "people"}
                    </div>
                  </div>

                  {/* Neon Ingredients Grid — 2 columns, large cards */}
                  <div style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(2, 1fr)",
                    gap: "0.7rem",
                    marginBottom: "1.25rem",
                  }}>
                    {selected.ingredients.map((ing, i) => {
                      const col = neonColors[i % neonColors.length];
                      return (
                        <div
                          key={i}
                          style={{
                            background: col.bg,
                            border: `1.5px solid ${col.border}`,
                            borderRadius: "16px",
                            padding: "0.9rem 1rem",
                            display: "flex",
                            alignItems: "center",
                            gap: "0.75rem",
                            boxShadow: `0 0 18px ${col.glow}, inset 0 1px 0 rgba(255,255,255,0.06)`,
                            position: "relative",
                            overflow: "hidden",
                          }}
                        >
                          {/* left accent bar */}
                          <div style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: "3px", background: `linear-gradient(180deg, ${col.text}, transparent)`, borderRadius: "16px 0 0 16px" }} />
                          <span style={{ fontSize: "2rem", filter: `drop-shadow(0 0 10px ${col.glow}) drop-shadow(0 0 20px ${col.glow})`, flexShrink: 0 }}>{ing.emoji}</span>
                          <div style={{ minWidth: 0, flex: 1 }}>
                            <div style={{
                              color: "#fff",
                              fontWeight: 700,
                              fontSize: "clamp(0.82rem,1.6vw,0.95rem)",
                              lineHeight: 1.2,
                              marginBottom: "0.2rem",
                              textShadow: `0 0 12px ${col.glow}, 0 0 24px ${col.glow}88`,
                            }}>{ing.name}</div>
                            <div style={{ color: col.text, fontSize: "clamp(0.72rem,1.3vw,0.8rem)", fontWeight: 600, opacity: 0.85 }}>{ing.quantity}</div>
                          </div>
                          <div style={{
                            color: col.text,
                            fontWeight: 900,
                            fontSize: "clamp(0.9rem,1.7vw,1.05rem)",
                            flexShrink: 0,
                            textShadow: `0 0 12px ${col.glow}, 0 0 24px ${col.glow}`,
                          }}>
                            ₹{Math.round(ing.price * scale)}
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  {/* Nutrition Summary */}
                  <div style={{ background: "rgba(139,92,246,0.08)", border: "1px solid rgba(139,92,246,0.2)", borderRadius: "14px", padding: "0.9rem 1.1rem" }}>
                    <div style={{ color: "rgba(255,255,255,0.5)", fontSize: "0.75rem", fontWeight: 700, marginBottom: "0.6rem", letterSpacing: "0.08em" }}>NUTRITION PER SERVING</div>
                    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(90px,1fr))", gap: "0.5rem" }}>
                      {[
                        { label: "Calories", value: `${selected.nutrition.calories}`, unit: "kcal", color: "#fb923c" },
                        { label: "Protein", value: selected.nutrition.protein, unit: "", color: "#34d399" },
                        { label: "Carbs", value: selected.nutrition.carbs, unit: "", color: "#22d3ee" },
                        { label: "Fat", value: selected.nutrition.fat, unit: "", color: "#f472b6" },
                        { label: "Fiber", value: selected.nutrition.fiber, unit: "", color: "#a78bfa" },
                      ].map(({ label, value, unit, color }) => (
                        <div key={label} style={{ textAlign: "center", padding: "0.5rem", background: "rgba(255,255,255,0.03)", borderRadius: "10px" }}>
                          <div style={{ color, fontWeight: 800, fontSize: "clamp(0.85rem,1.6vw,1rem)", textShadow: `0 0 10px ${color}66` }}>{value}{unit}</div>
                          <div style={{ color: "rgba(255,255,255,0.4)", fontSize: "0.65rem", marginTop: "2px" }}>{label}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* ── TAB 2: COOKING STEPS ── */}
              {activeTab === TABS[1] && (
                <div>
                  <div style={{ color: "#fff", fontWeight: 700, fontSize: "clamp(0.85rem,1.8vw,1rem)", marginBottom: "1rem" }}>
                    👨‍🍳 Step-by-Step Cooking Guide
                  </div>
                  <div style={{ display: "flex", flexDirection: "column", gap: "0.7rem" }}>
                    {selected.cookingSteps.map((step, i) => (
                      <div
                        key={i}
                        style={{
                          display: "flex",
                          gap: "0.9rem",
                          alignItems: "flex-start",
                          background: "rgba(255,255,255,0.03)",
                          border: "1px solid rgba(139,92,246,0.15)",
                          borderRadius: "14px",
                          padding: "0.85rem 1rem",
                          transition: "all 0.2s",
                        }}
                      >
                        <div style={{
                          width: "30px",
                          height: "30px",
                          borderRadius: "50%",
                          background: `linear-gradient(135deg, ${
                            i % 3 === 0 ? "#7c3aed, #db2777" :
                            i % 3 === 1 ? "#0891b2, #7c3aed" : "#059669, #0891b2"
                          })`,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          color: "#fff",
                          fontWeight: 800,
                          fontSize: "0.78rem",
                          flexShrink: 0,
                          boxShadow: "0 0 12px rgba(124,58,237,0.35)",
                        }}>
                          {i + 1}
                        </div>
                        <p style={{ color: "rgba(255,255,255,0.85)", fontSize: "clamp(0.78rem,1.5vw,0.88rem)", margin: 0, lineHeight: 1.6 }}>
                          {step}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* ── TAB 3: TASTE & HEALTH BENEFITS ── */}
              {activeTab === TABS[2] && (
                <div>
                  {/* Taste Profile */}
                  <div style={{ marginBottom: "1.5rem" }}>
                    <div style={{ color: "#fff", fontWeight: 700, fontSize: "clamp(0.85rem,1.8vw,1rem)", marginBottom: "0.75rem" }}>
                      👅 Taste Profile
                    </div>
                    <div style={{
                      background: "linear-gradient(135deg, rgba(219,39,119,0.12), rgba(251,146,60,0.12))",
                      border: "1px solid rgba(244,114,182,0.4)",
                      borderRadius: "16px",
                      padding: "1.1rem 1.3rem",
                      boxShadow: "0 0 20px rgba(219,39,119,0.15)",
                    }}>
                      <p style={{ color: "rgba(255,255,255,0.9)", fontSize: "clamp(0.82rem,1.6vw,0.95rem)", lineHeight: 1.7, margin: 0 }}>
                        {selected.taste}
                      </p>
                    </div>
                  </div>

                  {/* Health Benefits */}
                  <div>
                    <div style={{ color: "#fff", fontWeight: 700, fontSize: "clamp(0.85rem,1.8vw,1rem)", marginBottom: "0.75rem" }}>
                      💚 Health Benefits
                    </div>
                    <div style={{ display: "flex", flexDirection: "column", gap: "0.6rem" }}>
                      {selected.healthBenefits.map((benefit, i) => {
                        const benefitColors = [
                          { bg: "rgba(16,185,129,0.12)", border: "rgba(52,211,153,0.4)", bullet: "#34d399", glow: "rgba(16,185,129,0.3)" },
                          { bg: "rgba(6,182,212,0.12)", border: "rgba(6,182,212,0.4)", bullet: "#22d3ee", glow: "rgba(6,182,212,0.3)" },
                          { bg: "rgba(139,92,246,0.12)", border: "rgba(139,92,246,0.4)", bullet: "#a78bfa", glow: "rgba(139,92,246,0.3)" },
                          { bg: "rgba(251,146,60,0.12)", border: "rgba(251,146,60,0.4)", bullet: "#fb923c", glow: "rgba(251,146,60,0.3)" },
                          { bg: "rgba(244,114,182,0.12)", border: "rgba(244,114,182,0.4)", bullet: "#f472b6", glow: "rgba(244,114,182,0.3)" },
                        ];
                        const bc = benefitColors[i % benefitColors.length];
                        return (
                          <div
                            key={i}
                            style={{
                              display: "flex",
                              gap: "0.8rem",
                              alignItems: "flex-start",
                              background: bc.bg,
                              border: `1px solid ${bc.border}`,
                              borderRadius: "14px",
                              padding: "0.85rem 1rem",
                              boxShadow: `0 0 10px ${bc.glow}`,
                            }}
                          >
                            <span style={{ color: bc.bullet, fontSize: "1.1rem", flexShrink: 0, marginTop: "1px", textShadow: `0 0 8px ${bc.glow}` }}>✦</span>
                            <p style={{ color: "rgba(255,255,255,0.85)", fontSize: "clamp(0.78rem,1.5vw,0.88rem)", margin: 0, lineHeight: 1.6 }}>
                              {benefit}
                            </p>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* ── Sticky Footer CTA ── */}
            <div style={{
              padding: "0.9rem clamp(1rem,3vw,1.75rem)",
              borderTop: "1px solid rgba(139,92,246,0.2)",
              background: "linear-gradient(0deg, #1a0535 0%, transparent 100%)",
              flexShrink: 0,
              display: "flex",
              gap: "0.75rem",
              alignItems: "center",
            }}>
              <div style={{ flex: 1 }}>
                <div style={{ color: "rgba(255,255,255,0.4)", fontSize: "0.72rem" }}>Total for {servings} {servings === 1 ? "person" : "people"}</div>
                <div style={{ background: "linear-gradient(135deg, #c084fc, #f472b6)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", fontWeight: 800, fontSize: "clamp(1.1rem,2.5vw,1.4rem)" }}>
                  ₹{totalCost}
                </div>
              </div>
              <button
                onClick={handleAddToCart}
                style={{
                  flex: 2,
                  background: added ? "linear-gradient(135deg, #059669, #10b981)" : "linear-gradient(135deg, #7c3aed, #db2777)",
                  border: "none",
                  color: "#fff",
                  borderRadius: "14px",
                  padding: "clamp(10px,2vw,14px) 1rem",
                  fontWeight: 700,
                  fontSize: "clamp(0.82rem,1.6vw,0.95rem)",
                  cursor: "pointer",
                  boxShadow: `0 0 25px ${added ? "rgba(5,150,105,0.5)" : "rgba(124,58,237,0.5)"}`,
                  transition: "all 0.3s",
                  whiteSpace: "nowrap",
                }}
              >
                {added ? "✓ All Added to Cart!" : `🛒 Add All ${selected.ingredients.length} Ingredients`}
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
