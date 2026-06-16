import { ReactNode } from "react";

export type DashboardLayoutProps = {
  username: string;
  onLogout: () => void;
  children: ReactNode;
};
