# Tic-Tac-Toe — React

A clean, modern Tic-Tac-Toe game built with React + Vite. Two players take turns on the same device.

## Features

- Two-player local gameplay (X vs O)
- Win detection across all rows, columns, and diagonals
- Draw detection when the board fills with no winner
- Winning squares highlighted with a glow effect
- Score tracker across rounds (persists until manually reset)
- Active turn indicator on scoreboard cards
- Responsive layout — works on mobile and desktop

## Tech Stack

- **React 18** — functional components with hooks
- **Vite** — fast dev server and build tool
- **CSS** — custom dark theme, grid layout, animations (no UI library)

## Getting Started

```bash
# Install dependencies
npm install

# Start dev server
npm run dev

# Build for production
npm run build
```

Runs at `http://localhost:5173` by default.

## Game Rules

1. X always goes first.
2. Players alternate clicking empty squares to place their mark.
3. First to get three in a row (horizontal, vertical, or diagonal) wins.
4. If all 9 squares are filled with no winner, it's a draw.
5. Click **New Game** to start a fresh round (scores preserved).
6. Click **Reset Scores** to clear the scoreboard and start over.

## Project Structure

```
src/
├── TicTacToeGame/
│   ├── Board.jsx    # game logic, state, layout
│   └── Square.jsx   # single cell component
├── App.jsx
├── App.css          # all game styles
└── index.css        # global reset and background
```

## License

MIT
