import { useRouter } from "next/router";
import GamePage from "@/component/features/games/GamePage";

export default function GameRoutePage() {
  const router = useRouter();
  const gameId = typeof router.query.gameId === "string" ? router.query.gameId : undefined;

  if (!gameId) {
    return null;
  }

  return <GamePage gameId={gameId} />;
}
