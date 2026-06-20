# TicTacToe — Real-time Multiplayer with Invite Links
**Date:** 2026-06-17 16:30

## What Was Built

Converted the local pass-and-play Vite app into a real-time multiplayer game with invite link support.

## Changes

### New: `server.js`
- Express 5 + Socket.io server on port 4174
- Serves `dist/` static files + SPA fallback (`/{*path}` for Express 5 wildcard syntax)
- In-memory room management: each room holds authoritative board state (board, xHistory, oHistory, scores, etc.)
- Socket events:
  - `join-room(roomId, cb)` — create-or-join: first socket gets X (status: waiting), second gets O (status: playing)
  - `make-move(index)` — validates turn/bounds, applies 3-marker limit (oldest removed if >3), checks winner
  - `play-again()` — resets board, keeps scores
  - `disconnect` — removes player, emits `opponent-left` to remaining player

### New: `src/components/ModeSelect.jsx`
- Landing screen at `/`
- Two buttons: **Solo** (→ `/solo`) and **Multiplayer** (generates 8-char random roomId → `/game/{roomId}`)

### New: `src/TicTacToeGame/OnlineBoard.jsx`
- Socket.io client driven board at `/game/:roomId`
- Connects on mount, emits `join-room`, stores `mySymbol` from callback
- Displays invite link with copy button while waiting for opponent
- Turn validation client-side (won't send move if not your turn)
- Handles `game-state` and `opponent-left` events
- "New Game" button only shown when both players are present

### Modified: `src/main.jsx`
- Added `<BrowserRouter>` wrapper

### Modified: `src/App.jsx`
- Added React Router routes: `/` (ModeSelect), `/solo` (existing Board), `/game/:roomId` (OnlineBoard)

### Modified: `src/App.css`
- Added styles for ModeSelect, invite section, online meta badges, status variants

### Modified: `package.json`
- Added `"start": "node server.js"` script
- New dependencies: `react-router-dom`, `socket.io-client`, `express`, `socket.io`

### Modified: `/etc/systemd/system/tictactoe.service`
- Changed `ExecStart` from `npx vite preview --port 4174 --host` to `node server.js`

## Deploy Steps
1. `npm run build`
2. `sudo systemctl daemon-reload && sudo systemctl restart tictactoe.service`

## Notes
- Express 5 requires named wildcards: `/{*path}` not `*`
- Socket.io client uses `io()` (no URL) — connects to same origin as page, works in production
- Existing solo Board.jsx untouched — same 3-marker game logic preserved
- Room cleanup: rooms deleted when all players disconnect
