import { useEffect } from "react";
import { useRouter } from "next/router";
import { useAuthStore } from "@/stores/authStore";

export function useRequireAuth() {
  const router = useRouter();
  const isHydrated = useAuthStore((state) => state.isHydrated);
  const user = useAuthStore((state) => state.user);

  useEffect(() => {
    if (isHydrated && !user) {
      router.replace("/login");
    }
  }, [isHydrated, user, router]);

  return {
    user,
    isReady: isHydrated && Boolean(user),
  };
}
