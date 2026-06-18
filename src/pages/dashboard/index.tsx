import { useRouter } from "next/router";
import { Geist } from "next/font/google";
import DashboardLayout from "@/component/features/dashboard/DashboardLayout";
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

  async function handleLogout() {
    await logout();
    router.replace("/login");
  }

  if (!isReady || !user) {
    return (
      <div className={`${styles.loadingPage} ${geistSans.variable}`}>
        <p className={styles.loading}>Loading dashboard...</p>
      </div>
    );
  }

  return (
    <div className={geistSans.variable}>
      <DashboardLayout username={user.username} onLogout={handleLogout}>
        <h1 className={styles.title}>Dashboard</h1>
        <p className={styles.welcome}>Welcome back, {user.username}.</p>
        <p className={styles.hint}>Matchmaking and rooms will live here next.</p>
      </DashboardLayout>
    </div>
  );
}
