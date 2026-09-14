import React from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";

import ModeSelect from "./components/ModeSelect";
import Board from "./TicTacToeGame/Board";
import OnlineBoard from "./TicTacToeGame/OnlineBoard";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<ModeSelect />} />
        <Route path="/solo" element={<Board />} />
        <Route path="/game/:roomId" element={<OnlineBoard />} />
      </Routes>
    </div>
  );
}

export default App;
