import { act, renderHook } from "@testing-library/react";
import { describe, expect, it, vi, beforeEach } from "vitest";
import { useOnlineTttGame } from "./useOnlineTttGame";
import { SERVER_EVENTS } from "../types/socket.types";

const listeners = new Map<string, (...args: unknown[]) => void>();

const socketMock = {
  on: vi.fn((event: string, handler: (...args: unknown[]) => void) => {
    listeners.set(event, handler);
  }),
  connect: vi.fn(),
  disconnect: vi.fn(),
  removeAllListeners: vi.fn(),
  emit: vi.fn(),
};

vi.mock("@/socket/socket", () => ({
  createGameSocket: () => socketMock,
}));

function emit(event: string, payload?: unknown) {
  listeners.get(event)?.(payload);
}

describe("useOnlineTttGame", () => {
  beforeEach(() => {
    listeners.clear();
    socketMock.on.mockClear();
    socketMock.connect.mockClear();
    socketMock.disconnect.mockClear();
    socketMock.removeAllListeners.mockClear();
    socketMock.emit.mockClear();
  });

  it("connects when enabled and exposes lobby state", () => {
    const { result } = renderHook(() => useOnlineTttGame(true));

    expect(socketMock.connect).toHaveBeenCalled();
    expect(result.current.showLobby).toBe(true);
    expect(result.current.mode).toBe("multiplayer");
  });

  it("maps queue and room events into the view model", () => {
    const { result } = renderHook(() => useOnlineTttGame(true));

    act(() => {
      emit(SERVER_EVENTS.CONNECTED, { userId: 1, username: "alice" });
    });

    act(() => {
      emit(SERVER_EVENTS.QUEUE_JOINED, { position: 1 });
    });

    expect(result.current.queuePosition).toBe(1);
    expect(result.current.message).toContain("Finding opponent");

    act(() => {
      emit(SERVER_EVENTS.MATCH_FOUND, {
        room: {
          id: "room-1",
          board: Array(9).fill(null),
          currentTurn: "X",
          status: "IN_PROGRESS",
          winner: null,
          mode: "queue",
          players: [
            { userId: 1, username: "alice", symbol: "X" },
            { userId: 2, username: "bob", symbol: "O" },
          ],
        },
      });
    });

    expect(result.current.showBoard).toBe(true);
    expect(result.current.canPlay).toBe(true);
    expect(result.current.mySymbol).toBe("X");
  });

  it("emits makeMove when clicking a valid cell", () => {
    const { result } = renderHook(() => useOnlineTttGame(true));

    act(() => {
      emit(SERVER_EVENTS.CONNECTED, { userId: 1, username: "alice" });
      emit(SERVER_EVENTS.GAME_STARTED, {
        room: {
          id: "room-1",
          board: Array(9).fill(null),
          currentTurn: "X",
          status: "IN_PROGRESS",
          winner: null,
          mode: "queue",
          players: [
            { userId: 1, username: "alice", symbol: "X" },
            { userId: 2, username: "bob", symbol: "O" },
          ],
        },
      });
    });

    act(() => {
      result.current.onCellClick(4);
    });

    expect(socketMock.emit).toHaveBeenCalledWith("makeMove", {
      roomId: "room-1",
      cellIndex: 4,
    });
  });
});
