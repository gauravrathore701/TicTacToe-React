import React, { useState } from "react";
import Square from "./Square";

const WINNING_LINES = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

const checkWinner = (board) => {
  for (let [a, b, c] of WINNING_LINES) {
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return { winner: board[a], line: [a, b, c] };
    }
  }
  return null;
};

const Board = () => {
  const [state, setState] = useState(Array(9).fill(null));
  const [isXTurn, setIsXTurn] = useState(true);
  const [scores, setScores] = useState({ X: 0, O: 0 });

  const result = checkWinner(state);
  const isDraw = !result && state.every((s) => s !== null);
  const winningSquares = result ? result.line : [];

  const handleClick = (index) => {
    if (state[index] || result) return;
    const copy = [...state];
    copy[index] = isXTurn ? "X" : "O";
    setState(copy);
    setIsXTurn(!isXTurn);

    const newResult = checkWinner(copy);
    if (newResult) {
      setScores((prev) => ({ ...prev, [newResult.winner]: prev[newResult.winner] + 1 }));
    }
  };

  const playAgain = () => {
    setState(Array(9).fill(null));
    setIsXTurn(true);
  };

  const resetAll = () => {
    setState(Array(9).fill(null));
    setIsXTurn(true);
    setScores({ X: 0, O: 0 });
  };

  return (
    <div className="game-wrapper">
      <h1 className="game-title">Tic-Tac-Toe</h1>

      <div className="scoreboard">
        <div className={`score-card score-x ${isXTurn && !result && !isDraw ? "active-turn" : ""}`}>
          <span className="score-symbol x-symbol">X</span>
          <span className="score-label">Player X</span>
          <span className="score-num">{scores.X}</span>
        </div>
        <div className="score-divider">VS</div>
        <div className={`score-card score-o ${!isXTurn && !result && !isDraw ? "active-turn" : ""}`}>
          <span className="score-symbol o-symbol">O</span>
          <span className="score-label">Player O</span>
          <span className="score-num">{scores.O}</span>
        </div>
      </div>

      <div className="status-bar">
        {result ? (
          <span className="status-winner">
            <span className={result.winner === "X" ? "x-symbol" : "o-symbol"}>{result.winner}</span> wins!
          </span>
        ) : isDraw ? (
          <span className="status-draw">It's a draw!</span>
        ) : (
          <span className="status-turn">
            Player <span className={isXTurn ? "x-symbol" : "o-symbol"}>{isXTurn ? "X" : "O"}</span>'s turn
          </span>
        )}
      </div>

      <div className="board">
        {state.map((val, i) => (
          <Square
            key={i}
            value={val}
            onClick={() => handleClick(i)}
            isWinning={winningSquares.includes(i)}
            disabled={!!result || isDraw}
          />
        ))}
      </div>

      <div className="action-buttons">
        <button className="btn-play-again" onClick={playAgain}>
          New Game
        </button>
        <button className="btn-reset" onClick={resetAll}>
          Reset Scores
        </button>
      </div>
    </div>
  );
};

export default Board;
