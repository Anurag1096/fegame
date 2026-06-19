export type GameMode = "offline" | "multiplayer";

export type GameModeOption = {
  id: GameMode;
  title: string;
  description: string;
};

export const GAME_MODE_OPTIONS: GameModeOption[] = [
  {
    id: "offline",
    title: "Offline",
    description: "Play on this device with a friend sitting next to you.",
  },
  {
    id: "multiplayer",
    title: "Multiplayer",
    description: "Match online with another player in real time.",
  },
];

export interface TicTacToe {
  name: string;
  score: number;
}

export interface CurrentTttPlayer {
  name: string;
  mark: "X" | "O";
  moves: number[];
  success: boolean;
}
