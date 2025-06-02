import React, { useState } from "react";

// PUBLIC_INTERFACE
/**
 * MainTicTacToeContainer - Main game board & control logic for TicTacToe Classic.
 * Handles two-player mode, win/draw detection, status display, and restart.
 * @returns the main UI for the TicTacToe game
 */
function MainTicTacToeContainer() {
  // Board is a 9-element array: null | 'X' | 'O'
  const [board, setBoard] = useState(Array(9).fill(null));
  const [xIsNext, setXIsNext] = useState(true); // 'X' always starts
  const [gameStatus, setGameStatus] = useState("playing"); // 'playing' | 'win' | 'draw'
  const [winner, setWinner] = useState(null); // 'X' | 'O' | null

  // Colors & styles
  const COLORS = {
    primary: "#ffffff",
    secondary: "#222222",
    accent: "#4caf50",
  };

  // Checks for winner or draw after every move
  const checkGameOutcome = (currentBoard) => {
    const lines = [
      [0,1,2], [3,4,5], [6,7,8], // rows
      [0,3,6], [1,4,7], [2,5,8], // cols
      [0,4,8], [2,4,6]           // diags
    ];
    for (let [a,b,c] of lines) {
      if (
        currentBoard[a] &&
        currentBoard[a] === currentBoard[b] &&
        currentBoard[b] === currentBoard[c]
      ) {
        return { status: "win", winner: currentBoard[a] };
      }
    }
    if (currentBoard.every((cell) => cell)) {
      return { status: "draw", winner: null };
    }
    return { status: "playing", winner: null };
  };

  // PUBLIC_INTERFACE
  // Handles click on a single cell
  const handleCellClick = (idx) => {
    if (board[idx] || gameStatus !== "playing") return; // ignore if already filled or game over

    const newBoard = [...board];
    newBoard[idx] = xIsNext ? "X" : "O";
    setBoard(newBoard);

    const { status, winner } = checkGameOutcome(newBoard);
    setGameStatus(status);
    setWinner(winner);

    if (status === "playing") {
      setXIsNext(!xIsNext);
    }
  };

  // PUBLIC_INTERFACE
  // Restart game to initial state
  const handleRestart = () => {
    setBoard(Array(9).fill(null));
    setXIsNext(true);
    setGameStatus("playing");
    setWinner(null);
  };

  // UI helpers for display
  const renderGameStatus = () => {
    if (gameStatus === "win") {
      return (
        <span style={{ color: COLORS.accent, fontWeight: 600 }}>
          Winner: {winner}
        </span>
      );
    }
    if (gameStatus === "draw") {
      return (
        <span style={{ color: COLORS.secondary, fontWeight: 500 }}>
          Draw!
        </span>
      );
    }
    return (
      <span style={{ color: COLORS.secondary }}>
        Current Turn: <span style={{ color: COLORS.accent, fontWeight: 600 }}>{xIsNext ? "X" : "O"}</span>
      </span>
    );
  };

  // Inline component for a TicTacToe board cell
  const Cell = ({ value, onClick, isLastRow }) => (
    <button
      className="ttt-cell"
      style={{
        width: 72, height: 72,
        border: `1.5px solid ${COLORS.secondary}`,
        background: COLORS.primary,
        color: value === "X" ? COLORS.secondary : COLORS.accent,
        fontSize: "2rem",
        fontWeight: 700,
        cursor: value || gameStatus !== "playing" ? "default" : "pointer",
        outline: "none",
        borderBottomWidth: isLastRow ? 0 : "1.5px",
        transition: "background 0.15s"
      }}
      onClick={onClick}
      aria-label={value ? `Cell ${value}` : "Empty Cell"}
      disabled={!!value || gameStatus !== "playing"}
    >
      {value}
    </button>
  );

  return (
    <div
      className="ttt-main-container"
      style={{
        display: "flex", flexDirection: "column",
        alignItems: "center", justifyContent: "center",
        minHeight: "70vh",
        background: COLORS.primary,
        borderRadius: 16,
        boxShadow: "0 4px 32px rgba(34,34,34,0.08)",
        maxWidth: 360,
        margin: "40px auto",
        padding: "32px 24px 24px 24px"
      }}
    >
      <h2 style={{
        margin: 0, marginBottom: 20, color: COLORS.secondary, fontWeight: 700, fontSize: "1.3rem", letterSpacing: 1
      }}>
        TicTacToe Classic
      </h2>
      <div style={{ marginBottom: 16, fontSize: "1.1rem" }}>
        {renderGameStatus()}
      </div>
      {/* 3x3 Grid */}
      <div
        className="ttt-board"
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 72px)",
          gridTemplateRows: "repeat(3, 72px)",
          gap: 0,
          background: COLORS.secondary,
          borderRadius: 10,
          overflow: "hidden",
          boxShadow: "0 2px 16px rgba(34,34,34,0.1)",
          marginBottom: 24
        }}
      >
        {board.map((val, idx) => (
          <Cell
            key={idx}
            value={val}
            onClick={() => handleCellClick(idx)}
            isLastRow={Math.floor(idx / 3) === 2}
          />
        ))}
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
        <button
          className="btn"
          type="button"
          style={{
            background: COLORS.accent,
            color: COLORS.primary,
            fontWeight: 600,
            fontSize: "1.05rem",
            padding: "10px 22px",
            borderRadius: 6,
            border: 0,
            cursor: "pointer",
            letterSpacing: 1,
            boxShadow: "0 1px 6px rgba(76,175,80,0.08)"
          }}
          onClick={handleRestart}
        >
          Restart
        </button>
        {gameStatus !== "playing" && (
          <span style={{ color: COLORS.secondary, fontWeight: 500, fontSize: "1rem" }}>
            {gameStatus === "win"
              ? `Congratulations!`
              : `No winner, try again.`}
          </span>
        )}
      </div>
    </div>
  );
}

export default MainTicTacToeContainer;
