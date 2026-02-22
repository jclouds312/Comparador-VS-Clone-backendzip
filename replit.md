# replit.md

## Overview

This repository contains two related projects for **SOFTGAN**, a company selling agricultural and livestock equipment:

1. **SOFTGAN Android WebView App** (root level) — A Capacitor 8-based Android wrapper that loads a remote web app in a native Android shell. It includes Bluetooth LE support for connecting to SOFTGAN scales/equipment. The server at root level (`server/index.js`) is a simple static file server on port 5000.

2. **ComparadorVS** (`Comparador-VS-Clone-main/`) — A mobile-first product comparison app built with Expo (React Native) and an Express backend. It allows users to compare agricultural/livestock equipment products between two brands — **SOFTGAN** and **Prometálicos** — with side-by-side spec comparisons, a product catalog, dashboard metrics, and saved comparisons. The UI is entirely in Spanish.

There is also a `temp_repo/` directory which appears to be a duplicate/backup of the main projects and can be ignored.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Root-Level Capacitor Android Wrapper

- **Purpose**: Wraps an external web app in a native Android shell using Capacitor 8
- **Configuration**: `capacitor.config.json` points to `https://soft-gan-android-2.base44.app/` as the server URL
- **Bluetooth**: Includes `@capacitor-community/bluetooth-le` for connecting to physical SOFTGAN scales via BLE (see `src/services/scaleService.js`)
- **Static Server**: `server/index.js` is a plain Node.js HTTP server (no Express) that serves files from `dist/` on port 5000 with SPA fallback to `index.html`
- **Entry point**: `npm start` or `npm run dev` runs `node server/index.js`

### ComparadorVS App (`Comparador-VS-Clone-main/`)

#### Frontend (Expo / React Native)

- **Framework**: Expo SDK 54 with expo-router v6 for file-based routing
- **Navigation**: Tab-based layout with 4 tabs (Inicio/Home, Productos, Panel/Dashboard, VS/Compare) plus a modal route for saved comparisons and a standalone `panel-vendedoras` screen
- **State Management**: React Query (`@tanstack/react-query`) for server state; React `useState` for local UI state
- **Styling**: React Native `StyleSheet` with a custom dark theme defined in `constants/colors.ts`
- **Fonts**: Inter font family (400, 500, 600, 700 weights) via `@expo-google-fonts/inter`
- **Local Storage**: `@react-native-async-storage/async-storage` for persisting saved comparisons on-device
- **Animations**: `react-native-reanimated` for entry animations
- **Haptics**: `expo-haptics` for tactile feedback on interactions (skipped on web)
- **Platform Support**: iOS, Android, and Web — with platform-specific handling (e.g., keyboard controller, haptics, blur effects, liquid glass for iOS tabs)
- **Language**: The app UI is entirely in Spanish

#### Key Frontend Files

- `app/(tabs)/index.tsx` — Home/landing screen with featured products, stats, categories, services, testimonials
- `app/(tabs)/productos.tsx` — Full product catalog with category filtering
- `app/(tabs)/vs.tsx` — Side-by-side product comparison tool (SOFTGAN vs Prometálicos)
- `app/(tabs)/panel.tsx` — Dashboard/metrics panel showing product stats and saved comparisons count
- `app/panel-vendedoras.tsx` — Standalone admin/vendor panel screen
- `app/saved.tsx` — Modal screen for viewing/deleting saved comparisons
- `lib/data.ts` — All product data, categories, and comparison logic (currently hardcoded, not fetched from API)
- `lib/storage.ts` — AsyncStorage wrapper for saved comparisons CRUD
- `lib/query-client.ts` — React Query client setup with API URL resolution for Replit environment
- `components/ProductSelector.tsx` — Brand-specific product picker modal
- `components/ComparisonTable.tsx` — Spec-by-spec comparison display with winner highlighting

#### Backend (Express)

- **Framework**: Express 5 with TypeScript (`server/index.ts`)
- **API Routes**: Registered in `server/routes.ts`, prefixed with `/api`
  - `GET /api/products` — Returns all products from hardcoded data
  - `GET /api/categories` — Returns all categories from hardcoded data
- **Storage**: In-memory storage (`MemStorage` class in `server/storage.ts`) implementing an `IStorage` interface with User CRUD methods. Designed to be swappable for a database-backed implementation.
- **CORS**: Dynamic CORS setup supporting Replit dev/deploy domains and localhost for Expo web dev
- **Static Serving**: In production, serves built Expo web bundle from `dist/`; in dev, proxies to Metro bundler
- **Build**: Server is bundled with esbuild for production (`server_dist/`)
- **Dev scripts**: `server:dev` uses tsx, `expo:dev` starts Metro with Replit-aware environment variables

#### Database Schema

- **ORM**: Drizzle ORM configured for PostgreSQL via `drizzle.config.ts`
- **Schema location**: `shared/schema.ts`
- **Current tables**:
  - `users` — id (UUID, auto-generated), username (unique, text), password (text)
- **Validation**: Zod schemas generated from Drizzle schema via `drizzle-zod`
- **Current state**: The database schema is defined but the app uses in-memory storage. Product data is entirely hardcoded in `lib/data.ts`. When PostgreSQL is provisioned, run `npm run db:push` (inside `Comparador-VS-Clone-main/`) to sync the schema.
- **Environment variable**: Requires `DATABASE_URL` for PostgreSQL connection

### Important Notes for Development

- The main application code lives in `Comparador-VS-Clone-main/`. The root-level `package.json` is for the Capacitor wrapper only.
- `temp_repo/` is a duplicate and should not be modified.
- The `Comparador-VS-Clone-front/` directory contains only Android build assets for a separate Capacitor configuration.
- Path aliases are configured: `@/*` maps to the project root, `@shared/*` maps to `./shared/*`
- TypeScript strict mode is enabled

## External Dependencies

### Third-Party Services
- **WhatsApp Integration**: Product quote requests open WhatsApp with a pre-filled message (`wa.me` links)
- **Remote Web Apps**: The Capacitor wrapper loads from `https://soft-gan-android-2.base44.app/` (base44.app platform)
- **Unsplash Images**: Product images currently use Unsplash placeholder URLs

### Database
- **PostgreSQL**: Configured via Drizzle ORM but not yet actively used. Requires `DATABASE_URL` environment variable. Schema is minimal (users table only).

### Key NPM Packages
- **Frontend**: expo, expo-router, react-native, @tanstack/react-query, react-native-reanimated, expo-haptics, expo-image, @react-native-async-storage/async-storage
- **Backend**: express v5, http-proxy-middleware, pg (PostgreSQL client), drizzle-orm, drizzle-zod, zod
- **Build Tools**: esbuild (server bundling), tsx (TypeScript execution), drizzle-kit (DB migrations)
- **Mobile Native**: @capacitor/core, @capacitor/android, @capacitor-community/bluetooth-le