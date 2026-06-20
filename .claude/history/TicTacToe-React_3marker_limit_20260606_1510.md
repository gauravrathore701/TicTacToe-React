# TicTacToe-React — 3-Marker Limit Mechanic

**Date:** 2026-06-06 15:10

## What was done

Each player is capped at 3 markers on the board. Placing a 4th removes that player's oldest marker first, then checks for a win.

## Changes

- **Board.jsx** — Replaced combined `moveHistory` with per-player `xHistory` / `oHistory`. On placement, if `history.length > 3`, `history.shift()` removes the oldest index and clears it from the board. Added `fadingIndex` derived state: highlights the at-risk marker (oldest of current player when they have 3) before the next move clears it.
- **Square.jsx** — Added `isFading` prop → applies `fading` CSS class.
- **App.css** — Added `.square.fading` pulsing opacity animation as a warning indicator.

## Behaviour

- Draws are now structurally impossible (max 6 squares filled, 3 always empty).
- The oldest marker of the current player pulses/fades when they already have 3, signalling it will disappear on their next move.
