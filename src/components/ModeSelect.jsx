import React from "react";
import { useNavigate } from "react-router-dom";

const ModeSelect = () => {
  const navigate = useNavigate();

  const handleMultiplayer = () => {
    const roomId = Math.random().toString(36).slice(2, 10);
    navigate(`/game/${roomId}`);
  };

  return (
    <div className="mode-select-wrapper">
      <h1 className="game-title">Tic-Tac-Toe</h1>
      <p className="mode-subtitle">Choose your game mode</p>
      <div className="mode-buttons">
        <button className="mode-btn mode-btn-solo" onClick={() => navigate("/solo")}>
          <span className="mode-icon">👤</span>
          <span className="mode-label">Solo</span>
          <span className="mode-desc">Local pass &amp; play</span>
        </button>
        <button className="mode-btn mode-btn-multi" onClick={handleMultiplayer}>
          <span className="mode-icon">🌐</span>
          <span className="mode-label">Multiplayer</span>
          <span className="mode-desc">Share a link to play</span>
        </button>
      </div>
    </div>
  );
};

export default ModeSelect;
