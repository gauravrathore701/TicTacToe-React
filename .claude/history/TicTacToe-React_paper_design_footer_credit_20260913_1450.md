# TicTacToe — Cursed Shrine paper design + footer credit (2026-09-13 14:50)

## Asked
- Apply the cursedshrine.com design (paper look from the blog) and the
  bottom-right "developed and managed by / With the help of Claudy Rex" credit.

## Changed
- `src/index.css`: blog tokens (bg #e8dfc9, bg-sec #ddd2b7, ink #2b2723, accent
  #6b4a2f, line #cbbd9e, system sans), light color-scheme, CSS paper texture.
  New `--color-x: #6b4a2f` (sepia) and `--color-o: #2f6f8f` (blue ink).
- `src/App.css`: every existing class restyled for paper (no neon glows/gradients);
  class names unchanged so Board/OnlineBoard/Square JSX untouched. Added
  `.app-main`, `.site-header`, `.site-footer` chrome styles.
- `src/App.jsx`: layout = `<SiteHeader/>` + `<main className="app-main">` routes + `<SiteFooter/>`.
- New `src/components/SiteHeader.jsx` (wordmark → cursedshrine.com, Portfolio, Blog)
  and `src/components/SiteFooter.jsx` (© year, Home/Portfolio/Blog, right-aligned
  credit → gaurav.cursedshrine.com, small italic Claudy Rex line).
- `npm run build` → new `dist/` (served statically by server.js; no restart needed).

## Backups
- `.claude/backups/src-20260913/` (App.css, index.css, App.jsx)
- `.claude/backups/dist-20260913/` (previous build)

## Verified
- Build clean (77 modules). Headless screenshots of `/` (1280) and `/solo`
  (1280 + 393): header, mode cards, scoreboard, board, buttons, footer credit.
- Multiplayer route uses the same classes; not screenshot (needs a live room).
