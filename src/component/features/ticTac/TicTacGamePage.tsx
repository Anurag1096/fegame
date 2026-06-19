import styles from "./TicTacGamePage.module.css";

export default function TicTacGamePage() {
  return (
    <section className={styles.panel} aria-label="Tic-Tac-Toe game window">
      <h2 className={styles.panelTitle}>Tic-Tac-Toe</h2>
      <p className={styles.panelText}>
        Matchmaking and live board will connect here next. You opened the correct
        game window from the dashboard.
      </p>
    </section>
  );
}
