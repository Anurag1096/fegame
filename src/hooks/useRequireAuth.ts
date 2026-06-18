import { useEffect } from "react";
import { useRouter } from "next/router";
import { useAuthSession } from "@/component/features/auth/hooks/useAuthSession";

export function useRequireAuth() {
  const router = useRouter();
  const { data: user, isFetched, isSuccess } = useAuthSession();

  useEffect(() => {
    if (isFetched && !isSuccess) {
      router.replace("/login");
    }
  }, [isFetched, isSuccess, router]);

  return {
    user: user ?? null,
    isReady: isSuccess && Boolean(user),
  };
}
