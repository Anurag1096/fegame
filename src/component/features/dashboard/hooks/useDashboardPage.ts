import { useRouter } from "next/router";
import { useLogoutMutation } from "@/component/features/auth/hooks/useAuthSession";
import { getGameById, listGames } from "@/lib/games/gameCatalog";
import { canNavigateToGame, getGamePath } from "@/lib/games/gameNavigation";
import { useRequireAuth } from "@/hooks/useRequireAuth";
import { DashboardPageCopy } from "../types";

const COPY: DashboardPageCopy = {
  pageTitle: "Dashboard",
  welcomeTemplate: "Welcome back, {username}.",
  hint: "Select a game to open its window.",
  loadingMessage: "Loading dashboard...",
};

export function useDashboardPage() {
  const router = useRouter();
  const { user, isReady } = useRequireAuth();
  const logoutMutation = useLogoutMutation();
  const games = listGames();

  async function handleLogout() {
    await logoutMutation.mutateAsync();
    await router.replace("/login");
  }

  function handleSelectGame(gameId: string) {
    const game = getGameById(gameId);
    if (!game || !canNavigateToGame(game)) {
      return;
    }

    void router.push(getGamePath(gameId));
  }

  const welcome = user
    ? COPY.welcomeTemplate.replace("{username}", user.username)
    : "";

  return {
    user,
    isReady,
    isLoggingOut: logoutMutation.isPending,
    games,
    handleLogout,
    handleSelectGame,
    copy: {
      ...COPY,
      welcome,
    },
  };
}
