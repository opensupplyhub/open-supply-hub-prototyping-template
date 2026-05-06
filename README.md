# Open Supply Hub — Prototyping Template

A front-end prototyping template for [Open Supply Hub](https://opensupplyhub.org), the open platform that maps global supply chains. OS Hub makes supply chain data open, accessible, and trusted — tracking 2.5M+ production locations across 225 countries.

## How to Use This Template

Each prototype should live in its own fork of this repo.

1. **Fork** — click "Fork" on GitHub to create a copy under your account or the org. Give it a descriptive name for your prototype.
2. **Clone your fork**
   ```bash
   git clone git@github.com:<your-username>/<your-fork-name>.git
   cd <your-fork-name>
   ```
3. **Install dependencies** and start developing (see [Getting Started](#getting-started) below).

### Tips

- Keep the template's `main` branch clean in your fork so you can pull in future template updates.
- Work on a branch and merge to `main` when you want to deploy.

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

GitHub Actions are already configured — your fork will automatically build and deploy to GitHub Pages on every push to `main`. To enable it, go to your fork's **Settings > Pages > Source** and select **GitHub Actions**. Once enabled, your prototype will be published to `https://<owner>.github.io/<repo-name>/`.

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

| File                                      | Description                                       |
| ----------------------------------------- | ------------------------------------------------- |
| `mission-statement.md`                    | OS Hub mission and values                         |
| `api-docs.md`                             | API endpoints (legacy + v1)                       |
| `data-model.md`                           | Full database schema (entities and relationships) |
| `data-schema-rfc-production-locations.md` | v1 production location object schema              |
| `data-schema-rfc-partner-fields.md`       | Partner fields JSON Schema validation             |
| `how-to-contribute-data.md`               | Data upload format and requirements               |

**Core domain concepts:** production locations (facilities/factories identified by OS ID), contributors (organizations that submit data), facility lists (uploaded CSV/Excel files), and facility matching (deduplication algorithm).
