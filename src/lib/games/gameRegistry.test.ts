import { describe, expect, it } from "vitest";
import { getGameById } from "@/lib/games/gameCatalog";
import { getGamePageComponent } from "@/lib/games/gameRegistry";
import { canNavigateToGame } from "@/lib/games/gameNavigation";

describe("game page resolution", () => {
  it("resolves a page component for tic-tac-toe", () => {
    const game = getGameById("tic-tac-toe");

    expect(game).toBeDefined();
    expect(canNavigateToGame(game!)).toBe(true);
    expect(getGamePageComponent("tic-tac-toe")).toBeDefined();
  });

  it("does not resolve unavailable games", () => {
    const game = getGameById("chess");

    expect(game).toBeDefined();
    expect(canNavigateToGame(game!)).toBe(false);
    expect(getGamePageComponent("chess")).toBeUndefined();
  });

  it("returns undefined for unknown games", () => {
    expect(getGamePageComponent("unknown-game")).toBeUndefined();
  });
});
