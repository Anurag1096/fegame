import { useEffect } from "react";
import { useRouter } from "next/router";
import { useLogoutMutation } from "@/component/features/auth/hooks/useAuthSession";
import { getGameById } from "@/lib/games/gameCatalog";
import { getGamePageComponent } from "@/lib/games/gameRegistry";
import { canNavigateToGame } from "@/lib/games/gameNavigation";
import { useRequireAuth } from "@/hooks/useRequireAuth";

export function useGamePage(gameId: string | undefined) {
  const router = useRouter();
  const { user, isReady } = useRequireAuth();
  const logoutMutation = useLogoutMutation();

  const game = gameId ? getGameById(gameId) : undefined;
  const GameComponent = game ? getGamePageComponent(game.id) : undefined;
  const isValidGame = Boolean(game && GameComponent && canNavigateToGame(game));

  useEffect(() => {
    if (!isReady) {
      return;
    }

    if (!gameId || !isValidGame) {
      void router.replace("/dashboard");
    }
  }, [gameId, isReady, isValidGame, router]);

  async function handleLogout() {
    await logoutMutation.mutateAsync();
    await router.replace("/login");
  }

  return {
    user,
    isReady: isReady && isValidGame,
    isLoggingOut: logoutMutation.isPending,
    game,
    GameComponent,
    handleLogout,
  };
}
