import { Squircle } from "@squircle-js/react";
import { TttGameViewModel } from "../types/game.types";
import styles from "../style.module.css";

type TicTacBoardViewProps = Pick<
  TttGameViewModel,
  | "board"
  | "winnerLabel"
  | "drawLabel"
  | "canPlay"
  | "onCellClick"
  | "onRestart"
>;

export default function TicTacBoardView({
  board,
  winnerLabel,
  drawLabel,
  canPlay,
  onCellClick,
  onRestart,
}: TicTacBoardViewProps) {
  return (
    <>
      <Squircle
        cornerRadius={25}
        cornerSmoothing={0.7}
        className={styles.grid}
      >
        {board.map((cell, index) => (
          <Squircle
            cornerRadius={25}
            cornerSmoothing={0.7}
            key={`cell-${index}`}
            onClick={() => {
              if (canPlay) {
                onCellClick(index);
              }
            }}
          >
            {cell ?? " "}
          </Squircle>
        ))}
      </Squircle>

      <div>
        <button type="button" onClick={onRestart}>
          Restart
        </button>
      </div>

      <div>{winnerLabel ?? " "}</div>
      <div>{drawLabel ?? " "}</div>
    </>
  );
}
