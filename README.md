# DARKCONE

Gold-on-black, LATAM-first site scaffold. Next.js (App Router) + Tailwind + Framer Motion + **Three.js depth** coin field on desktop.

**Date:** 2025-08-08

## Quickstart
```bash
npm install
npm run dev
```
Visit http://localhost:3000

## Stack
- Next.js 13 App Router
- Tailwind (gold-only brand)
- Framer Motion (reveals)
- **Three.js + @react-three/fiber + drei** (coin galaxy on desktop)
- Canvas fallback (mobile)

## Structure
```
app/
  components/
    Hero.tsx
    CoinField3D.tsx     # desktop depth
    ShootingStars.tsx   # mobile fallback
    Modules.tsx
    LiveFeed.tsx
    CaseGrid.tsx
    ContactFunnel.tsx
    Footer.tsx
  api/apikey/route.ts
src/core/
  signalProcessor.ts
  memoryParser.ts
  moodRouter.ts
  intentMapper.ts
i18n/
public/
  index.html            # static preview
  darkcone-logo.svg
```

## Commands
- `dev` – local dev
- `build` – production build
- `start` – run production server

## Deploy
- Vercel recommended (zero-config). Add your env vars later if needed.

## Collaboration
- Fork → feature branch → PR
- Follow gold-only brand rules (no other hues)
- Update docs when adding components
