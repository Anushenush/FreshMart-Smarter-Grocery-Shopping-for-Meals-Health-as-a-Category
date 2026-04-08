
export interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  originalPrice?: number;
  emoji: string;
  rating: number;
  reviews: number;
  quantity: string;
  badge?: string;
}

export const featuredProducts: Product[] = [
  { id: "p1", name: "Organic Spinach", category: "Vegetables", price: 45, originalPrice: 60, emoji: "🥬", rating: 4.8, reviews: 128, quantity: "300g", badge: "Organic" },
  { id: "p2", name: "Farm Fresh Eggs", category: "Dairy", price: 89, originalPrice: 110, emoji: "🥚", rating: 4.9, reviews: 342, quantity: "12 pcs", badge: "Farm Fresh" },
  { id: "p3", name: "Whole Milk", category: "Dairy", price: 65, emoji: "🥛", rating: 4.7, reviews: 256, quantity: "1 Liter", },
  { id: "p4", name: "Basmati Rice", category: "Grains", price: 120, originalPrice: 150, emoji: "🍚", rating: 4.8, reviews: 189, quantity: "1 kg", badge: "Premium" },
  { id: "p5", name: "Avocado", category: "Fruits", price: 80, emoji: "🥑", rating: 4.6, reviews: 98, quantity: "2 pcs" },
  { id: "p6", name: "Greek Yogurt", category: "Dairy", price: 140, originalPrice: 170, emoji: "🫙", rating: 4.9, reviews: 221, quantity: "400g", badge: "High Protein" },
  { id: "p7", name: "Salmon Fillet", category: "Seafood", price: 420, originalPrice: 500, emoji: "🐟", rating: 4.7, reviews: 145, quantity: "400g", badge: "Fresh" },
  { id: "p8", name: "Blueberries", category: "Fruits", price: 180, emoji: "🫐", rating: 4.8, reviews: 312, quantity: "200g" },
  { id: "p9", name: "Chicken Breast", category: "Meat", price: 280, originalPrice: 320, emoji: "🍗", rating: 4.8, reviews: 445, quantity: "1 kg", badge: "Lean" },
  { id: "p10", name: "Almonds", category: "Dry Fruits", price: 220, originalPrice: 260, emoji: "🌰", rating: 4.9, reviews: 534, quantity: "200g", badge: "Premium" },
  { id: "p11", name: "Broccoli", category: "Vegetables", price: 65, emoji: "🥦", rating: 4.6, reviews: 178, quantity: "400g" },
  { id: "p12", name: "Paneer", category: "Dairy", price: 160, originalPrice: 200, emoji: "🧀", rating: 4.7, reviews: 289, quantity: "400g" },
];

export const featureCards = [
  {
    id: "recipe-to-cart",
    icon: "🍽️",
    title: "Recipe-to-Cart",
    description: "Add all ingredients for your favorite recipe with one click.",
    color: "from-purple-600 to-violet-500",
    items: ["Butter Chicken Kit", "Biryani Kit", "Pasta Kit", "Dosa Kit"],
    prices: [450, 580, 320, 180],
  },
  {
    id: "health-shopping",
    icon: "💚",
    title: "Personalized Health Shopping",
    description: "Shop based on your health goals with curated grocery packs.",
    color: "from-emerald-600 to-green-500",
    items: ["Iron Rich Pack", "Vitamin D Pack", "Weight Loss Pack", "High Protein Pack"],
    prices: [280, 320, 350, 480],
  },
  {
    id: "special-meals",
    icon: "⭐",
    title: "Special Meals",
    description: "Curated ingredients for special occasions and dietary needs.",
    color: "from-amber-500 to-orange-500",
    items: ["Festival Kit", "Anniversary Dinner", "Weekend BBQ", "Sunday Brunch"],
    prices: [650, 780, 920, 480],
  },
  {
    id: "weekly-essentials",
    icon: "📦",
    title: "Quick Weekly Essentials",
    description: "Pre-packed weekly grocery bundles to save time and money.",
    color: "from-blue-600 to-cyan-500",
    items: ["Veg Weekly Pack", "Non-Veg Pack", "Dairy Pack", "Breakfast Pack"],
    prices: [890, 1200, 450, 680],
  },
  {
    id: "family-packs",
    icon: "👨‍👩‍👧‍👦",
    title: "Family Packs",
    description: "Bulk grocery packs perfect for families of 4-6 members.",
    color: "from-rose-600 to-pink-500",
    items: ["Family Veg Pack", "Family Non-Veg Pack", "Kids Nutrition Pack", "Senior Pack"],
    prices: [1400, 1800, 900, 1100],
  },
  {
    id: "seasonal-bundles",
    icon: "🌿",
    title: "Seasonal Grocery Bundles",
    description: "Fresh seasonal produce and special festival grocery kits.",
    color: "from-teal-600 to-emerald-500",
    items: ["Summer Fruits Pack", "Monsoon Veggies", "Winter Dry Fruits", "Festival Special"],
    prices: [380, 320, 560, 720],
  },
];
