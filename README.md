# Wenli Portfolio

Personal portfolio for Thay Bunleap, focused on cybersecurity, software engineering, cloud infrastructure, and digital safety.

## Project Structure

```text
.
|-- assets/          Source images used by the website
|-- index.html       Page structure and content
|-- style.css        Visual system, layouts, and responsive styles
|-- main.js          Translations and browser interactions
`-- package.json     Development and build commands
```

The project is intentionally kept as a small static application. It uses Vite's default configuration and does not require a frontend framework or backend service.

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

The `dist` directory is Vite's production build output and is excluded from version control. It can always be recreated with `npm run build`.
