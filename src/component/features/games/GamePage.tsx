import Head from "next/head";
import { Geist } from "next/font/google";
import DashboardLayout from "@/component/features/dashboard/DashboardLayout";
import { useGamePage } from "./hooks/useGamePage";
import styles from "./GamePage.module.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

type GamePageProps = {
  gameId: string;
};

export default function GamePage({ gameId }: GamePageProps) {
  const { user, isReady, isLoggingOut, game, GameComponent, handleLogout } =
    useGamePage(gameId);

  if (!isReady || !user || !game || !GameComponent) {
    return (
      <div className={`${styles.loadingPage} ${geistSans.variable}`}>
        <p className={styles.loading}>Loading game...</p>
      </div>
    );
  }

  return (
    <>
      <Head>
        <title>{`${game.title} | FeGame`}</title>
      </Head>
      <div className={geistSans.variable}>
        <DashboardLayout
          username={user.username}
          onLogout={handleLogout}
          isLoggingOut={isLoggingOut}
        >
          <h1 className={styles.title}>{game.title}</h1>
          <p className={styles.subtitle}>{game.description}</p>
          <GameComponent />
        </DashboardLayout>
      </div>
    </>
  );
}
