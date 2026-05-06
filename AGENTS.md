# Open Supply Hub — Prototyping Template

## What is this

A prototyping repo for [Open Supply Hub](https://opensupplyhub.org), the open platform that maps global supply chains. OS Hub makes supply chain data open, accessible, and trusted — tracking 2.5M+ production locations across 225 countries.

## Tech stack

- React 19, React Router 7, TypeScript
- MUI v9, Tailwind CSS v4
- Vite 8

## Commands

- `npm run dev` — start dev server
- `npm run build` — production build
- `npm run typecheck` — type-check

## Domain context

Read `resources/` for detailed reference material:

- `mission-statement.md` — OS Hub mission and values
- `api-docs.md` — API endpoints (legacy + v1)
- `data-model.md` — full database schema (entities and relationships)
- `data-schema-rfc-production-locations.md` — v1 production location object schema
- `data-schema-rfc-partner-fields.md` — partner fields JSON Schema validation
- `how-to-contribute-data.md` — data upload format and requirements

Core domain concepts: **production locations** (facilities/factories identified by OS ID), **contributors** (organizations that submit data), **facility lists** (uploaded CSV/Excel files), and **facility matching** (deduplication algorithm).

## The Platform

If you need a deeper context about the platform, please refer to the [OS Hub Github Repository](https://github.com/opensupplyhub/open-supply-hub).
