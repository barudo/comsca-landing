# COMSCA landing page

A responsive Next.js App Router landing page with a white and blue palette.

## Run locally

```sh
npm install
npm run dev
```

Open http://localhost:3000. Run `npm run build` for a production build and `npm run typecheck` to check TypeScript.

## API configuration

Copy `.env.example` to `.env` before running locally. Set `NEXT_PUBLIC_API_URL` in your production hosting environment before building, then rebuild and redeploy when it changes. This public setting is included in the browser bundle.

The registration form sends requests directly to `${NEXT_PUBLIC_API_URL}/user/register` and `${NEXT_PUBLIC_API_URL}/user/verify`, with JSON bodies and the `x-group-slug: www` header.

The API must allow the frontend origin (including `https://www.comsca.com` in production), the POST method, and the `Content-Type` and `x-group-slug` headers in its CORS configuration, and respond to OPTIONS preflight requests.

The illustration is an inline SVG. Google Fonts supplies DM Sans and Manrope; local sans-serif fallbacks are provided.
