import { useEffect } from "react";
import { useRouter } from "next/router";
import { useAuthStore } from "@/stores/authStore";

export function useRequireAuth() {
  const router = useRouter();
  const isHydrated = useAuthStore((state) => state.isHydrated);
  const accessToken = useAuthStore((state) => state.accessToken);
  const user = useAuthStore((state) => state.user);

  useEffect(() => {
    if (isHydrated && !accessToken) {
      router.replace("/login");
    }
  }, [isHydrated, accessToken, router]);

  return {
    user,
    isReady: isHydrated && Boolean(accessToken),
  };
}
