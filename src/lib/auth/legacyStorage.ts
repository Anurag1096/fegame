const LEGACY_AUTH_STORAGE_KEY = "fegame-auth";

export function clearLegacyTokenStorage() {
  if (typeof window === "undefined") {
    return;
  }

  localStorage.removeItem(LEGACY_AUTH_STORAGE_KEY);
}
