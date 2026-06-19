import { describe, expect, it } from "vitest";
import { figureOutWinner, isCellPlayable } from "./offlineRules";
import { CurrentTttPlayer } from "../types";

describe("offlineRules", () => {
  it("detects a winning row", () => {
    const player: CurrentTttPlayer = {
      name: "player1",
      mark: "X",
      moves: [0, 1, 2],
      success: false,
    };

    const result = figureOutWinner(player);

    expect(result.success).toBe(true);
    expect(result.name).toBe("player1");
  });

  it("returns unsuccessful when there is no win", () => {
    const player: CurrentTttPlayer = {
      name: "player2",
      mark: "O",
      moves: [0, 1],
      success: false,
    };

    expect(figureOutWinner(player).success).toBe(false);
  });

  it("blocks occupied cells", () => {
    const grid = ["X", 0, 0, 0, 0, 0, 0, 0, 0] as Array<0 | "X" | "O">;

    expect(isCellPlayable(grid, 0, [], [])).toBe(false);
    expect(isCellPlayable(grid, 1, [], [])).toBe(true);
  });
});
