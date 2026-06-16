import SideBar from "@/component/features/sideBar";
import MenuIcon from "@/component/features/sideBar/icons/MenuIcon";
import { useSidebar } from "@/component/features/sideBar/hooks/useSidebar";
import { DashboardLayoutProps } from "./types";
import styles from "./DashboardLayout.module.css";

export default function DashboardLayout({
  username,
  onLogout,
  children,
}: DashboardLayoutProps) {
  const { isOpen, toggle, close } = useSidebar();

  return (
    <div className={styles.shell}>
      <SideBar
        isOpen={isOpen}
        username={username}
        onClose={close}
        onLogout={onLogout}
      />

      {isOpen && (
        <button
          type="button"
          className={styles.backdrop}
          aria-label="Close menu"
          onClick={close}
        />
      )}

      <div className={styles.main}>
        <header className={styles.topBar}>
          <button
            type="button"
            className={styles.menuButton}
            aria-label={isOpen ? "Close menu" : "Open menu"}
            aria-expanded={isOpen}
            onClick={toggle}
          >
            <MenuIcon isOpen={isOpen} />
          </button>
          <span className={styles.topBarTitle}>Dashboard</span>
        </header>

        <div className={styles.content}>{children}</div>
      </div>
    </div>
  );
}
