import { create } from "zustand";
import { persist } from "zustand/middleware";
import * as authApi from "@/lib/api/auth";
import { AuthUser } from "@/lib/auth/types";
import { isTokenExpired, userFromToken } from "@/lib/auth/token";

type AuthState = {
  accessToken: string | null;
  user: AuthUser | null;
  isHydrated: boolean;
  login: (credentials: authApi.LoginRequest) => Promise<void>;
  signup: (credentials: authApi.SignupRequest) => Promise<void>;
  logout: () => void;
  hydrate: () => void;
};

function resolveSession(accessToken: string | null): Pick<AuthState, "accessToken" | "user"> {
  if (!accessToken || isTokenExpired(accessToken)) {
    return { accessToken: null, user: null };
  }

  const user = userFromToken(accessToken);
  if (!user) {
    return { accessToken: null, user: null };
  }

  return { accessToken, user };
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      accessToken: null,
      user: null,
      isHydrated: false,

      login: async (credentials) => {
        const { accessToken } = await authApi.login(credentials);
        set(resolveSession(accessToken));
      },

      signup: async (credentials) => {
        const { accessToken } = await authApi.signup(credentials);
        set(resolveSession(accessToken));
      },

      logout: () => {
        set({ accessToken: null, user: null });
      },

      hydrate: () => {
        const { accessToken } = useAuthStore.getState();
        set({ ...resolveSession(accessToken), isHydrated: true });
      },
    }),
    {
      name: "fegame-auth",
      partialize: (state) => ({ accessToken: state.accessToken }),
      onRehydrateStorage: () => (state) => {
        state?.hydrate();
      },
    },
  ),
);
