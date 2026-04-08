
import { useRef, useState } from "react";
import { CartProvider } from "./context/CartContext";
import Navbar from "./components/Navbar";
import HeroSection from "./components/HeroSection";
import FeatureCards from "./components/FeatureCards";
import RecipeSection from "./components/RecipeSection";
import HealthSection from "./components/HealthSection";
import FeaturedProducts from "./components/FeaturedProducts";
import CartDrawer from "./components/CartDrawer";
import Footer from "./components/Footer";

function AppContent() {
  const [cartOpen, setCartOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(true);

  const heroRef = useRef<HTMLDivElement>(null);
  const recipesRef = useRef<HTMLDivElement>(null);
  const healthRef = useRef<HTMLDivElement>(null);
  const categoriesRef = useRef<HTMLDivElement>(null);
  const offersRef = useRef<HTMLDivElement>(null);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div style={{ background: "#0a0015", minHeight: "100vh" }}>
      <Navbar
        onCartOpen={() => setCartOpen(true)}
        darkMode={darkMode}
        onDarkModeToggle={() => setDarkMode((d) => !d)}
        onSectionNav={scrollTo}
      />

      <HeroSection
        onExploreRecipes={() => scrollTo("recipes")}
        onHealthGoals={() => scrollTo("health")}
      />
      <FeatureCards />
      <RecipeSection />
      <HealthSection />
      <FeaturedProducts />
      <Footer />

      <CartDrawer open={cartOpen} onClose={() => setCartOpen(false)} />
    </div>
  );
}

export default function App() {
  return (
    <CartProvider>
      <AppContent />
    </CartProvider>
  );
}
