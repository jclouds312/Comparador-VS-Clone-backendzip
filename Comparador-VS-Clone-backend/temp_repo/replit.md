# replit.md

## Overview

This repository contains two related projects:

1. **SOFTGAN Android WebView App** (root level) — A Capacitor-based Android wrapper that loads a remote web URL (`https://android-softgan.base44.app/PanelVendedoras`) in a native Android shell. It's essentially a thin native container pointing to an external hosted app.

2. **ComparadorVS** (`Comparador-VS-Clone-main/`) — A mobile-first product comparison app built with Expo (React Native). It allows users to compare agricultural/livestock equipment products between two brands — **SOFTGAN** and **Prometálicos**. The app features a product catalog, side-by-side spec comparison tool, a dashboard/metrics panel, and saved comparisons. It has an Express backend server and a PostgreSQL database schema configured via Drizzle ORM.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Capacitor Android Wrapper (Root Level)

- **Purpose**: Wraps an external web app in a native Android shell using Capacitor 8
- **Configuration**: `capacitor.config.json` points to `https://android-softgan.base44.app/PanelVendedoras` as the server URL
- **Web Directory**: `dist/` — contains a minimal HTML page that redirects to the remote URL
- **No local app logic**: The Android app is purely a WebView wrapper; all functionality lives on the remote server

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
- `components/ComparisonTable.tsx` — Spec-by-spec comparison display with winner highlighting and trophy icons

#### Backend (Express)

- **Framework**: Express 5 with a simple HTTP server
- **Location**: `server/` directory
- **Routes**: Registered in `server/routes.ts` — serves `/api/products` and `/api/categories` endpoints returning hardcoded data from `lib/data.ts`
- **Storage**: In-memory storage (`MemStorage` class in `server/storage.ts`) with a User model implementing `IStorage` interface; designed to be swappable for database-backed implementation
- **CORS**: Dynamic CORS setup supporting Replit dev/deploy domains, localhost for Expo web dev, and `.replit.dev` wildcard
- **Static Serving**: In production, serves built Expo web bundle from `dist/`; in dev, proxies to Metro bundler
- **Build**: Server is bundled with esbuild for production (`server_dist/`)
- **Landing Page**: Has an HTML template (`server/templates/landing-page.html`) for pre-build states

#### Database

- **ORM**: Drizzle ORM configured for PostgreSQL
- **Schema**: Defined in `shared/schema.ts` — currently only has a `users` table with `id` (UUID, auto-generated), `username` (unique text), and `password` (text)
- **Validation**: Uses `drizzle-zod` for insert schema validation
- **Config**: `drizzle.config.ts` reads `DATABASE_URL` environment variable
- **Current State**: Database is configured but not actively used by the app. Product data is entirely hardcoded. The storage layer uses in-memory storage, not the database.
- **Migration Directory**: `./migrations`

#### Build & Development

- **Dev workflow**: Two processes run concurrently — `expo:dev` for the React Native frontend and `server:dev` for the Express backend
- **Production build**: Expo web is built statically (`expo:static:build`), server is bundled with esbuild (`server:build`), then served with `server:prod`
- **Database push**: `drizzle-kit push` via `db:push` script
- **Patches**: Uses `patch-package` via `postinstall` script

## External Dependencies

### Third-Party Services & APIs

- **WhatsApp Integration**: Product "Cotizar" (Quote) buttons generate WhatsApp links to `wa.me/573001234567` with pre-filled product messages
- **Base44 Hosting**: The Capacitor Android wrapper points to `https://android-softgan.base44.app/PanelVendedoras` — this appears to be the production hosted version of the vendor panel
- **Unsplash Images**: Product images use Unsplash placeholder URLs (e.g., `images.unsplash.com`)

### Database

- **PostgreSQL**: Required by Drizzle ORM configuration. Needs `DATABASE_URL` environment variable. Not yet actively used for product data but schema is ready for user authentication.

### Key NPM Packages

- **Expo SDK 54** — Core mobile framework
- **expo-router v6** — File-based routing with typed routes
- **Express 5** — Backend HTTP server
- **Drizzle ORM + drizzle-zod** — Database ORM and validation
- **@tanstack/react-query** — Server state management
- **react-native-reanimated** — Animations
- **react-native-gesture-handler** — Touch gesture handling
- **Capacitor 8** — Native Android wrapper (root project)
- **pg** — PostgreSQL client for Node.js
- **http-proxy-middleware** — Dev server proxying to Metro bundler

### Environment Variables

- `DATABASE_URL` — PostgreSQL connection string (required for Drizzle)
- `EXPO_PUBLIC_DOMAIN` — Public domain for API URL resolution
- `REPLIT_DEV_DOMAIN` — Replit development domain (used for CORS and Expo config)
- `REPLIT_DOMAINS` — Comma-separated list of Replit domains (used for CORS)
- `REPLIT_INTERNAL_APP_DOMAIN` — Replit deployment domain (used in build scripts)