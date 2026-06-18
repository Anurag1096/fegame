import { create } from "zustand";
import * as authApi from "@/lib/api/auth";
import { AuthUser } from "@/lib/auth/types";

const LEGACY_AUTH_STORAGE_KEY = "fegame-auth";

type AuthState = {
  user: AuthUser | null;
  isHydrated: boolean;
  login: (credentials: authApi.LoginRequest) => Promise<void>;
  signup: (credentials: authApi.SignupRequest) => Promise<void>;
  logout: () => Promise<void>;
  hydrate: () => Promise<void>;
};

function clearLegacyTokenStorage() {
  if (typeof window === "undefined") {
    return;
  }

  localStorage.removeItem(LEGACY_AUTH_STORAGE_KEY);
}

export const useAuthStore = create<AuthState>((set, get) => ({
  user: null,
  isHydrated: false,

  login: async (credentials) => {
    const { user } = await authApi.login(credentials);
    clearLegacyTokenStorage();
    set({ user });
  },

  signup: async (credentials) => {
    const { user } = await authApi.signup(credentials);
    clearLegacyTokenStorage();
    set({ user });
  },

  logout: async () => {
    try {
      await authApi.logout();
    } finally {
      clearLegacyTokenStorage();
      set({ user: null });
    }
  },

  hydrate: async () => {
    if (get().isHydrated) {
      return;
    }

    clearLegacyTokenStorage();

    try {
      const user = await authApi.getMe();
      set({ user, isHydrated: true });
      return;
    } catch {
      try {
        const { user } = await authApi.refreshSession();
        set({ user, isHydrated: true });
        return;
      } catch {
        set({ user: null, isHydrated: true });
      }
    }
  },
}));
