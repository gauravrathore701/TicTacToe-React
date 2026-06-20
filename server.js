import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer);

const rooms = new Map();

const WINNING_LINES = [
  [0,1,2],[3,4,5],[6,7,8],
  [0,3,6],[1,4,7],[2,5,8],
  [0,4,8],[2,4,6],
];

function checkWinner(board) {
  for (const [a,b,c] of WINNING_LINES) {
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return { winner: board[a], line: [a,b,c] };
    }
  }
  return null;
}

function newRoom() {
  return {
    board: Array(9).fill(null),
    xHistory: [],
    oHistory: [],
    isXTurn: true,
    scores: { X: 0, O: 0 },
    lastRemoved: null,
    players: [],
    symbols: {},
    status: 'waiting',
  };
}

function roomState(room) {
  const result = checkWinner(room.board);
  const fadingIndex = !result
    ? room.isXTurn && room.xHistory.length === 3 ? room.xHistory[0]
      : !room.isXTurn && room.oHistory.length === 3 ? room.oHistory[0]
      : null
    : null;
  return {
    board: room.board,
    isXTurn: room.isXTurn,
    scores: room.scores,
    lastRemoved: room.lastRemoved,
    result,
    fadingIndex,
    status: room.status,
    playerCount: room.players.length,
  };
}

io.on('connection', (socket) => {
  socket.on('join-room', (roomId, cb) => {
    let room = rooms.get(roomId);

    if (!room) {
      room = newRoom();
      rooms.set(roomId, room);
      room.players.push(socket.id);
      room.symbols[socket.id] = 'X';
      socket.join(roomId);
      socket.data.roomId = roomId;
      cb({ ok: true, symbol: 'X' });
      socket.emit('game-state', roomState(room));
      return;
    }

    if (room.players.includes(socket.id)) {
      cb({ ok: true, symbol: room.symbols[socket.id] });
      socket.emit('game-state', roomState(room));
      return;
    }

    if (room.players.length >= 2) {
      cb({ error: 'Room full' });
      return;
    }

    room.players.push(socket.id);
    room.symbols[socket.id] = 'O';
    room.status = 'playing';
    socket.join(roomId);
    socket.data.roomId = roomId;
    cb({ ok: true, symbol: 'O' });
    io.to(roomId).emit('game-state', roomState(room));
  });

  socket.on('make-move', (index) => {
    const roomId = socket.data.roomId;
    if (!roomId) return;
    const room = rooms.get(roomId);
    if (!room || room.status !== 'playing') return;

    const mySymbol = room.symbols[socket.id];
    if (!mySymbol) return;
    if ((room.isXTurn && mySymbol !== 'X') || (!room.isXTurn && mySymbol !== 'O')) return;
    if (room.board[index] || checkWinner(room.board)) return;

    room.board[index] = mySymbol;
    const history = mySymbol === 'X' ? room.xHistory : room.oHistory;
    history.push(index);

    let removed = null;
    if (history.length > 3) {
      removed = history.shift();
      room.board[removed] = null;
    }
    room.lastRemoved = removed;

    const result = checkWinner(room.board);
    if (result) {
      room.scores[result.winner]++;
      room.status = 'done';
    }

    room.isXTurn = !room.isXTurn;
    io.to(roomId).emit('game-state', roomState(room));
  });

  socket.on('play-again', () => {
    const roomId = socket.data.roomId;
    if (!roomId) return;
    const room = rooms.get(roomId);
    if (!room || room.players.length < 2) return;
    room.board = Array(9).fill(null);
    room.xHistory = [];
    room.oHistory = [];
    room.isXTurn = true;
    room.lastRemoved = null;
    room.status = 'playing';
    io.to(roomId).emit('game-state', roomState(room));
  });

  socket.on('disconnect', () => {
    const roomId = socket.data.roomId;
    if (!roomId) return;
    const room = rooms.get(roomId);
    if (!room) return;
    room.players = room.players.filter(id => id !== socket.id);
    delete room.symbols[socket.id];
    if (room.players.length === 0) {
      rooms.delete(roomId);
    } else {
      room.status = 'waiting';
      io.to(roomId).emit('game-state', roomState(room));
      io.to(roomId).emit('opponent-left');
    }
  });
});

app.use(express.static(join(__dirname, 'dist')));
app.get('/{*path}', (_req, res) => {
  res.sendFile(join(__dirname, 'dist', 'index.html'));
});

httpServer.listen(4174, () => {
  console.log('TicTacToe server running on :4174');
});
