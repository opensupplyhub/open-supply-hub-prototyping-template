# Open Supply Hub — Prototyping Template

A front-end prototyping template for [Open Supply Hub](https://opensupplyhub.org), the open platform that maps global supply chains. OS Hub makes supply chain data open, accessible, and trusted — tracking 2.5M+ production locations across 225 countries.

## Tech Stack

- **React 19** with **React Router 7** (SPA mode, no SSR)
- **TypeScript**
- **MUI v9** + **Tailwind CSS v4** for styling
- **Vite 8** for bundling and dev server

## Prerequisites

You need [Node.js](https://nodejs.org/) installed (v20 or later recommended). Install it via:

- **Official installer:** https://nodejs.org/en/download
- **nvm (Node Version Manager):** https://github.com/nvm-sh/nvm
- **fnm (Fast Node Manager):** https://github.com/Schniz/fnm
- **Homebrew (macOS):** `brew install node`

## Getting Started

### Installation

```bash
npm install
```

### Development

Start the development server with HMR:

```bash
npm run dev
```

Your application will be available at `http://localhost:5173`.

### Type Checking

```bash
npm run typecheck
```

### Production Build

```bash
npm run build
```

## Deployment

The app deploys automatically to **GitHub Pages** on push to `main` via the workflow in `.github/workflows/deploy.yml`. The client build output is served as a static site.

## Project Structure

```
app/
├── root.tsx          # Root layout
├── routes.ts         # Route definitions
├── routes/home.tsx   # Home page
└── theme.ts          # MUI theme configuration
resources/            # Domain reference material
public/               # Static assets (favicons, etc.)
```

## Domain Context

The `resources/` directory contains detailed reference material for building OS Hub prototypes:

| File | Description |
|------|-------------|
| `mission-statement.md` | OS Hub mission and values |
| `api-docs.md` | API endpoints (legacy + v1) |
| `data-model.md` | Full database schema (entities and relationships) |
| `data-schema-rfc-production-locations.md` | v1 production location object schema |
| `data-schema-rfc-partner-fields.md` | Partner fields JSON Schema validation |
| `how-to-contribute-data.md` | Data upload format and requirements |

**Core domain concepts:** production locations (facilities/factories identified by OS ID), contributors (organizations that submit data), facility lists (uploaded CSV/Excel files), and facility matching (deduplication algorithm).
