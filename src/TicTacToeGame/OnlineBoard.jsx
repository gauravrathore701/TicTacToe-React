import React, { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { io } from "socket.io-client";
import Square from "./Square";

const OnlineBoard = () => {
  const { roomId } = useParams();
  const navigate = useNavigate();
  const socketRef = useRef(null);

  const [mySymbol, setMySymbol] = useState(null);
  const [gameState, setGameState] = useState(null);
  const [opponentLeft, setOpponentLeft] = useState(false);
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState(null);

  const inviteUrl = `${window.location.origin}/game/${roomId}`;

  useEffect(() => {
    const socket = io();
    socketRef.current = socket;

    socket.emit("join-room", roomId, (res) => {
      if (res.error) {
        setError(res.error);
        return;
      }
      setMySymbol(res.symbol);
    });

    socket.on("game-state", (state) => {
      setGameState(state);
      setOpponentLeft(false);
    });

    socket.on("opponent-left", () => {
      setOpponentLeft(true);
    });

    return () => {
      socket.disconnect();
    };
  }, [roomId]);

  const handleClick = (index) => {
    if (!gameState || gameState.status !== "playing") return;
    const isMyTurn =
      (gameState.isXTurn && mySymbol === "X") ||
      (!gameState.isXTurn && mySymbol === "O");
    if (!isMyTurn) return;
    if (gameState.board[index] || gameState.result) return;
    socketRef.current.emit("make-move", index);
  };

  const handlePlayAgain = () => {
    socketRef.current.emit("play-again");
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(inviteUrl).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  if (error) {
    return (
      <div className="game-wrapper">
        <h1 className="game-title">Tic-Tac-Toe</h1>
        <p className="online-error">{error}</p>
        <button className="btn-play-again" onClick={() => navigate("/")}>Back to Home</button>
      </div>
    );
  }

  if (!gameState) {
    return (
      <div className="game-wrapper">
        <h1 className="game-title">Tic-Tac-Toe</h1>
        <p className="online-connecting">Connecting…</p>
      </div>
    );
  }

  const { board, isXTurn, scores, lastRemoved, result, fadingIndex, status, playerCount } = gameState;

  const isMyTurn =
    status === "playing" &&
    ((isXTurn && mySymbol === "X") || (!isXTurn && mySymbol === "O"));

  const winningSquares = result ? result.line : [];

  const statusEl = (() => {
    if (status === "waiting") {
      return <span className="status-waiting">Waiting for opponent…</span>;
    }
    if (opponentLeft) {
      return <span className="status-draw">Opponent disconnected</span>;
    }
    if (result) {
      return (
        <span className="status-winner">
          {result.winner === mySymbol ? "You win!" : "Opponent wins!"}
        </span>
      );
    }
    if (lastRemoved !== null) {
      return <span className="status-draw">Oldest marker removed — keep playing!</span>;
    }
    return (
      <span className="status-turn">
        {isMyTurn
          ? <span>Your turn <span className={mySymbol === "X" ? "x-symbol" : "o-symbol"}>{mySymbol}</span></span>
          : <span>Opponent's turn</span>
        }
      </span>
    );
  })();

  return (
    <div className="game-wrapper">
      <h1 className="game-title">Tic-Tac-Toe</h1>

      <div className="online-meta">
        <span className="online-badge">
          You are <span className={mySymbol === "X" ? "x-symbol" : "o-symbol"}>{mySymbol}</span>
        </span>
        <span className="online-players">{playerCount}/2 players</span>
      </div>

      {status === "waiting" && (
        <div className="invite-section">
          <p className="invite-label">Share this link with your opponent:</p>
          <div className="invite-row">
            <span className="invite-url">{inviteUrl}</span>
            <button className="btn-copy" onClick={handleCopy}>
              {copied ? "Copied!" : "Copy"}
            </button>
          </div>
        </div>
      )}

      <div className="scoreboard">
        <div className={`score-card score-x ${isXTurn && !result && status === "playing" ? "active-turn" : ""}`}>
          <span className="score-symbol x-symbol">X</span>
          <span className="score-label">{mySymbol === "X" ? "You" : "Opponent"}</span>
          <span className="score-num">{scores.X}</span>
        </div>
        <div className="score-divider">VS</div>
        <div className={`score-card score-o ${!isXTurn && !result && status === "playing" ? "active-turn" : ""}`}>
          <span className="score-symbol o-symbol">O</span>
          <span className="score-label">{mySymbol === "O" ? "You" : "Opponent"}</span>
          <span className="score-num">{scores.O}</span>
        </div>
      </div>

      <div className="status-bar">{statusEl}</div>

      <div className={`board ${!isMyTurn || status !== "playing" ? "board-disabled" : ""}`}>
        {board.map((val, i) => (
          <Square
            key={i}
            value={val}
            onClick={() => handleClick(i)}
            isWinning={winningSquares.includes(i)}
            isRemoved={i === lastRemoved}
            isFading={i === fadingIndex}
            disabled={!isMyTurn || status !== "playing" || !!result}
          />
        ))}
      </div>

      <div className="action-buttons">
        {(result || opponentLeft) && playerCount === 2 && (
          <button className="btn-play-again" onClick={handlePlayAgain}>
            New Game
          </button>
        )}
        <button className="btn-reset" onClick={() => navigate("/")}>
          Leave Game
        </button>
      </div>
    </div>
  );
};

export default OnlineBoard;
