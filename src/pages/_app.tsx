import { useState } from "react";
import { QueryClientProvider } from "@tanstack/react-query";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { useAuthSession } from "@/component/features/auth/hooks/useAuthSession";
import { createQueryClient } from "@/lib/query/queryClient";

function AuthSessionBootstrap() {
  useAuthSession();
  return null;
}

export default function App({ Component, pageProps }: AppProps) {
  const [queryClient] = useState(() => createQueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      <AuthSessionBootstrap />
      <Component {...pageProps} />
    </QueryClientProvider>
  );
}
