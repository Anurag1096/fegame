import Link from "next/link";
import { useRouter } from "next/router";
import { Geist } from "next/font/google";
import { useAuthStore } from "@/stores/authStore";
import { useRequireAuth } from "@/hooks/useRequireAuth";
import styles from "./Dashboard.module.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export default function Dashboard() {
  const router = useRouter();
  const { user, isReady } = useRequireAuth();
  const logout = useAuthStore((state) => state.logout);

  function handleLogout() {
    logout();
    router.replace("/login");
  }

  if (!isReady) {
    return (
      <div className={`${styles.page} ${geistSans.variable}`}>
        <p className={styles.loading}>Loading dashboard...</p>
      </div>
    );
  }

  return (
    <div className={`${styles.page} ${geistSans.variable}`}>
      <header className={styles.header}>
        <h1 className={styles.title}>Dashboard</h1>
        <button type="button" className={styles.logout} onClick={handleLogout}>
          Log out
        </button>
      </header>
      <p className={styles.welcome}>Welcome, {user?.username}.</p>
      <p className={styles.hint}>Matchmaking and rooms will live here next.</p>
      <Link href="/" className={styles.link}>
        Back to home
      </Link>
    </div>
  );
}
