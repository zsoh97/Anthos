# Anthos — A Botanical Miscellany

An illustrated, stateless web compendium of flowers, their Latin names, recognizable traits, and Victorian sentiments—inspired by the editorial rhythm of *The Language of Flowers: A Miscellany*.

## Features
- **Today (Bloom of the Day):** Opens to a daily botanical spread with interactive trait pins on the watercolor plate and unhurried literary prose.
- **Catalog:** Search across flower names, Latin names, seasons, and Victorian sentiments (e.g., *apology*, *remembrance*, *eloquence*, *consolation*).
- **Stateless Posy Studio:** Search blooms by meaning, assemble up to 3 stems, edit the keepsake card message directly, and share a private URL (`?view=gift&stems=...&to=...&note=...`) that unfolds in the recipient's browser with no login or backend required.
- **Responsive Design:** Opens as a two-page botanical folio on desktop/tablet and shifts seamlessly to a single-column book layout with a bottom tab bar on mobile browsers.

## Running Locally
```bash
npm install
npm run dev
```
Then open `http://localhost:5173`.

## Expanding the Compendium (Toward 50 Plates)
All flower data lives in `src/data/flowers.ts` and watercolor plates live in `public/plates/<id>.jpg`. To add a new flower, drop its plate image into `public/plates/` and append a typed entry to `FLOWERS` in `src/data/flowers.ts` with its `pins`, `sentiments`, `paragraphs`, and public-domain `epigraph`.
