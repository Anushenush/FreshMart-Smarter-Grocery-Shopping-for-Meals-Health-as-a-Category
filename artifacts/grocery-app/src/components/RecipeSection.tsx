
import { useState, useRef, useEffect } from "react";
import { recipes, recipeCategories, type Recipe } from "../data/recipes";
import { useCart } from "../context/CartContext";
import { useToast } from "../context/ToastContext";

export default function RecipeSection() {
  const { addItems } = useCart();
  const { showToast } = useToast();
  const [category, setCategory] = useState("All");
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState<Recipe | null>(null);
  const [servings, setServings] = useState(4);
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
      emoji: selected.emoji,
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
            Select any meal and instantly add all ingredients to your cart with one click
          </p>
        </div>

        {/* Search */}
        <div className="row mb-4 justify-content-center" style={{ opacity: visible ? 1 : 0, transition: "all 0.7s ease 0.2s" }}>
          <div className="col-md-6">
            <div className="input-group">
              <span style={{ background: "rgba(139,92,246,0.2)", border: "1px solid rgba(139,92,246,0.4)", borderLeft: "1px solid rgba(139,92,246,0.4)", color: "#c084fc", display: "flex", alignItems: "center", padding: "0 1rem", borderRadius: "14px 0 0 14px" }}>
                🔍
              </span>
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search recipes (Biryani, Dosa, Pasta...)"
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

        {/* Category pills */}
        <div className="d-flex gap-2 flex-wrap justify-content-center mb-5" style={{ opacity: visible ? 1 : 0, transition: "all 0.7s ease 0.3s" }}>
          {recipeCategories.map((cat) => (
            <button
              key={cat}
              onClick={() => setCategory(cat)}
              style={{
                background: category === cat
                  ? "linear-gradient(135deg, #7c3aed, #db2777)"
                  : "rgba(139,92,246,0.1)",
                border: category === cat
                  ? "1px solid transparent"
                  : "1px solid rgba(139,92,246,0.3)",
                color: category === cat ? "#fff" : "rgba(255,255,255,0.6)",
                borderRadius: "50px",
                padding: "6px 18px",
                fontSize: "0.8rem",
                fontWeight: category === cat ? 600 : 400,
                cursor: "pointer",
                transition: "all 0.25s",
                boxShadow: category === cat ? "0 0 15px rgba(124,58,237,0.4)" : "none",
              }}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Recipe Grid */}
        <div className="row g-4">
          {filtered.map((recipe, i) => (
            <div key={recipe.id} className="col-6 col-md-4 col-lg-3" style={{ opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(30px)", transition: `all 0.5s ease ${i * 0.05}s` }}>
              <div
                style={{
                  background: "rgba(255,255,255,0.04)",
                  border: "1px solid rgba(139,92,246,0.2)",
                  borderRadius: "18px",
                  padding: "1.4rem",
                  cursor: "pointer",
                  transition: "all 0.3s cubic-bezier(0.4,0,0.2,1)",
                  height: "100%",
                  textAlign: "center",
                  backdropFilter: "blur(10px)",
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
                onClick={() => {
                  setSelected(recipe);
                  setServings(recipe.servings);
                  setAdded(false);
                }}
              >
                <div style={{ fontSize: "3rem", marginBottom: "0.75rem", filter: "drop-shadow(0 0 10px rgba(192,132,252,0.4))" }}>{recipe.emoji}</div>
                <h6 style={{ color: "#fff", fontWeight: 700, fontSize: "0.9rem", marginBottom: "0.4rem" }}>{recipe.name}</h6>
                <div style={{ display: "flex", justifyContent: "center", gap: "0.5rem", flexWrap: "wrap", marginBottom: "0.75rem" }}>
                  <span style={{ background: "rgba(139,92,246,0.2)", borderRadius: "6px", padding: "2px 8px", fontSize: "0.7rem", color: "#c084fc" }}>{recipe.category}</span>
                  <span style={{ background: "rgba(251,146,60,0.15)", borderRadius: "6px", padding: "2px 8px", fontSize: "0.7rem", color: "#fb923c" }}>{recipe.cookingTime}</span>
                </div>
                <div style={{ color: "rgba(255,255,255,0.4)", fontSize: "0.75rem" }}>{recipe.ingredients.length} ingredients</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Recipe Detail Modal */}
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
              background: "linear-gradient(135deg, #1a0535 0%, #2d0a45 100%)",
              border: "1px solid rgba(139,92,246,0.4)",
              borderRadius: "24px",
              padding: "2rem",
              maxWidth: "640px",
              width: "100%",
              maxHeight: "85vh",
              overflowY: "auto",
              boxShadow: "0 0 80px rgba(124,58,237,0.4)",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="d-flex align-items-start justify-content-between mb-3">
              <div className="d-flex align-items-center gap-3">
                <div style={{ fontSize: "3.5rem", filter: "drop-shadow(0 0 15px rgba(192,132,252,0.5))" }}>{selected.emoji}</div>
                <div>
                  <h4 style={{ color: "#fff", fontWeight: 700, margin: 0 }}>{selected.name}</h4>
                  <p style={{ color: "rgba(255,255,255,0.5)", fontSize: "0.85rem", margin: "0.25rem 0 0" }}>{selected.description}</p>
                </div>
              </div>
              <button onClick={() => setSelected(null)} style={{ background: "rgba(255,255,255,0.1)", border: "none", color: "#fff", borderRadius: "10px", width: "36px", height: "36px", cursor: "pointer" }}>✕</button>
            </div>

            {/* Info badges */}
            <div className="d-flex gap-2 flex-wrap mb-3">
              {[
                { icon: "⏱️", text: selected.cookingTime },
                { icon: "📊", text: selected.difficulty },
                { icon: "🍴", text: `${selected.servings} servings` },
                { icon: "🔥", text: `${selected.nutrition.calories} kcal` },
              ].map(({ icon, text }, i) => (
                <span key={i} style={{ background: "rgba(139,92,246,0.2)", border: "1px solid rgba(139,92,246,0.35)", borderRadius: "8px", padding: "4px 12px", fontSize: "0.8rem", color: "#c084fc" }}>
                  {icon} {text}
                </span>
              ))}
            </div>

            {/* Servings Selector */}
            <div style={{ background: "rgba(139,92,246,0.1)", border: "1px solid rgba(139,92,246,0.25)", borderRadius: "14px", padding: "1rem 1.2rem", marginBottom: "1.25rem" }}>
              <div style={{ color: "rgba(255,255,255,0.6)", fontSize: "0.8rem", marginBottom: "0.75rem", fontWeight: 600 }}>SERVING SIZE</div>
              <div className="d-flex gap-2">
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
                      padding: "8px",
                      cursor: "pointer",
                      fontWeight: 600,
                      fontSize: "0.85rem",
                      transition: "all 0.2s",
                    }}
                  >
                    {s} {s === 1 ? "person" : "people"}
                  </button>
                ))}
              </div>
            </div>

            {/* Ingredients */}
            <h6 style={{ color: "#fff", fontWeight: 700, marginBottom: "0.75rem" }}>🧾 Ingredients for {servings} {servings === 1 ? "person" : "people"}</h6>
            <div className="row g-2 mb-3">
              {selected.ingredients.map((ing, i) => (
                <div key={i} className="col-6">
                  <div style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(139,92,246,0.2)", borderRadius: "10px", padding: "0.6rem 0.9rem", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <div>
                      <div style={{ color: "#fff", fontSize: "0.82rem", fontWeight: 500 }}>{ing.name}</div>
                      <div style={{ color: "rgba(255,255,255,0.4)", fontSize: "0.72rem" }}>{ing.quantity}</div>
                    </div>
                    <div style={{ color: "#c084fc", fontWeight: 700, fontSize: "0.82rem" }}>₹{Math.round(ing.price * scale)}</div>
                  </div>
                </div>
              ))}
            </div>

            {/* Nutrition */}
            <div style={{ background: "rgba(139,92,246,0.08)", border: "1px solid rgba(139,92,246,0.2)", borderRadius: "14px", padding: "1rem 1.2rem", marginBottom: "1.25rem" }}>
              <div style={{ color: "rgba(255,255,255,0.6)", fontSize: "0.8rem", fontWeight: 600, marginBottom: "0.75rem" }}>NUTRITION PER SERVING</div>
              <div className="row g-2">
                {[
                  { label: "Calories", value: `${selected.nutrition.calories} kcal` },
                  { label: "Protein", value: selected.nutrition.protein },
                  { label: "Carbs", value: selected.nutrition.carbs },
                  { label: "Fat", value: selected.nutrition.fat },
                  { label: "Fiber", value: selected.nutrition.fiber },
                ].map(({ label, value }) => (
                  <div key={label} className="col-6 col-sm-4">
                    <div style={{ textAlign: "center" }}>
                      <div style={{ color: "#c084fc", fontWeight: 700, fontSize: "1rem" }}>{value}</div>
                      <div style={{ color: "rgba(255,255,255,0.4)", fontSize: "0.72rem" }}>{label}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <button
              onClick={handleAddToCart}
              style={{
                width: "100%",
                background: added ? "linear-gradient(135deg, #059669, #10b981)" : "linear-gradient(135deg, #7c3aed, #db2777)",
                border: "none",
                color: "#fff",
                borderRadius: "14px",
                padding: "14px",
                fontWeight: 700,
                fontSize: "1rem",
                cursor: "pointer",
                boxShadow: `0 0 30px ${added ? "rgba(5,150,105,0.5)" : "rgba(124,58,237,0.5)"}`,
                transition: "all 0.3s",
              }}
            >
              {added ? "✓ All Ingredients Added!" : `🛒 Add Full Recipe to Cart — ₹${selected.ingredients.reduce((sum, ing) => sum + Math.round(ing.price * scale), 0)}`}
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
