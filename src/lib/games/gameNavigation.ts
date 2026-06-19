import { GameDefinition } from "./types";

export function getGamePath(gameId: string): string {
  return `/games/${gameId}`;
}

export function canNavigateToGame(game: GameDefinition): boolean {
  return game.available;
}
