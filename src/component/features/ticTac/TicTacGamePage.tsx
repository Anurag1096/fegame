import styles from "./TicTacGamePage.module.css";
import TicTacToeComp from "./index";
import GameModeModal from "./components/GameModeModal";
import MultiplayerLobby from "./components/MultiplayerLobby";
import TicTacBoardView from "./components/TicTacBoardView";
import { useGameModeModal } from "./hooks/useGameModeModal";
import { useOnlineTttGame } from "./hooks/useOnlineTttGame";

export default function TicTacGamePage() {
  const { isOpen, selectedMode, selectMode, openModal } = useGameModeModal();
  const onlineGame = useOnlineTttGame(selectedMode === "multiplayer");

  return (
    <>
      <GameModeModal isOpen={isOpen} onSelect={selectMode} />

      <section className={styles.panel} aria-label="Tic-Tac-Toe game window">
        <h2 className={styles.panelTitle}>Tic-Tac-Toe</h2>

        {selectedMode === "offline" && (
          <>
            <TicTacToeComp />
            <div className={styles.changeMode}>
              <button type="button" onClick={openModal}>
                Change game type
              </button>
            </div>
          </>
        )}

        {selectedMode === "multiplayer" && (
          <>
            {onlineGame.showLobby && (
              <MultiplayerLobby
                message={onlineGame.message}
                isConnecting={onlineGame.isConnecting}
                queuePosition={onlineGame.queuePosition}
                roomId={onlineGame.roomId}
                joinQueue={onlineGame.joinQueue}
                leaveQueue={onlineGame.leaveQueue}
                createRoom={onlineGame.createRoom}
                joinRoom={onlineGame.joinRoom}
              />
            )}

            {onlineGame.showBoard && (
              <>
                <p className={styles.statusMessage}>{onlineGame.message}</p>
                <TicTacBoardView
                  board={onlineGame.board}
                  winnerLabel={onlineGame.winnerLabel}
                  drawLabel={onlineGame.drawLabel}
                  canPlay={onlineGame.canPlay}
                  onCellClick={onlineGame.onCellClick}
                  onRestart={onlineGame.onRestart}
                />
              </>
            )}

            <div className={styles.changeMode}>
              <button type="button" onClick={openModal}>
                Change game type
              </button>
            </div>
          </>
        )}
      </section>
    </>
  );
}
