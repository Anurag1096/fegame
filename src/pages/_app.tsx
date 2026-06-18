import { useEffect } from "react";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { useAuthStore } from "@/stores/authStore";

export default function App({ Component, pageProps }: AppProps) {
  const hydrate = useAuthStore((state) => state.hydrate);

  useEffect(() => {
    void hydrate();
  }, [hydrate]);

  return <Component {...pageProps} />;
}
