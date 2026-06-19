import { Squircle } from "@squircle-js/react";
import { GameDefinition } from "@/lib/games/types";
import styles from "./GameWindowCard.module.css";

type GameWindowCardProps = {
  game: GameDefinition;
  onSelect: (gameId: string) => void;
};

export default function GameWindowCard({ game, onSelect }: GameWindowCardProps) {
  return (
    <Squircle
      asChild
      cornerRadius={20}
      cornerSmoothing={0.75}
    >
      <button
        type="button"
        className={styles.card}
        disabled={!game.available}
        onClick={() => onSelect(game.id)}
        aria-label={`Open ${game.title}`}
      >
        <div className={styles.titleRow}>
          <span className={styles.title}>{game.title}</span>
          <span
            className={`${styles.badge} ${game.available ? "" : styles.badgeSoon}`}
          >
            {game.available ? game.playersLabel : "Coming soon"}
          </span>
        </div>
        <p className={styles.description}>{game.description}</p>
      </button>
    </Squircle>
  );
}
