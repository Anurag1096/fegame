import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import * as authApi from "@/lib/api/auth";
import { clearLegacyTokenStorage } from "@/lib/auth/legacyStorage";
import { authKeys } from "@/lib/query/queryKeys";

const SESSION_STALE_TIME_MS = 5 * 60_000;

/** ViewModel: current session from GET /auth/me (cookies + auto-refresh in client.ts) */
export function useAuthSession() {
  return useQuery({
    queryKey: authKeys.me(),
    queryFn: () => authApi.getMe(),
    retry: false,
    staleTime: SESSION_STALE_TIME_MS,
  });
}

/** ViewModel: login mutation — updates session cache on success */
export function useLoginMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: authApi.login,
    onSuccess: ({ user }) => {
      clearLegacyTokenStorage();
      queryClient.setQueryData(authKeys.me(), user);
    },
  });
}

/** ViewModel: signup mutation — updates session cache on success */
export function useSignupMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: authApi.signup,
    onSuccess: ({ user }) => {
      clearLegacyTokenStorage();
      queryClient.setQueryData(authKeys.me(), user);
    },
  });
}

/** ViewModel: logout mutation — clears session cache */
export function useLogoutMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: authApi.logout,
    onSettled: () => {
      clearLegacyTokenStorage();
      queryClient.removeQueries({ queryKey: authKeys.all });
    },
  });
}
