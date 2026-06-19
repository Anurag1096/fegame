import { ComponentType } from "react";
import TicTacGamePage from "@/component/features/ticTac/TicTacGamePage";

export const GAME_PAGE_COMPONENTS: Record<string, ComponentType> = {
  "tic-tac-toe": TicTacGamePage,
};

export function getGamePageComponent(gameId: string): ComponentType | undefined {
  return GAME_PAGE_COMPONENTS[gameId];
}
