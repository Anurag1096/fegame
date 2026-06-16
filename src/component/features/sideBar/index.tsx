import Link from "next/link";
import { useRouter } from "next/router";
import styles from "./SideBar.module.css";

type SideBarProps = {
  isOpen: boolean;
  username: string;
  onClose: () => void;
  onLogout: () => void;
};

const NAV_ITEMS = [
  { href: "/dashboard", label: "Dashboard" },
  { href: "/", label: "Home" },
] as const;

export default function SideBar({
  isOpen,
  username,
  onClose,
  onLogout,
}: SideBarProps) {
  const router = useRouter();

  function handleNavClick() {
    onClose();
  }

  return (
    <aside
      className={`${styles.sidebar} ${isOpen ? styles.sidebarOpen : ""}`}
    >
      <div className={styles.brand}>FeGame</div>
      <p className={styles.user}>Welcome, {username}</p>

      <nav className={styles.nav} aria-label="Dashboard navigation">
        {NAV_ITEMS.map((item) => {
          const isActive = router.pathname === item.href;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`${styles.link} ${isActive ? styles.linkActive : ""}`}
              onClick={handleNavClick}
            >
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className={styles.footer}>
        <button type="button" className={styles.logout} onClick={onLogout}>
          Log out
        </button>
      </div>
    </aside>
  );
}
