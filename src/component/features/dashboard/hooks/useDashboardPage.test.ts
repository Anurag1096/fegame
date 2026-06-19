import { renderHook } from "@testing-library/react";
import { describe, expect, it, vi, beforeEach } from "vitest";
import { canNavigateToGame, getGamePath } from "@/lib/games/gameNavigation";
import { getGameById, listGames } from "@/lib/games/gameCatalog";

const pushMock = vi.fn();
const replaceMock = vi.fn();

vi.mock("next/router", () => ({
  useRouter: () => ({
    push: pushMock,
    replace: replaceMock,
  }),
}));

vi.mock("@/hooks/useRequireAuth", () => ({
  useRequireAuth: () => ({
    user: { id: 1, username: "player1" },
    isReady: true,
  }),
}));

vi.mock("@/component/features/auth/hooks/useAuthSession", () => ({
  useLogoutMutation: () => ({
    mutateAsync: vi.fn(),
    isPending: false,
  }),
}));

describe("useDashboardPage navigation helpers", () => {
  beforeEach(() => {
    pushMock.mockClear();
  });

  it("exposes the configured game catalog", () => {
    expect(listGames().length).toBeGreaterThan(0);
    expect(getGameById("tic-tac-toe")?.available).toBe(true);
  });

  it("builds routes for available games", () => {
    const game = getGameById("tic-tac-toe");

    expect(game).toBeDefined();
    expect(getGamePath(game!.id)).toBe("/games/tic-tac-toe");
    expect(canNavigateToGame(game!)).toBe(true);
  });

  it("blocks unavailable games", () => {
    const game = getGameById("chess");

    expect(game).toBeDefined();
    expect(canNavigateToGame(game!)).toBe(false);
  });
});

describe("useDashboardPage", () => {
  beforeEach(() => {
    pushMock.mockClear();
  });

  it("navigates when selecting an available game", async () => {
    const { useDashboardPage } = await import("./useDashboardPage");
    const { result } = renderHook(() => useDashboardPage());

    result.current.handleSelectGame("tic-tac-toe");

    expect(pushMock).toHaveBeenCalledWith("/games/tic-tac-toe");
  });

  it("does not navigate for unavailable games", async () => {
    const { useDashboardPage } = await import("./useDashboardPage");
    const { result } = renderHook(() => useDashboardPage());

    result.current.handleSelectGame("chess");

    expect(pushMock).not.toHaveBeenCalled();
  });
});
