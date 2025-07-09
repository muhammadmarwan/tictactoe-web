"use client";

import { useEffect, useState } from "react";
import { startGame, makeMove } from "../lib/api";
import { Button } from "@/components/ui/button";

export default function GamePage() {
  const [board, setBoard] = useState<number[][]>([
    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 0],
  ]);
  const [status, setStatus] = useState("ONGOING");
  const [turn, setTurn] = useState("user");
  const [gameSessionId, setGameSessionId] = useState<string | null>(null);

  useEffect(() => {
    startNewGame();
  }, []);

  const startNewGame = async () => {
    const data = await startGame("computer");
    setBoard(data.board);
    setGameSessionId(data.gameSessionId);
    setStatus(data.status);
    setTurn(data.nextTurn);
  };

  const handleClick = async (i: number, j: number) => {
    if (!gameSessionId || board[i][j] !== 0 || status !== "ONGOING" || turn !== "user") return;

    const updatedBoard = board.map((row, x) =>
      row.map((cell, y) => (x === i && y === j ? -1 : cell))
    );
    setBoard(updatedBoard);
    setTurn("computer");

    const data = await makeMove(gameSessionId, i, j);
    setBoard(data.board);
    setStatus(data.status);
    setTurn(data.status === "ONGOING" ? "user" : "none");
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-4 p-4 bg-gray-100">
      <h1 className="text-3xl font-bold">Tic Tac Toe</h1>

      <div className="space-y-2">
        {board.map((row, i) => (
          <div key={i} className="flex gap-2">
            {row.map((cell, j) => (
              <Button
                key={`${i}-${j}`}
                className="w-16 h-16 text-xl"
                variant="outline"
                onClick={() => handleClick(i, j)}
                disabled={cell !== 0 || status !== "ONGOING" || turn !== "user"}
              >
                {cell === -1 ? "X" : cell === 1 ? "O" : ""}
              </Button>
            ))}
          </div>
        ))}
      </div>

      <div className="text-lg">
        {status === "ONGOING"
          ? `Turn: ${turn === "user" ? "You" : "Computer"}`
          : status === "WIN"
          ? "You Won! 🎉"
          : status === "LOSS"
          ? "Computer Won!"
          : "Game Over"}
      </div>

      <Button onClick={startNewGame} disabled={status === "ONGOING"}>
        Reset Game
      </Button>
    </div>
  );
}
