# CRIVEA Website

React + TypeScript foundation for CRIVEA company website.

## Tech stack

- React 19
- TypeScript
- Vite
- CSS
- Git / GitHub

## Project structure

```text
src/
├── components/
│   ├── Navbar.tsx
│   ├── PlaceholderCard.tsx
│   └── SectionLabel.tsx
├── sections/
│   ├── About.tsx
│   ├── Contact.tsx
│   ├── Hero.tsx
│   ├── Talent.tsx
│   └── Work.tsx
├── App.tsx
├── main.tsx
├── style.css
└── vite-env.d.ts
```

Current UI is intentionally a neutral canvas. Team can add final design, content, data, animation, and API integration.

## Run locally

```bash
npm install
npm run dev
```

Build production files:

```bash
npm run build
```

Preview production build:

```bash
npm run preview
```

## Git workflow

```bash
git checkout main
git pull origin main
git checkout -b feature/feature-name
```

Commit changes:

```bash
git add .
git commit -m "feat: describe change"
```

Push only after review:

```bash
git push -u origin feature/feature-name
```
