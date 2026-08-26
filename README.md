# kriyagni

this repo contains the marketing website for kriyagni ai and mandana. it is a react + vite frontend with animated sections, content-driven copy, and reusable ui components.

## quick start

```bash
npm install
npm run dev
```

## project at a glance

- single-page react app rendered from `src/App.jsx`
- section content is centralized in `src/data/content.js`
- ui is composed from modular components in `src/components`
- build output is generated with vite

## tools and packages

- core: react, react-dom, vite
- styling: tailwindcss, postcss, autoprefixer
- motion/interaction: framer-motion, gsap, lenis
- graphics: three
- quality: oxlint, react doctor

## scripts

- `npm run dev` - start local dev server
- `npm run build` - create production build
- `npm run preview` - preview production build
- `npm run lint` - run oxlint
- `npm run doctor` - run react doctor checks

## simple architecture

```mermaid
flowchart td
  a[browser] --> b[main.jsx]
  b --> c[app.jsx]
  c --> d[ui sections]
  d --> e[content.js data]
  c --> f[animations and smooth scroll]
  f --> g[framer motion + lenis + gsap]
  c --> h[build and bundle]
  h --> i[vite output]
```
