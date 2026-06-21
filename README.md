# Tic-Tac-Toe

A real-time multiplayer Tic-Tac-Toe game with both online and solo modes. Built with React + Vite frontend and an Express + Socket.io backend.

**Live URL:** https://tictactoe.cursedshrine.com

---

## Features

- **Online multiplayer** — share an invite link to play with anyone on the same network
- **Solo mode** — local 2-player pass-and-play at `/solo`
- Room-based sessions with invite URL (`?room=ID`)
- Real-time move sync via WebSockets
- Win/draw detection with highlighted winning line
- Responsive, mobile-friendly UI

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React 18 + Vite + React Router |
| Backend | Node.js + Express 5 + Socket.io |
| Build | Vite (outputs to `dist/`) |
| Hosting | Raspberry Pi → Cloudflare Tunnel |

## Project Structure

```
TicTacToe-React/
├── src/
│   ├── App.jsx            # Router setup
│   ├── ModeSelect.jsx     # Choose online vs solo
│   ├── OnlineBoard.jsx    # Multiplayer game board
│   └── SoloBoard.jsx      # Local 2-player board
├── server.js              # Express + Socket.io server
├── dist/                  # Vite production build
├── vite.config.js
└── package.json
```

## Running Locally

```bash
npm install
npm run build              # build React app to dist/
node server.js             # start server on :4174
```

## Deployment

```bash
sudo systemctl status tictactoe
sudo systemctl restart tictactoe
```

Port `4174` → Cloudflare Tunnel → `tictactoe.cursedshrine.com`.
