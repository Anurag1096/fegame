export type TttBoardCell = "X" | "O" | null;

export type TttGameStatus = "idle" | "waiting" | "playing" | "finished";

export type TttGameViewModel = {
  mode: "offline" | "multiplayer";
  status: TttGameStatus;
  board: TttBoardCell[];
  currentTurn: "X" | "O" | null;
  mySymbol: "X" | "O" | null;
  players: { x: string; o: string };
  winnerLabel: string | null;
  drawLabel: string | null;
  message: string;
  canPlay: boolean;
  onCellClick: (index: number) => void;
  onRestart: () => void;
};

export type OfflineGridCell = 0 | "X" | "O";
