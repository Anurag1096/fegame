import { Squircle } from "@squircle-js/react";
import { GAME_MODE_OPTIONS, GameMode } from "../types";
import styles from "./GameModeModal.module.css";

type GameModeModalProps = {
  isOpen: boolean;
  onSelect: (mode: GameMode) => void;
};

export default function GameModeModal({ isOpen, onSelect }: GameModeModalProps) {
  if (!isOpen) {
    return null;
  }

  return (
    <div className={styles.overlay}>
      <div
        className={styles.modal}
        role="dialog"
        aria-modal="true"
        aria-labelledby="game-mode-title"
        aria-describedby="game-mode-description"
      >
        <h2 id="game-mode-title" className={styles.title}>
          Choose game type
        </h2>
        <p id="game-mode-description" className={styles.description}>
          Pick how you want to play Tic-Tac-Toe.
        </p>

        <div className={styles.options}>
          {GAME_MODE_OPTIONS.map((option) => (
            <Squircle
              key={option.id}
              asChild
              cornerRadius={16}
              cornerSmoothing={0.75}
            >
              <button
                type="button"
                className={styles.option}
                onClick={() => onSelect(option.id)}
              >
                <span className={styles.optionTitle}>{option.title}</span>
                <span className={styles.optionDescription}>
                  {option.description}
                </span>
              </button>
            </Squircle>
          ))}
        </div>
      </div>
    </div>
  );
}
