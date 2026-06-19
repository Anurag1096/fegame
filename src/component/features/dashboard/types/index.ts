import { ReactNode } from "react";

export type DashboardLayoutProps = {
  username: string;
  onLogout: () => void;
  isLoggingOut?: boolean;
  children: ReactNode;
};

export type DashboardPageCopy = {
  pageTitle: string;
  welcomeTemplate: string;
  hint: string;
  loadingMessage: string;
};
