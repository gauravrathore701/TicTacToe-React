import React from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";

import ModeSelect from "./components/ModeSelect";
import SiteHeader from "./components/SiteHeader";
import SiteFooter from "./components/SiteFooter";
import Board from "./TicTacToeGame/Board";
import OnlineBoard from "./TicTacToeGame/OnlineBoard";

function App() {
  return (
    <div className="App">
      <SiteHeader />
      <main className="app-main">
        <Routes>
          <Route path="/" element={<ModeSelect />} />
          <Route path="/solo" element={<Board />} />
          <Route path="/game/:roomId" element={<OnlineBoard />} />
        </Routes>
      </main>
      <SiteFooter />
    </div>
  );
}

export default App;
