
import { useEffect, useState } from "react";

interface HeroSectionProps {
  onExploreRecipes: () => void;
  onHealthGoals: () => void;
}

const floatingIcons = ["🥑", "🍅", "🥕", "🥦", "🍇", "🧄", "🥝", "🍊", "🥬", "🌽", "🍋", "🥥"];

export default function HeroSection({ onExploreRecipes, onHealthGoals }: HeroSectionProps) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 100);
    return () => clearTimeout(t);
  }, []);

  return (
    <section
      id="hero"
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #0a0015 0%, #1a0535 30%, #2d0a45 60%, #1a0020 100%)",
        position: "relative",
        overflow: "hidden",
        display: "flex",
        alignItems: "center",
        paddingTop: "80px",
      }}
    >
      {/* Animated gradient orbs */}
      <div
        style={{
          position: "absolute",
          top: "10%",
          right: "10%",
          width: "500px",
          height: "500px",
          background: "radial-gradient(circle, rgba(124,58,237,0.3) 0%, transparent 70%)",
          animation: "float1 8s ease-in-out infinite",
          pointerEvents: "none",
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: "15%",
          left: "5%",
          width: "400px",
          height: "400px",
          background: "radial-gradient(circle, rgba(219,39,119,0.25) 0%, transparent 70%)",
          animation: "float2 10s ease-in-out infinite",
          pointerEvents: "none",
        }}
      />
      <div
        style={{
          position: "absolute",
          top: "40%",
          left: "40%",
          width: "300px",
          height: "300px",
          background: "radial-gradient(circle, rgba(139,92,246,0.15) 0%, transparent 70%)",
          animation: "float1 12s ease-in-out infinite reverse",
          pointerEvents: "none",
        }}
      />

      {/* Floating food icons */}
      {floatingIcons.map((icon, i) => (
        <div
          key={i}
          style={{
            position: "absolute",
            fontSize: `${Math.random() * 1.5 + 1}rem`,
            opacity: 0.15,
            left: `${(i * 8.3) % 95}%`,
            top: `${(i * 7.7 + 10) % 85}%`,
            animation: `float${(i % 2) + 1} ${8 + i * 0.7}s ease-in-out infinite`,
            animationDelay: `${i * 0.5}s`,
            pointerEvents: "none",
          }}
        >
          {icon}
        </div>
      ))}

      <div className="container-xl position-relative">
        <div className="row align-items-center">
          <div className="col-lg-7">
            <div
              style={{
                opacity: visible ? 1 : 0,
                transform: visible ? "translateY(0)" : "translateY(40px)",
                transition: "all 0.8s cubic-bezier(0.4,0,0.2,1)",
              }}
            >
              <div className="mb-3">
                <span
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "0.5rem",
                    background: "rgba(139,92,246,0.2)",
                    border: "1px solid rgba(139,92,246,0.4)",
                    borderRadius: "50px",
                    padding: "0.4rem 1.2rem",
                    color: "#c084fc",
                    fontSize: "0.85rem",
                    fontWeight: 600,
                  }}
                >
                  ✨ Premium Grocery Experience
                </span>
              </div>

              <h1
                style={{
                  fontSize: "clamp(2.4rem, 5vw, 4rem)",
                  fontWeight: 900,
                  lineHeight: 1.1,
                  color: "#fff",
                  marginBottom: "1.5rem",
                }}
              >
                Smarter Grocery Shopping for{" "}
                <span
                  style={{
                    background: "linear-gradient(135deg, #c084fc 0%, #f43f5e 50%, #fb923c 100%)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundSize: "200% 200%",
                    animation: "gradientShift 4s ease infinite",
                  }}
                >
                  Meals & Health
                </span>
              </h1>

              <p
                style={{
                  fontSize: "1.15rem",
                  color: "rgba(255,255,255,0.65)",
                  marginBottom: "2.5rem",
                  maxWidth: "560px",
                  lineHeight: 1.7,
                }}
              >
                One-click recipe-to-cart integration and hyper-personalized health-based shopping.
                From Butter Chicken to high-protein gym meals — we've got your grocery list covered.
              </p>

              <div className="d-flex flex-wrap gap-3 mb-4">
                <button
                  onClick={onExploreRecipes}
                  className="btn btn-lg"
                  style={{
                    background: "linear-gradient(135deg, #7c3aed, #a855f7)",
                    border: "none",
                    color: "#fff",
                    borderRadius: "14px",
                    padding: "14px 32px",
                    fontWeight: 700,
                    boxShadow: "0 0 30px rgba(124,58,237,0.5)",
                    transition: "all 0.3s",
                    fontSize: "1rem",
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.transform = "translateY(-3px)";
                    (e.currentTarget as HTMLElement).style.boxShadow = "0 12px 40px rgba(124,58,237,0.7)";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
                    (e.currentTarget as HTMLElement).style.boxShadow = "0 0 30px rgba(124,58,237,0.5)";
                  }}
                >
                  🍽️ Explore Recipes
                </button>

                <button
                  onClick={onHealthGoals}
                  className="btn btn-lg"
                  style={{
                    background: "linear-gradient(135deg, #db2777, #f43f5e)",
                    border: "none",
                    color: "#fff",
                    borderRadius: "14px",
                    padding: "14px 32px",
                    fontWeight: 700,
                    boxShadow: "0 0 30px rgba(219,39,119,0.5)",
                    transition: "all 0.3s",
                    fontSize: "1rem",
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.transform = "translateY(-3px)";
                    (e.currentTarget as HTMLElement).style.boxShadow = "0 12px 40px rgba(219,39,119,0.7)";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
                    (e.currentTarget as HTMLElement).style.boxShadow = "0 0 30px rgba(219,39,119,0.5)";
                  }}
                >
                  💚 Shop by Health Goals
                </button>
              </div>

              {/* Stats */}
              <div className="d-flex gap-4 flex-wrap">
                {[
                  { number: "50+", label: "Recipes" },
                  { number: "20+", label: "Health Goals" },
                  { number: "1000+", label: "Products" },
                  { number: "Free", label: "Delivery over ₹500" },
                ].map((stat, i) => (
                  <div
                    key={i}
                    style={{
                      opacity: visible ? 1 : 0,
                      transform: visible ? "translateY(0)" : "translateY(20px)",
                      transition: `all 0.6s ease ${0.3 + i * 0.1}s`,
                    }}
                  >
                    <div
                      style={{
                        background: "linear-gradient(135deg, #c084fc, #f472b6)",
                        WebkitBackgroundClip: "text",
                        WebkitTextFillColor: "transparent",
                        fontWeight: 800,
                        fontSize: "1.5rem",
                      }}
                    >
                      {stat.number}
                    </div>
                    <div style={{ color: "rgba(255,255,255,0.5)", fontSize: "0.8rem" }}>{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="col-lg-5 d-none d-lg-flex justify-content-center">
            <div
              style={{
                opacity: visible ? 1 : 0,
                transform: visible ? "scale(1) rotate(0deg)" : "scale(0.8) rotate(-5deg)",
                transition: "all 1s cubic-bezier(0.4,0,0.2,1) 0.2s",
              }}
            >
              {/* Floating cart visualization */}
              <div
                style={{
                  width: "380px",
                  height: "380px",
                  position: "relative",
                }}
              >
                <div
                  style={{
                    width: "100%",
                    height: "100%",
                    borderRadius: "50%",
                    background: "radial-gradient(circle, rgba(124,58,237,0.3) 0%, rgba(219,39,119,0.15) 50%, transparent 70%)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    animation: "pulse-glow 3s ease-in-out infinite",
                  }}
                >
                  <div
                    style={{
                      fontSize: "8rem",
                      filter: "drop-shadow(0 0 30px rgba(192,132,252,0.8))",
                      animation: "float1 4s ease-in-out infinite",
                    }}
                  >
                    🛒
                  </div>
                </div>

                {/* Orbiting food emojis */}
                {["🍅", "🥦", "🧅", "🥕", "🥑", "🍋"].map((emoji, i) => {
                  const angle = (i / 6) * 360;
                  const rad = (angle * Math.PI) / 180;
                  const x = 155 + Math.cos(rad) * 160;
                  const y = 155 + Math.sin(rad) * 160;
                  return (
                    <div
                      key={i}
                      style={{
                        position: "absolute",
                        top: `${y}px`,
                        left: `${x}px`,
                        fontSize: "2rem",
                        transform: "translate(-50%, -50%)",
                        animation: `orbit ${6 + i * 0.5}s linear infinite`,
                        filter: "drop-shadow(0 0 10px rgba(192,132,252,0.5))",
                      }}
                    >
                      {emoji}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div
          style={{
            position: "absolute",
            bottom: "-60px",
            left: "50%",
            transform: "translateX(-50%)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "0.5rem",
            color: "rgba(255,255,255,0.3)",
            fontSize: "0.75rem",
            animation: "bounce 2s ease-in-out infinite",
          }}
        >
          <span>Scroll to explore</span>
          <span>↓</span>
        </div>
      </div>
    </section>
  );
}
