import { GameDefinition } from "./types";

export const GAME_CATALOG: GameDefinition[] = [
  {
    id: "tic-tac-toe",
    title: "Tic-Tac-Toe",
    description: "Classic 3x3 online matches with friends or random opponents.",
    playersLabel: "2 players",
    available: true,
  },
  {
    id: "connect-four",
    title: "Connect Four",
    description: "Drop discs and connect four in a row.",
    playersLabel: "2 players",
    available: false,
  },
  {
    id: "chess",
    title: "Chess",
    description: "Strategic board battles coming soon.",
    playersLabel: "2 players",
    available: false,
  },
];

export function getGameById(gameId: string): GameDefinition | undefined {
  return GAME_CATALOG.find((game) => game.id === gameId);
}

export function listGames(): GameDefinition[] {
  return GAME_CATALOG;
}
