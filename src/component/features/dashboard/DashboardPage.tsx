import Head from "next/head";
import { Geist } from "next/font/google";
import DashboardLayout from "./DashboardLayout";
import GameWindowGrid from "./components/GameWindowGrid";
import { useDashboardPage } from "./hooks/useDashboardPage";
import styles from "./DashboardPage.module.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export default function DashboardPage() {
  const {
    user,
    isReady,
    isLoggingOut,
    games,
    handleLogout,
    handleSelectGame,
    copy,
  } = useDashboardPage();

  if (!isReady || !user) {
    return (
      <>
        <Head>
          <title>{`${copy.pageTitle} | FeGame`}</title>
        </Head>
        <div className={`${styles.loadingPage} ${geistSans.variable}`}>
          <p className={styles.loading}>{copy.loadingMessage}</p>
        </div>
      </>
    );
  }

  return (
    <>
      <Head>
        <title>{`${copy.pageTitle} | FeGame`}</title>
      </Head>
      <div className={geistSans.variable}>
        <DashboardLayout
          username={user.username}
          onLogout={handleLogout}
          isLoggingOut={isLoggingOut}
        >
          <h1 className={styles.title}>{copy.pageTitle}</h1>
          <p className={styles.welcome}>{copy.welcome}</p>
          <p className={styles.hint}>{copy.hint}</p>
          <GameWindowGrid games={games} onSelectGame={handleSelectGame} />
        </DashboardLayout>
      </div>
    </>
  );
}
