import { TttGameStatus, TttGameViewModel } from "../types/game.types";
import { GameOverPayload, RoomSnapshot } from "../types/socket.types";

const EMPTY_BOARD: TttGameViewModel["board"] = Array(9).fill(null);

export function getPlayerNames(room: RoomSnapshot | null): {
  x: string;
  o: string;
} {
  if (!room) {
    return { x: "—", o: "—" };
  }

  return {
    x: room.players.find((player) => player.symbol === "X")?.username ?? "Waiting…",
    o: room.players.find((player) => player.symbol === "O")?.username ?? "Waiting…",
  };
}

export function mapRoomStatus(room: RoomSnapshot | null): TttGameStatus {
  if (!room) {
    return "idle";
  }

  if (room.status === "WAITING") {
    return "waiting";
  }

  if (room.status === "IN_PROGRESS") {
    return "playing";
  }

  return "finished";
}

export function buildWinnerLabel(
  room: RoomSnapshot,
  mySymbol: "X" | "O" | null,
  gameOver: GameOverPayload | null,
): string | null {
  if (room.winner === "draw" || room.winner === null) {
    return null;
  }

  const winnerPlayer = room.players.find((player) => player.symbol === room.winner);

  if (mySymbol === room.winner) {
    if (gameOver?.reason === "opponent_disconnected") {
      return "You win — opponent disconnected";
    }

    if (gameOver?.reason === "forfeit") {
      return "You win — opponent left";
    }

    return "You win!";
  }

  return `${winnerPlayer?.username ?? room.winner} wins!`;
}

export function buildDrawLabel(room: RoomSnapshot): string | null {
  return room.winner === "draw" ? "Match drawn" : null;
}

export function buildGameMessage(
  room: RoomSnapshot | null,
  mySymbol: "X" | "O" | null,
  queuePosition: number | null,
  isConnected: boolean,
  errorMessage: string | null,
): string {
  if (errorMessage) {
    return errorMessage;
  }

  if (!isConnected) {
    return "Connecting to game server…";
  }

  if (queuePosition !== null) {
    return `Finding opponent… (queue #${queuePosition})`;
  }

  if (!room) {
    return "Choose how you want to match online.";
  }

  if (room.status === "WAITING") {
    return room.mode === "invite"
      ? `Waiting for opponent. Share room code: ${room.id}`
      : "Waiting for opponent…";
  }

  if (room.status === "IN_PROGRESS") {
    if (mySymbol && room.currentTurn === mySymbol) {
      return "Your turn";
    }

    return "Opponent's turn";
  }

  if (room.status === "FINISHED") {
    return "Game over";
  }

  return "Game ended";
}

export function mapRoomToBoard(room: RoomSnapshot | null): TttGameViewModel["board"] {
  if (!room) {
    return EMPTY_BOARD;
  }

  return [...room.board];
}

export function canPlayOnlineMove(
  room: RoomSnapshot | null,
  mySymbol: "X" | "O" | null,
): boolean {
  if (!room || !mySymbol) {
    return false;
  }

  return room.status === "IN_PROGRESS" && room.currentTurn === mySymbol;
}

export function shouldShowOnlineBoard(room: RoomSnapshot | null): boolean {
  if (!room) {
    return false;
  }

  return (
    room.status === "IN_PROGRESS" ||
    room.status === "FINISHED" ||
    room.status === "ABANDONED"
  );
}
