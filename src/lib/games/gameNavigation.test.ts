import { describe, expect, it } from "vitest";
import { getGameById } from "./gameCatalog";
import { canNavigateToGame, getGamePath } from "./gameNavigation";

describe("gameNavigation", () => {
  it("builds a game route from id", () => {
    expect(getGamePath("tic-tac-toe")).toBe("/games/tic-tac-toe");
  });

  it("allows navigation only for available games", () => {
    const availableGame = getGameById("tic-tac-toe");
    const unavailableGame = getGameById("chess");

    expect(availableGame).toBeDefined();
    expect(unavailableGame).toBeDefined();
    expect(canNavigateToGame(availableGame!)).toBe(true);
    expect(canNavigateToGame(unavailableGame!)).toBe(false);
  });
});
