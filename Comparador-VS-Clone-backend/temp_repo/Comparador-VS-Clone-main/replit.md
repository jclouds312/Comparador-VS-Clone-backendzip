# replit.md

## Overview

ComparadorVS is a mobile-first product comparison app built with Expo (React Native). It allows users to compare agricultural/livestock equipment products between two brands — **SOFTGAN** and **Prometálicos** — across categories like scales, gates, milking equipment, and more. Users can view product catalogs, run side-by-side spec comparisons (VS mode), see a dashboard panel with metrics, and save comparisons locally for later review.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend (Expo / React Native)

- **Framework**: Expo SDK 54 with expo-router v6 for file-based routing
- **Navigation**: Tab-based layout with 4 tabs (Inicio/Home, Productos, Panel/Dashboard, VS/Compare) plus a modal route for saved comparisons
- **State Management**: React Query (`@tanstack/react-query`) for server state; React `useState` for local UI state
- **Styling**: React Native `StyleSheet` with a custom dark theme defined in `constants/colors.ts`
- **Fonts**: Inter font family (400, 500, 600, 700 weights) via `@expo-google-fonts/inter`
- **Local Storage**: `@react-native-async-storage/async-storage` for persisting saved comparisons on-device
- **Animations**: `react-native-reanimated` for entry animations
- **Haptics**: `expo-haptics` for tactile feedback on interactions (skipped on web)
- **Platform Support**: iOS, Android, and Web — with platform-specific handling (e.g., keyboard controller, haptics, blur effects)

### Key Frontend Files

- `app/(tabs)/index.tsx` — Home/landing screen with featured products, stats, categories
- `app/(tabs)/productos.tsx` — Full product catalog with category filtering
- `app/(tabs)/vs.tsx` — Side-by-side product comparison tool
- `app/(tabs)/panel.tsx` — Dashboard/metrics panel
- `app/saved.tsx` — Modal screen for viewing saved comparisons
- `lib/data.ts` — All product data, categories, and comparison logic (currently hardcoded, not from API)
- `lib/storage.ts` — AsyncStorage wrapper for saved comparisons CRUD
- `components/ProductSelector.tsx` — Brand-specific product picker modal
- `components/ComparisonTable.tsx` — Spec-by-spec comparison display with winner highlighting

### Backend (Express)

- **Framework**: Express 5 with a simple HTTP server
- **Location**: `server/` directory
- **Routes**: Registered in `server/routes.ts` — currently minimal, prefixed with `/api`
- **Storage**: In-memory storage (`MemStorage` class in `server/storage.ts`) with a User model; can be swapped for database-backed implementation
- **CORS**: Dynamic CORS setup supporting Replit dev/deploy domains and localhost for Expo web dev
- **Static Serving**: In production, serves built Expo web bundle; in dev, proxies to Metro bundler
- **Build**: Server is bundled with esbuild for production (`server_dist/`)

### Data Layer

- **Current State**: Product data is entirely hardcoded in `lib/data.ts`. The app does not currently fetch products from the API.
- **Database Schema**: Drizzle ORM with PostgreSQL is configured but only has a `users` table (id, username, password). The schema is in `shared/schema.ts`.
- **Drizzle Config**: `drizzle.config.ts` points to PostgreSQL via `DATABASE_URL` env var, with migrations output to `./migrations`
- **Validation**: Zod schemas generated from Drizzle schema via `drizzle-zod`

### Build & Deployment

- **Dev Mode**: Two processes — `expo:dev` (Metro bundler) and `server:dev` (Express via tsx)
- **Production Build**: `expo:static:build` creates a static web bundle, `server:build` bundles the Express server with esbuild, `server:prod` runs the production server
- **DB Migrations**: `db:push` uses drizzle-kit to push schema to PostgreSQL
- **Build Script**: `scripts/build.js` handles Metro static build with Replit domain detection

### Path Aliases

- `@/*` maps to project root
- `@shared/*` maps to `./shared/*`

## External Dependencies

### Core Services
- **PostgreSQL** — Database (configured via `DATABASE_URL` env var, used with Drizzle ORM). Currently only has a users table; product data is hardcoded.
- **WhatsApp API** — Product inquiry links open WhatsApp with pre-filled messages (`wa.me` URLs)

### Key NPM Packages
- **expo** (~54.0.27) — Mobile/web app framework
- **expo-router** (~6.0.17) — File-based routing with typed routes
- **express** (^5.0.1) — Backend API server
- **drizzle-orm** (^0.39.3) + **drizzle-kit** — Database ORM and migration tool
- **@tanstack/react-query** (^5.83.0) — Async state management
- **pg** (^8.16.3) — PostgreSQL client
- **@react-native-async-storage/async-storage** (2.2.0) — Local persistence
- **react-native-reanimated** (~4.1.1) — Animations
- **expo-haptics** (~15.0.8) — Haptic feedback
- **expo-image** (~3.0.11) — Optimized image loading
- **zod** — Schema validation (via drizzle-zod)

### Environment Variables
- `DATABASE_URL` — PostgreSQL connection string
- `REPLIT_DEV_DOMAIN` — Replit development domain (used for CORS and Expo config)
- `EXPO_PUBLIC_DOMAIN` — Public domain for API calls from the frontend
- `REPLIT_DOMAINS` — Comma-separated list of allowed origins
- `REPLIT_INTERNAL_APP_DOMAIN` — Deployment domain for static builds