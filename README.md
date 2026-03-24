# Site da Luci

> Web application with tools for TIBIA players — runs entirely in the browser.

[![Tests](https://img.shields.io/badge/Tests-165%2F170%20Passing-brightgreen)](https://github.com)
[![i18n](https://img.shields.io/badge/i18n-PT--BR%20%2B%20EN-success)](https://github.com)
[![License](https://img.shields.io/badge/License-MIT-blue)](#)
[![Live](https://img.shields.io/badge/Live-GitHub%20Pages-blue)](https://marinalarissa.github.io/site-da-luci)

## Live Application

**[https://marinalarissa.github.io/site-da-luci](https://marinalarissa.github.io/site-da-luci)**

No backend required — all calculations run locally in the browser.

## Features

- **Loot Split Calculator** — Fair distribution algorithm (greedy two-pointer). Parses native TIBIA client loot data and generates transfer commands.
- **Solo Hunt Analyzer** — Individual hunt session analysis with custom item cost tracking (GP/GT/ST), TC metrics, and hunt history.
- **Bestiary Planner** — Track charm progress across 652 creatures with OCR import.
- **Wheel of Destiny Planner** — Build planner with side-by-side comparison.
- **Character Set Builder** — Paper doll equipment builder with drag & drop.
- **i18n** — Portuguese (pt-BR) and English.

## Architecture

Pure React SPA deployed on GitHub Pages (HashRouter). All business logic runs in the browser:

| Module | Calculation |
|--------|-------------|
| Loot Split | `services/lootSplitService.js` — parse + greedy two-pointer algorithm |
| Solo Hunt | `services/soloHuntService.js` — proportional item cost calculation |
| OCR | `services/ocrService.js` — calls OCR.space API directly from browser |
| Auth | Supabase client (Google OAuth) |
| Storage | localStorage (progress, history, builds, sets) |

## Project Structure

```
site-da-luci/
├── frontend/                   # React SPA (Create React App)
│   ├── src/
│   │   ├── components/         # UI components (per feature)
│   │   ├── hooks/              # Custom React hooks
│   │   ├── services/           # Business logic + external APIs
│   │   ├── data/               # Static data (bestiary, equipment, wheel)
│   │   └── locales/            # i18n translations (pt-BR, en)
│   └── package.json
├── backend/                    # Express API (kept for reference, not deployed)
├── docs/
└── README.md
```

## Getting Started

### Prerequisites

- Node.js 20+
- npm

### Frontend Development

```bash
cd frontend
npm install
npm start          # dev server on http://localhost:3000
npm test           # run tests
npm run build      # production build
npm run deploy     # deploy to GitHub Pages
```

### Environment Variables

Copy `frontend/.env.example` to `frontend/.env.local` and fill in:

```bash
REACT_APP_OCR_SPACE_API_KEY=   # OCR.space free tier key (25k requests/month)
REACT_APP_AUTH_REDIRECT_URL=   # OAuth callback URL
REACT_APP_SUPABASE_URL=        # Supabase project URL
REACT_APP_SUPABASE_ANON_KEY=   # Supabase anon key
```

> Note: `REACT_APP_` variables are bundled into the JS build and visible to users. The OCR key is protected client-side only via monthly rate limiting in localStorage.

### Pre-Commit Hooks (Husky)

Runs automatically on `git commit`:
1. Translation key validation (ensures all i18n keys exist in both pt-BR and en)
2. ESLint auto-fix on staged files

## Loot Split Algorithm

Uses a **greedy two-pointer algorithm** to minimize the number of transfers:

1. Parse raw TIBIA loot text → extract players and session metadata
2. Filter active players (damage > 0 OR healing > 0)
3. Calculate fair share = total balance / active players
4. Classify creditors (have excess) vs debtors (need money)
5. Match largest creditor with largest debtor iteratively → generate transfers

**Example** (3 players, 11.89kk total balance):

```
Lofi Shades:   11.94kk  → creditor (+7.98kk excess)
Luciana Burks:  -104k   → debtor (needs 4.07kk)
Young Vex:       +49k   → debtor (needs 3.91kk)

Output (2 transfers only):
transfer 4066247 to Luciana Burks
transfer 3912667 to Young Vex
```

## Tech Stack

- **Framework**: React 19.2.3
- **Routing**: React Router v6 (HashRouter)
- **Styling**: styled-components
- **Auth**: Supabase (Google OAuth)
- **i18n**: i18next
- **Testing**: Jest + React Testing Library + Cypress
- **Build**: Create React App
- **Hosting**: GitHub Pages

## License

MIT — See [LICENSE](LICENSE) file for details.

## Author

**Marina Larissa Carpes Röhrig** — Personal Development Plan (PDI) project.

## Acknowledgments

- TIBIA game by CipSoft
- TIBIA game sprites from [TibiaWiki Brasil](https://www.tibiawiki.com.br/wiki/)
