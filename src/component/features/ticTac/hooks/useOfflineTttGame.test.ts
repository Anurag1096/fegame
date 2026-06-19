import { act, renderHook } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { useOfflineTttGame } from "./useOfflineTttGame";

describe("useOfflineTttGame", () => {
  it("starts with an empty board and X as the current turn", () => {
    const { result } = renderHook(() => useOfflineTttGame());

    expect(result.current.mode).toBe("offline");
    expect(result.current.status).toBe("playing");
    expect(result.current.board).toEqual(Array(9).fill(null));
    expect(result.current.currentTurn).toBe("X");
    expect(result.current.canPlay).toBe(true);
  });

  it("places marks alternately on cell click", () => {
    const { result } = renderHook(() => useOfflineTttGame());

    act(() => {
      result.current.onCellClick(0);
    });

    expect(result.current.board[0]).toBe("X");
    expect(result.current.currentTurn).toBe("O");

    act(() => {
      result.current.onCellClick(4);
    });

    expect(result.current.board[4]).toBe("O");
    expect(result.current.currentTurn).toBe("X");
  });

  it("resets the board on restart", () => {
    const { result } = renderHook(() => useOfflineTttGame());

    act(() => {
      result.current.onCellClick(0);
      result.current.onRestart();
    });

    expect(result.current.board).toEqual(Array(9).fill(null));
    expect(result.current.currentTurn).toBe("X");
    expect(result.current.winnerLabel).toBeNull();
    expect(result.current.drawLabel).toBeNull();
  });
});
