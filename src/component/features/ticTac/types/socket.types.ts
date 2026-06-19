export type RoomStatus = "WAITING" | "IN_PROGRESS" | "FINISHED" | "ABANDONED";

export type RoomSnapshot = {
  id: string;
  board: Array<"X" | "O" | null>;
  currentTurn: "X" | "O";
  status: RoomStatus;
  winner: "X" | "O" | "draw" | null;
  mode: "invite" | "queue";
  players: Array<{ userId: number; username: string; symbol: "X" | "O" }>;
};

export type ConnectedPayload = {
  userId: number;
  username: string;
};

export type QueueJoinedPayload = {
  position: number;
};

export type RoomEventPayload = {
  room: RoomSnapshot;
};

export type GameOverPayload = {
  room: RoomSnapshot;
  winner: "X" | "O" | "draw" | null;
  reason: "completed" | "forfeit" | "opponent_disconnected";
};

export type SocketErrorPayload = {
  code: string;
  message: string;
};

export const CLIENT_EVENTS = {
  CREATE_ROOM: "createRoom",
  JOIN_ROOM: "joinRoom",
  JOIN_QUEUE: "joinQueue",
  LEAVE_QUEUE: "leaveQueue",
  MAKE_MOVE: "makeMove",
  LEAVE_ROOM: "leaveRoom",
} as const;

export const SERVER_EVENTS = {
  CONNECTED: "connected",
  ROOM_JOINED: "roomJoined",
  GAME_STARTED: "gameStarted",
  GAME_UPDATE: "gameUpdate",
  GAME_OVER: "gameOver",
  OPPONENT_JOINED: "opponentJoined",
  OPPONENT_DISCONNECTED: "opponentDisconnected",
  ERROR: "error",
  QUEUE_JOINED: "queueJoined",
  MATCH_FOUND: "matchFound",
} as const;
