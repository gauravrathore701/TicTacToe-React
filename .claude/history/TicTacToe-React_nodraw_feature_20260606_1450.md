# TicTacToe-React — No-Draw Feature

**Date:** 2026-06-06 14:50

## What was done

Added "no draw" mechanic: when the board fills with no winner, the oldest placed marker is automatically removed, freeing a square so the game continues until someone wins.

## Changes

- **Board.jsx** — Added `moveHistory` state (tracks move order by index). On board-full/no-winner, removes `history[0]` from the board and shifts the history. Added `lastRemoved` state to pass to Square for visual feedback.
- **Square.jsx** — Added `isRemoved` prop; applies `removed` CSS class to the freed square.
- **App.css** — Added `.square.removed` style: amber border glow + fade animation so players notice which square was cleared. Updated `.status-draw` message to "Oldest marker removed — keep playing!".
