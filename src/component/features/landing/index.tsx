import Link from "next/link";
import { Squircle } from "@squircle-js/react";
import styles from "./Landing.module.css";

const PREVIEW_BOARD = ["X", "", "O", "", "X", "", "O", "", "X"] as const;

export default function Landing() {
  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <span className={styles.brand}>FeGame</span>
      </header>

      <main className={styles.main}>
        <section className={styles.hero}>
          <span className={styles.eyebrow}>Real-time multiplayer</span>
          <h1 className={styles.title}>Play Tic-Tac-Toe against anyone, anywhere.</h1>
          <p className={styles.subtitle}>
            Match instantly, invite friends, and compete on a live board. Sign in
            to enter the dashboard and start your next game.
          </p>

          <div className={styles.actions}>
            <Link href="/login" className={styles.buttonLink}>
              <Squircle
                cornerRadius={16}
                cornerSmoothing={0.8}
                className={`${styles.button} ${styles.buttonPrimary}`}
              >
                Log in
              </Squircle>
            </Link>
            <Link href="/signup" className={styles.buttonLink}>
              <Squircle
                cornerRadius={16}
                cornerSmoothing={0.8}
                className={`${styles.button} ${styles.buttonSecondary}`}
              >
                Sign up
              </Squircle>
            </Link>
          </div>

          <div className={styles.features}>
            <div className={styles.feature}>
              <span className={styles.featureDot} />
              Quick matchmaking queue
            </div>
            <div className={styles.feature}>
              <span className={styles.featureDot} />
              Private invite rooms
            </div>
            <div className={styles.feature}>
              <span className={styles.featureDot} />
              Live game updates
            </div>
          </div>
        </section>

        <Squircle
          cornerRadius={28}
          cornerSmoothing={0.75}
          className={styles.previewCard}
        >
          <p className={styles.previewLabel}>Live board preview</p>
          <div className={styles.board}>
            {PREVIEW_BOARD.map((mark, index) => (
              <Squircle
                key={index}
                cornerRadius={18}
                cornerSmoothing={0.7}
                className={`${styles.cell} ${
                  mark === "X" ? styles.cellX : mark === "O" ? styles.cellO : ""
                }`}
              >
                {mark}
              </Squircle>
            ))}
          </div>
        </Squircle>
      </main>

      <footer className={styles.footer}>
        Built for fast, competitive online play.
      </footer>
    </div>
  );
}
