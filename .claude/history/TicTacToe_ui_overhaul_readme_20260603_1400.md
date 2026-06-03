# TicTacToe — UI Overhaul & README — 2026-06-03

## What changed

### Bug fixes
- Fixed "0" (zero) being used instead of "O" (letter) for Player 2's mark in `Board.jsx`
- Added missing draw detection — game now correctly announces a draw when the board fills with no winner

### UI improvements (`src/App.css`, `src/index.css`)
- Dark theme with deep purple radial gradient background (`#0f0f1a`)
- Gradient title using CSS `background-clip: text`
- 3×3 CSS Grid board replacing the old flexbox row approach
- Square cells: 120×120px with rounded corners, glow borders, hover scale effect
- X styled in cyan (`#38bdf8`), O styled in pink (`#f472b6`) with text-shadow glow
- Winning squares highlighted in purple with pop animation
- Scoreboard cards for X and O with active-turn highlight and subtle lift
- Status bar showing whose turn it is or the result
- Two action buttons: "New Game" (gradient) and "Reset Scores" (ghost)
- Responsive breakpoint at 480px — cells shrink to 90×90px

### Logic improvements (`Board.jsx`)
- Extracted `WINNING_LINES` constant and `checkWinner` as pure function
- Score tracking added — increments winner's score each round
- `handleClick` now checks result after each move to update score immediately
- `playAgain` resets board only; `resetAll` resets board + scores

### Square component (`Square.jsx`)
- Replaced inline styles with CSS classes
- Accepts `isWinning` and `disabled` props for state-driven styling

### README
- Replaced default Vite template README with project-specific documentation
- Covers features, tech stack, getting started, game rules, and project structure
