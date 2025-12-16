# OrderFlow Front-End

OrderFlow is a Next.js dashboard for managing orders, inventory and basic analytics.
This repository contains the **front-end** application.

## Tech Stack

- **Next.js** (App Router)
- **React**
- **TypeScript**
- **Tailwind CSS**
- **shadcn/ui (Radix UI)**
- **Recharts** (charts)

## Features

- **Authentication** (login/register) + token refresh
- **Dashboard** KPIs and live orders feed
- **Orders** list + status actions
- **Notifications** (toast + notification center)
- **Inventory catalog** (products list + create product)
- **Analytics** pages (charts/tables)

## Getting Started

### 1) Install dependencies

```bash
npm install
```

### 2) Configure environment variables

Create a `.env` file (or use your existing one) and set:

```bash
NEXT_PUBLIC_API_URL=https://your-api-host
```

Notes:

- `NEXT_PUBLIC_API_URL` must point to the backend base URL.
- The app uses `localStorage` tokens (`accessToken`, `refreshToken`) and sends `Authorization: Bearer <token>`.

### 3) Run the dev server

```bash
npm run dev
```

Then open:

- http://localhost:3000

## NPM Scripts

- **dev**: `next dev`
- **build**: `next build`
- **start**: `next start`
- **lint**: `eslint`

## Project Structure

High-level overview of the main folders:

```
app/
  layout.tsx              # Root layout (AuthProvider + Toaster)
  page.tsx                # Landing page
  login/                  # Login route
  register/               # Register route
  context/                # Auth context
  Dashboard/              # Dashboard module (domain + services + hooks + views)
  api/                    # Next.js route handlers (mock/dev helpers) + shared API types

components/
  ui/                     # shadcn/ui components (Toast, Dialog, etc.)
  *.tsx                   # Feature components (KPIs, orders table, charts...)

lib/
  authFetch.ts            # Auth-aware fetch + token refresh
  utils.ts                # Small shared utilities

data/
  dataOrder.ts            # Mock orders used by some local API routes
```

### Dashboard module (`app/Dashboard`)

```
app/Dashboard/
  views/                  # Route pages (inventory, orders, analytics, settings)
  services/               # HTTP calls to backend (products, orders...)
  hooks/                  # React hooks (live orders polling, notifications, etc.)
  adapters/               # Data mappers (API -> UI models)
  interfaces/             # Shared TypeScript interfaces
  layout/                 # Dashboard layout (sidebar/topbar)
  domain/                 # Pure domain logic (metrics calculations)
```

## Troubleshooting

### "Not authenticated" / 401

- Ensure you logged in and `accessToken` exists in `localStorage`.
- Check `NEXT_PUBLIC_API_URL` points to the correct backend.

### Notifications do not appear

- The app uses the shadcn/ui toaster.
- Verify `Toaster` is mounted in `app/layout.tsx`.

### Orders/KPIs show 0

- Some KPIs are computed from the live orders feed.
- Verify your backend endpoints return orders for the selected `storeId`.

## License

Private project.