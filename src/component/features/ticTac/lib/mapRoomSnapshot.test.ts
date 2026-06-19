import { describe, expect, it } from "vitest";
import {
  buildWinnerLabel,
  canPlayOnlineMove,
  mapRoomStatus,
  shouldShowOnlineBoard,
} from "./mapRoomSnapshot";
import { RoomSnapshot } from "../types/socket.types";

const baseRoom: RoomSnapshot = {
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
};

describe("mapRoomSnapshot", () => {
  it("maps room status to view status", () => {
    expect(mapRoomStatus({ ...baseRoom, status: "WAITING" })).toBe("waiting");
    expect(mapRoomStatus({ ...baseRoom, status: "IN_PROGRESS" })).toBe("playing");
    expect(mapRoomStatus({ ...baseRoom, status: "FINISHED" })).toBe("finished");
    expect(mapRoomStatus(null)).toBe("idle");
  });

  it("allows moves only on your turn during an active game", () => {
    expect(canPlayOnlineMove(baseRoom, "X")).toBe(true);
    expect(canPlayOnlineMove(baseRoom, "O")).toBe(false);
    expect(canPlayOnlineMove({ ...baseRoom, status: "WAITING" }, "X")).toBe(false);
  });

  it("shows the board once the game starts or ends", () => {
    expect(shouldShowOnlineBoard({ ...baseRoom, status: "WAITING" })).toBe(false);
    expect(shouldShowOnlineBoard({ ...baseRoom, status: "IN_PROGRESS" })).toBe(true);
    expect(shouldShowOnlineBoard({ ...baseRoom, status: "FINISHED" })).toBe(true);
  });

  it("builds a personal win message", () => {
    const finishedRoom: RoomSnapshot = {
      ...baseRoom,
      status: "FINISHED",
      winner: "X",
    };

    expect(buildWinnerLabel(finishedRoom, "X", null)).toBe("You win!");
    expect(buildWinnerLabel(finishedRoom, "O", null)).toBe("alice wins!");
  });
});
