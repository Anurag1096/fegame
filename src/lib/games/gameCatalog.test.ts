import { describe, expect, it } from "vitest";
import { GAME_CATALOG, getGameById, listGames } from "./gameCatalog";

describe("gameCatalog", () => {
  it("lists all configured games", () => {
    expect(listGames()).toHaveLength(GAME_CATALOG.length);
    expect(listGames()[0]?.id).toBe("tic-tac-toe");
  });

  it("returns a game by id", () => {
    const game = getGameById("tic-tac-toe");

    expect(game).toBeDefined();
    expect(game?.title).toBe("Tic-Tac-Toe");
    expect(game?.available).toBe(true);
  });

  it("returns undefined for unknown ids", () => {
    expect(getGameById("unknown-game")).toBeUndefined();
  });

  it("marks future games as unavailable", () => {
    expect(getGameById("connect-four")?.available).toBe(false);
    expect(getGameById("chess")?.available).toBe(false);
  });
});
