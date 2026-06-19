import { CurrentTttPlayer } from "../types";

const WINNING_MOVES = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

export function figureOutWinner(player: CurrentTttPlayer): CurrentTttPlayer {
  for (const moves of WINNING_MOVES) {
    if (
      player.moves.includes(moves[0]) &&
      player.moves.includes(moves[1]) &&
      player.moves.includes(moves[2])
    ) {
      return { ...player, success: true };
    }
  }

  return { ...player, success: false };
}

export function isCellPlayable(
  grid: Array<0 | "X" | "O">,
  index: number,
  playerXMoves: number[],
  playerOMoves: number[],
): boolean {
  if (grid[index] !== 0) {
    return false;
  }

  return !playerXMoves.includes(index) && !playerOMoves.includes(index);
}
