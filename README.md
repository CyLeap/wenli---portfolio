# Wenli Portfolio

Personal portfolio for Thay Bunleap, focused on cybersecurity, software engineering, cloud infrastructure, and digital safety.

## Project Structure

```text
.
|-- assets/          Source images used by the website
|-- index.html       Page structure and content
|-- style.css        Visual system, layouts, and responsive styles
|-- main.js          Translations and browser interactions
|-- analytics.js     Vercel Web Analytics initialization
|-- writeups/        HTB writeup content and generated standalone pages
|-- scripts/         Static writeup page generator
|-- public/          Search-engine discovery files
|-- vite.config.js   Multi-page production build configuration
`-- package.json     Development and build commands
```

The project is intentionally kept as a small static application. Vite builds the portfolio and every writeup as separate HTML entry points. It does not require a frontend framework or backend service.

## Development

Install dependencies:

```bash
npm install
```

Start the local development server:

```bash
npm run dev
```

Create a production build:

```bash
npm run build
```

Preview the production build:

```bash
npm run preview
```

## Architecture

`index.html` contains the semantic page sections and English fallback content.

`style.css` contains the design tokens, desktop layouts, responsive breakpoints, and motion preferences.

`main.js` contains the English, Japanese, and Chinese translations. It also manages navigation, language persistence, capability tabs, and scroll reveal behavior.

`analytics.js` injects Vercel Web Analytics on the portfolio, writeup index, and every generated writeup page. Tracking activates on the deployed Vercel site and remains inactive during normal local development.

`writeups/machines.mjs` is the structured source for the HTB lab notes. `npm run generate:writeups` produces one complete, standalone HTML document for every machine and refreshes the sitemap and robots file.

`vite.config.js` discovers those generated pages and includes each one in the production build. Source image names are preserved so canonical social preview URLs remain stable after deployment.

The generator enforces Hack The Box publication status. Retired machines receive complete, indexable writeups. Seasonal machines receive reserved `noindex` pages without walkthrough details, and they are excluded from the sitemap.

Detailed Seasonal notes stay in the local, ignored `writeups/machines.private.mjs` file. The tracked `writeups/machines.mjs` source contains complete content only for entries already marked `Retired`, preventing a public repository from exposing active walkthroughs.

Set `SITE_URL` before generation when deploying on a domain other than `https://johnathann.site` so canonical URLs and the sitemap use the correct host.

The `dist` directory is Vite's production build output and is excluded from version control. It can always be recreated with `npm run build`.
