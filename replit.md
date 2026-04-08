# Workspace

## Overview

pnpm workspace monorepo using TypeScript. Each package manages its own dependencies.

## Stack

- **Monorepo tool**: pnpm workspaces
- **Node.js version**: 24
- **Package manager**: pnpm
- **TypeScript version**: 5.9
- **API framework**: Express 5
- **Database**: PostgreSQL + Drizzle ORM
- **Validation**: Zod (`zod/v4`), `drizzle-zod`
- **API codegen**: Orval (from OpenAPI spec)
- **Build**: esbuild (CJS bundle)

## Key Commands

- `pnpm run typecheck` — full typecheck across all packages
- `pnpm run build` — typecheck + build all packages
- `pnpm --filter @workspace/api-spec run codegen` — regenerate API hooks and Zod schemas from OpenAPI spec
- `pnpm --filter @workspace/db run push` — push DB schema changes (dev only)
- `pnpm --filter @workspace/api-server run dev` — run API server locally

See the `pnpm-workspace` skill for workspace structure, TypeScript setup, and package details.

## Artifacts

### FreshMart — Grocery Shopping App (`artifacts/grocery-app`)
- **Type**: React + Vite (frontend-only, no backend)
- **Preview Path**: `/`
- **Styling**: Bootstrap 5 (via CDN) + custom CSS animations
- **Theme**: Premium dark purple-red gradient (deep purple, violet, magenta, dark red)

#### Features
1. **Recipe-to-Cart**: 12 curated recipes (Butter Chicken, Biryani, Dosa, Paneer Masala, etc.) with ingredient auto-add to cart, servings selector (1/2/4/6 people), nutritional summary, cooking time/difficulty
2. **Health Goals**: 16 health categories (Iron/Blood, Vitamin D, Pregnancy, Diabetes, PCOS, Heart Health, etc.) with curated grocery lists and one-click cart add
3. **Feature Cards**: 6 specialty sections (Recipe-to-Cart, Health Shopping, Special Meals, Weekly Essentials, Family Packs, Seasonal Bundles) with modals
4. **Featured Products**: 12 featured products with discount badges, ratings, and add-to-cart
5. **Cart Drawer**: Slide-in right drawer with live item count, qty adjustments, free delivery bar, 5% discount over ₹1000, checkout button
6. **Animations**: Floating food icons, gradient orbs, scroll-triggered fade-ins, hover lift effects, glassmorphism cards, pulse animations
7. **Navbar**: Sticky blur navbar with search, dark mode toggle, animated cart badge
8. **Footer**: Quick links, social icons, newsletter subscription, app download buttons

#### Data Files
- `src/data/recipes.ts` — 12 recipes with ingredients, nutrition, categories
- `src/data/health.ts` — 16 health categories with items, benefits, meal suggestions
- `src/data/products.ts` — 12 featured products + 6 feature cards
- `src/context/CartContext.tsx` — React Context cart state management
