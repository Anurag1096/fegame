import { act, renderHook } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { useGameModeModal } from "./useGameModeModal";

describe("useGameModeModal", () => {
  it("opens on first load until a mode is selected", () => {
    const { result } = renderHook(() => useGameModeModal());

    expect(result.current.isOpen).toBe(true);
    expect(result.current.selectedMode).toBeNull();
  });

  it("closes after selecting offline or multiplayer", () => {
    const { result } = renderHook(() => useGameModeModal());

    act(() => {
      result.current.selectMode("offline");
    });

    expect(result.current.isOpen).toBe(false);
    expect(result.current.selectedMode).toBe("offline");

    act(() => {
      result.current.openModal();
    });

    expect(result.current.isOpen).toBe(true);
    expect(result.current.selectedMode).toBeNull();
  });
});
