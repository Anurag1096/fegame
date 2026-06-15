import { AuthUser, JwtPayload } from "./types";

export function decodeAccessToken(token: string): JwtPayload | null {
  try {
    const payload = token.split(".")[1];
    if (!payload) return null;
    return JSON.parse(atob(payload)) as JwtPayload;
  } catch {
    return null;
  }
}

export function userFromToken(token: string): AuthUser | null {
  const payload = decodeAccessToken(token);
  if (!payload?.sub || !payload.userName) return null;
  return { id: payload.sub, username: payload.userName };
}

export function isTokenExpired(token: string): boolean {
  const payload = decodeAccessToken(token);
  if (!payload?.exp) return true;
  return payload.exp * 1000 <= Date.now();
}
