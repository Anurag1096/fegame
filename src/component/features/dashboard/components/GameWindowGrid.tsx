import { GameDefinition } from "@/lib/games/types";
import GameWindowCard from "./GameWindowCard";
import styles from "./GameWindowGrid.module.css";

type GameWindowGridProps = {
  games: GameDefinition[];
  onSelectGame: (gameId: string) => void;
};

export default function GameWindowGrid({ games, onSelectGame }: GameWindowGridProps) {
  return (
    <div className={styles.grid} role="list" aria-label="Available games">
      {games.map((game) => (
        <div key={game.id} role="listitem">
          <GameWindowCard game={game} onSelect={onSelectGame} />
        </div>
      ))}
    </div>
  );
}
