import { useEffect } from "react";
import { figureOutWinner } from "../lib/offlineRules";
import { TttBoardCell, TttGameViewModel } from "../types/game.types";
import { useGrid } from "./useGrid";
import { usePlayer } from "./usePlayer";

function toBoard(grid: Array<0 | "X" | "O">): TttBoardCell[] {
  return grid.map((cell) => (cell === 0 ? null : cell));
}

export function useOfflineTttGame(): TttGameViewModel {
  const { grid, setGrid } = useGrid();
  const {
    player,
    setPlayer,
    currentPlayer,
    setCurrentPlayer,
    draw,
    setDraw,
    winner,
    setWinner,
  } = usePlayer();

  useEffect(() => {
    const result = figureOutWinner(
      player[currentPlayer === "X" ? "O" : "X"],
    );

    if (result.success) {
      setWinner(result.name ? result.name : "");
      return;
    }

    if (!grid.includes(0)) {
      setDraw("Draw");
    }
  }, [grid]);

  const isFinished = Boolean(winner || draw);
  const canPlay = !isFinished && grid.includes(0);

  function onRestart() {
    setGrid(new Array(9).fill(0));
    setPlayer({
      X: { name: "player1", mark: "X", moves: [], success: false },
      O: { name: "player2", mark: "O", moves: [], success: false },
    });
    setCurrentPlayer("X");
    setWinner("");
    setDraw("");
  }

  function onCellClick(index: number) {
    if (winner) {
      return;
    }

    if (!grid.includes(0)) {
      return;
    }

    if (player.X.moves.includes(index) || player.O.moves.includes(index)) {
      return;
    }

    setPlayer((prev) => ({
      ...prev,
      [currentPlayer]: {
        ...prev[currentPlayer],
        moves: [...prev[currentPlayer].moves, index],
      },
    }));
    setGrid((prev) => [
      ...prev.slice(0, index),
      currentPlayer,
      ...prev.slice(index + 1),
    ]);
    setCurrentPlayer((prev) => (prev === "X" ? "O" : "X"));
  }

  const message = winner
    ? `${winner} wins!`
    : draw
      ? draw
      : `Current turn: ${currentPlayer}`;

  return {
    mode: "offline",
    status: isFinished ? "finished" : "playing",
    board: toBoard(grid),
    currentTurn: isFinished ? null : currentPlayer,
    mySymbol: null,
    players: {
      x: player.X.name,
      o: player.O.name,
    },
    winnerLabel: winner ? `${winner} Winner` : null,
    drawLabel: draw ? "Match Drawn" : null,
    message,
    canPlay,
    onCellClick,
    onRestart,
  };
}
