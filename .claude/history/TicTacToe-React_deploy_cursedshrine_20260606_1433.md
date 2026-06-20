# TicTacToe-React — Deploy to tictactoe.cursedshrine.com

**Date:** 2026-06-06 14:33

## What was done

1. **Fixed vite base path** — Changed `base: "/TicTacToe-React/"` to `base: "/"` in `vite.config.js` (was set for GitHub Pages, breaks root-domain serving)
2. **Installed deps & built** — `npm install && npm run build` → output in `dist/`
3. **Created systemd service** — `/etc/systemd/system/tictactoe.service` serving `vite preview` on port **4174**
4. **Added tunnel ingress** — `tictactoe.cursedshrine.com → http://localhost:4174` in `~/.cloudflared/config.yml`
5. **Restarted tunnel** — `cloudflare-tunnel.service` restarted and re-registered successfully

## Result

`tictactoe.cursedshrine.com` is live via the existing `sharemarketstudies-app` Cloudflare tunnel.

## Ports

| Service | Port |
|---------|------|
| portfolio-website | 3000 |
| jenkins | 8080 |
| tictactoe | 4174 |
