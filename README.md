# stolmal-format-fe

Frontend for Stolmal Format, a joinery workshop selling handcrafted solid-wood furniture. It presents the workshop's process, product gallery and contact details as a single-page marketing site with route-based deep links.

## Stack

- React 18, TypeScript 4.9 (strict)
- React Router v6
- i18next + react-i18next (PL/EN)
- Docker + Nginx (prod)
- ESLint + Prettier

## Design Patterns

- **Persistent-shell layout**: `MainLayout` always renders `Navbar`, `Header`, `GallerySection`, `ProcessSection`, `ContactSection` and `Footer`; only the routed `Outlet` content differs per page. Navigating to `/gallery`, `/process` or `/contact` smooth-scrolls to the matching section (see `SECTION_ID_BY_PATH` in `MainLayout.tsx`) instead of mounting a separate page.
- **Global, config-driven components**: cross-cutting UI (`Navbar`/`Footer` links, `LanguageSwitcher`, `OrderCtaButton`, `Carousel`) is built once under `shared/components` and driven by data in `shared/config` (e.g. `navigation.ts`, `productCategories.ts`) — adding a nav item or product category means editing config, not duplicating markup.
- **Design tokens**: all colors, spacing, radii, shadows and motion are CSS custom properties in `shared/styles/tokens.css`. Components must consume `var(--token)` and never hard-code values.
- **Feature folders**: routed pages live under `src/features/<name>` with an `index.ts` barrel export; shared, reusable pieces live under `src/shared`.

## Getting Started

```bash
cp example.env .env
make up          # local dev (Docker, hot reload on :3000)
make up-prod     # production stack (Nginx + TLS certs in ./certs)
make build       # build the Docker image
make format      # eslint --fix + prettier
```

## Environment Variables

Copy `example.env` to `.env` before running either stack:

- `SERVER_NAME` — production domain used by Nginx/TLS (`nginx.conf`).
- `HOST` / `PORT` — dev server bind address.
- `WDS_SOCKET_HOST` — webpack-dev-server hot-reload socket host (keep `127.0.0.1` unless proxying).

## Storage / Product Images

Product photos are **not** stored in this repo. They live in the sibling `../storage/<category>` folder (`beds`, `chairs`, `tables`, `furniture-care-product`), mounted read-only into the container at `public/assets/products`. On every dev-server start (and on `npm run prebuild`) `scripts/generate-product-manifest.js` scans those folders and writes `public/assets/product-manifest.json`; a file watcher also regenerates it whenever a photo is added or removed, so the `Carousel`/`GallerySection` picks up changes without a rebuild — just drop or delete an image in `storage/<category>`.

