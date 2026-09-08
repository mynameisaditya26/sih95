# DoSJE Smart Monitoring, Surprise Inspection & Compliance Management System

Frontend-only prototype (React + Vite + Tailwind CSS + React Router + Recharts + Lucide Icons).

> ⚠️ This is a **frontend prototype only**. There is **no backend**, no database, no real
> AI, no real CCTV/video-call integration and no real authentication. All data is local
> mock data defined in `src/data/mockData.js` and all "live" behaviour (login, random
> assignment, AI anomalies, video calls, CCTV feeds, offline sync, etc.) is simulated in
> the browser using React state / localStorage so the UI feels functional in a demo.

## Getting started

```bash
npm install
npm run dev
```

Then open the printed local URL (default `http://localhost:5173`).

To build a production bundle:

```bash
npm run build
npm run preview
```

## Project structure

```
src/
  components/   Reusable UI building blocks (cards, tables, modals, drawers, toasts...)
  layouts/      App shell (sidebar + top nav) used by all authenticated pages
  pages/        One file per route (28 pages total, see below)
  data/         mockData.js — all demo/mock data lives here, kept separate from UI
  services/     mockService.js — getProjects(), getInspections(), etc. Swap the internals
                for real API calls later without touching page components.
  hooks/        Small reusable hooks (toast, localStorage, mobile detection)
  routes/       Central route table
  utils/        Formatting / risk-color / helper functions
```

## Connecting a real backend later

All data access goes through `src/services/mockService.js`. Every function currently
resolves mock data from `src/data/mockData.js`. Replace the body of each function with a
real `fetch`/API call (keeping the same function signature and return shape) and the UI
will keep working without further changes.

## Pages

Landing, Login, Admin Dashboard, Project Management, Project Details, Live Map
Monitoring, CCTV Monitoring, Surprise Video Call, Inspection Management, Random
Inspection Assignment, Inspector Dashboard, Inspection Details, Inspection Checklist,
Evidence Capture, Offline Inspection Mode, Inspection History, Attendance Analytics, AI
Anomaly Center, Risk Management, Compliance Dashboard, Digital Reports, Notifications,
NGO/Institute Dashboard, State/District Dashboard, User Management, Audit Logs,
Settings, Help & Support.

## Notes

- All "DEMO" banners (Demo Map, Simulated CCTV Feed, Demo Video Call, AI-generated demo
  results, etc.) are intentional and required by the brief — keep them if you wire up
  real integrations gradually, and remove per-feature once that feature goes live.
- Role-based navigation is simulated: the role chosen at login changes which sidebar
  items and dashboard the user lands on.
