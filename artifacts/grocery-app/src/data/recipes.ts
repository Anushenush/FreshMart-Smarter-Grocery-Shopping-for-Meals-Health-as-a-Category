
export interface Ingredient {
  name: string;
  quantity: string;
  price: number;
}

export interface Recipe {
  id: string;
  name: string;
  category: string;
  cookingTime: string;
  difficulty: string;
  servings: number;
  emoji: string;
  description: string;
  ingredients: Ingredient[];
  nutrition: {
    calories: number;
    protein: string;
    carbs: string;
    fat: string;
    fiber: string;
  };
}

export const recipes: Recipe[] = [
  {
    id: "butter-chicken",
    name: "Butter Chicken",
    category: "Dinner",
    cookingTime: "45 min",
    difficulty: "Medium",
    servings: 4,
    emoji: "🍗",
    description: "Rich and creamy North Indian curry with tender chicken in a buttery tomato sauce.",
    ingredients: [
      { name: "Chicken breast", quantity: "800g", price: 280 },
      { name: "Butter", quantity: "100g", price: 60 },
      { name: "Tomatoes", quantity: "500g", price: 40 },
      { name: "Heavy cream", quantity: "200ml", price: 80 },
      { name: "Onion", quantity: "2 large", price: 20 },
      { name: "Garlic", quantity: "8 cloves", price: 15 },
      { name: "Ginger", quantity: "2 inch", price: 10 },
      { name: "Garam masala", quantity: "2 tsp", price: 20 },
      { name: "Kashmiri red chili", quantity: "2 tsp", price: 15 },
      { name: "Salt", quantity: "to taste", price: 5 },
    ],
    nutrition: { calories: 420, protein: "38g", carbs: "12g", fat: "24g", fiber: "3g" },
  },
  {
    id: "biryani",
    name: "Family Biryani",
    category: "Dinner",
    cookingTime: "90 min",
    difficulty: "Hard",
    servings: 6,
    emoji: "🍚",
    description: "Aromatic layered rice dish with spiced meat, saffron, and caramelized onions.",
    ingredients: [
      { name: "Basmati rice", quantity: "500g", price: 90 },
      { name: "Chicken", quantity: "1kg", price: 300 },
      { name: "Onion", quantity: "4 large", price: 40 },
      { name: "Yogurt", quantity: "250g", price: 50 },
      { name: "Saffron", quantity: "1 pinch", price: 30 },
      { name: "Mint leaves", quantity: "1 bunch", price: 20 },
      { name: "Ghee", quantity: "4 tbsp", price: 60 },
      { name: "Whole spices", quantity: "mixed", price: 25 },
      { name: "Rose water", quantity: "2 tbsp", price: 20 },
    ],
    nutrition: { calories: 580, protein: "35g", carbs: "65g", fat: "18g", fiber: "4g" },
  },
  {
    id: "dosa-chutney",
    name: "Dosa & Chutney Combo",
    category: "Breakfast",
    cookingTime: "30 min",
    difficulty: "Easy",
    servings: 4,
    emoji: "🫓",
    description: "Crispy South Indian crepes served with fresh coconut chutney and sambar.",
    ingredients: [
      { name: "Dosa batter", quantity: "500g", price: 45 },
      { name: "Coconut", quantity: "1 cup grated", price: 30 },
      { name: "Green chili", quantity: "3", price: 5 },
      { name: "Urad dal", quantity: "50g", price: 20 },
      { name: "Curry leaves", quantity: "1 sprig", price: 5 },
      { name: "Mustard seeds", quantity: "1 tsp", price: 5 },
      { name: "Oil", quantity: "4 tbsp", price: 15 },
    ],
    nutrition: { calories: 220, protein: "8g", carbs: "38g", fat: "5g", fiber: "6g" },
  },
  {
    id: "paneer-butter-masala",
    name: "Paneer Butter Masala",
    category: "Dinner",
    cookingTime: "35 min",
    difficulty: "Easy",
    servings: 4,
    emoji: "🧀",
    description: "Soft cottage cheese cubes in a velvety, mildly spiced tomato-cream sauce.",
    ingredients: [
      { name: "Paneer", quantity: "400g", price: 160 },
      { name: "Butter", quantity: "80g", price: 50 },
      { name: "Tomato puree", quantity: "400g", price: 60 },
      { name: "Cream", quantity: "150ml", price: 65 },
      { name: "Cashews", quantity: "30g", price: 40 },
      { name: "Onion", quantity: "2", price: 20 },
      { name: "Ginger garlic paste", quantity: "2 tbsp", price: 15 },
    ],
    nutrition: { calories: 380, protein: "18g", carbs: "15g", fat: "28g", fiber: "2g" },
  },
  {
    id: "chicken-fried-rice",
    name: "Chicken Fried Rice",
    category: "Lunch",
    cookingTime: "25 min",
    difficulty: "Easy",
    servings: 4,
    emoji: "🍳",
    description: "Indo-Chinese style fried rice with chicken, eggs, and vegetables.",
    ingredients: [
      { name: "Cooked rice", quantity: "600g", price: 30 },
      { name: "Chicken", quantity: "300g", price: 150 },
      { name: "Eggs", quantity: "3", price: 25 },
      { name: "Soy sauce", quantity: "3 tbsp", price: 20 },
      { name: "Spring onion", quantity: "4", price: 15 },
      { name: "Carrot", quantity: "2", price: 15 },
      { name: "Capsicum", quantity: "1", price: 25 },
      { name: "Sesame oil", quantity: "1 tbsp", price: 30 },
    ],
    nutrition: { calories: 350, protein: "26g", carbs: "40g", fat: "9g", fiber: "3g" },
  },
  {
    id: "pasta-alfredo",
    name: "Pasta Alfredo",
    category: "International Meals",
    cookingTime: "20 min",
    difficulty: "Easy",
    servings: 2,
    emoji: "🍝",
    description: "Classic Italian creamy pasta with parmesan cheese and garlic butter.",
    ingredients: [
      { name: "Fettuccine pasta", quantity: "250g", price: 70 },
      { name: "Heavy cream", quantity: "200ml", price: 80 },
      { name: "Parmesan cheese", quantity: "80g", price: 120 },
      { name: "Butter", quantity: "60g", price: 40 },
      { name: "Garlic", quantity: "4 cloves", price: 10 },
      { name: "Black pepper", quantity: "1 tsp", price: 10 },
      { name: "Parsley", quantity: "2 tbsp", price: 10 },
    ],
    nutrition: { calories: 560, protein: "18g", carbs: "62g", fat: "28g", fiber: "3g" },
  },
  {
    id: "veg-sandwich",
    name: "Veg Club Sandwich",
    category: "Snacks",
    cookingTime: "15 min",
    difficulty: "Easy",
    servings: 2,
    emoji: "🥪",
    description: "Multi-layered vegetable sandwich with fresh veggies and green chutney.",
    ingredients: [
      { name: "Bread slices", quantity: "6", price: 30 },
      { name: "Potato", quantity: "2 boiled", price: 20 },
      { name: "Tomato", quantity: "2", price: 15 },
      { name: "Cucumber", quantity: "1", price: 10 },
      { name: "Lettuce", quantity: "4 leaves", price: 15 },
      { name: "Green chutney", quantity: "4 tbsp", price: 20 },
      { name: "Cheese slices", quantity: "4", price: 40 },
      { name: "Butter", quantity: "2 tbsp", price: 20 },
    ],
    nutrition: { calories: 320, protein: "12g", carbs: "48g", fat: "10g", fiber: "5g" },
  },
  {
    id: "idli-sambar",
    name: "Idli Sambar",
    category: "Breakfast",
    cookingTime: "40 min",
    difficulty: "Medium",
    servings: 4,
    emoji: "🫙",
    description: "Fluffy steamed rice cakes served with tangy lentil vegetable sambar.",
    ingredients: [
      { name: "Idli batter", quantity: "500g", price: 50 },
      { name: "Toor dal", quantity: "100g", price: 30 },
      { name: "Vegetables mixed", quantity: "200g", price: 40 },
      { name: "Tamarind", quantity: "small ball", price: 10 },
      { name: "Sambar powder", quantity: "2 tbsp", price: 15 },
      { name: "Tomatoes", quantity: "2", price: 15 },
    ],
    nutrition: { calories: 180, protein: "7g", carbs: "32g", fat: "3g", fiber: "8g" },
  },
  {
    id: "pregnancy-meal",
    name: "Pregnancy Nutrition Meal Pack",
    category: "Healthy Meals",
    cookingTime: "30 min",
    difficulty: "Easy",
    servings: 2,
    emoji: "🤰",
    description: "Nutrient-rich meal with folate, iron, and calcium for expectant mothers.",
    ingredients: [
      { name: "Spinach", quantity: "200g", price: 30 },
      { name: "Lentils (masoor)", quantity: "150g", price: 40 },
      { name: "Milk", quantity: "500ml", price: 30 },
      { name: "Eggs", quantity: "4", price: 30 },
      { name: "Almonds", quantity: "50g", price: 80 },
      { name: "Dates", quantity: "10", price: 40 },
      { name: "Sweet potato", quantity: "2", price: 30 },
      { name: "Pomegranate", quantity: "1", price: 50 },
    ],
    nutrition: { calories: 480, protein: "28g", carbs: "55g", fat: "16g", fiber: "12g" },
  },
  {
    id: "high-protein-gym",
    name: "High Protein Gym Meal",
    category: "High Protein",
    cookingTime: "25 min",
    difficulty: "Easy",
    servings: 2,
    emoji: "💪",
    description: "Muscle-building meal packed with lean protein, complex carbs, and essential nutrients.",
    ingredients: [
      { name: "Chicken breast", quantity: "400g", price: 160 },
      { name: "Brown rice", quantity: "200g", price: 60 },
      { name: "Broccoli", quantity: "300g", price: 50 },
      { name: "Eggs", quantity: "4", price: 30 },
      { name: "Cottage cheese", quantity: "200g", price: 70 },
      { name: "Peanut butter", quantity: "2 tbsp", price: 25 },
      { name: "Sweet potato", quantity: "2", price: 30 },
    ],
    nutrition: { calories: 520, protein: "56g", carbs: "48g", fat: "12g", fiber: "8g" },
  },
  {
    id: "kids-meal",
    name: "Kids Nutrition Meal",
    category: "Kids Meals",
    cookingTime: "20 min",
    difficulty: "Easy",
    servings: 2,
    emoji: "👦",
    description: "Balanced, yummy meal for growing kids with all essential vitamins and minerals.",
    ingredients: [
      { name: "Macaroni", quantity: "200g", price: 40 },
      { name: "Cheese", quantity: "80g", price: 100 },
      { name: "Milk", quantity: "200ml", price: 15 },
      { name: "Carrot", quantity: "2", price: 15 },
      { name: "Peas", quantity: "100g", price: 25 },
      { name: "Corn", quantity: "100g", price: 20 },
      { name: "Butter", quantity: "2 tbsp", price: 20 },
    ],
    nutrition: { calories: 380, protein: "14g", carbs: "52g", fat: "14g", fiber: "5g" },
  },
  {
    id: "avocado-toast",
    name: "Avocado Toast",
    category: "Breakfast",
    cookingTime: "10 min",
    difficulty: "Easy",
    servings: 2,
    emoji: "🥑",
    description: "Trendy and nutritious breakfast with creamy avocado on toasted sourdough.",
    ingredients: [
      { name: "Sourdough bread", quantity: "4 slices", price: 50 },
      { name: "Avocado", quantity: "2 ripe", price: 80 },
      { name: "Eggs", quantity: "2", price: 15 },
      { name: "Lemon", quantity: "1", price: 10 },
      { name: "Red pepper flakes", quantity: "1 tsp", price: 10 },
      { name: "Salt", quantity: "to taste", price: 5 },
    ],
    nutrition: { calories: 290, protein: "11g", carbs: "28g", fat: "17g", fiber: "9g" },
  },
];

export const recipeCategories = [
  "All", "Breakfast", "Lunch", "Dinner", "Snacks", "Healthy Meals",
  "Kids Meals", "Vegetarian", "High Protein", "South Indian", "North Indian", "International Meals"
];
