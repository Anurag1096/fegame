import TicTacBoardView from "./components/TicTacBoardView";
import { useOfflineTttGame } from "./hooks/useOfflineTttGame";

export default function TicTacToeComp() {
  const game = useOfflineTttGame();

  return <TicTacBoardView {...game} />;
}
