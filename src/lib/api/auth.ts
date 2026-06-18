import { AuthUser, AuthUserResponse } from "@/lib/auth/types";
import { getJson, postJson } from "./client";

export type LoginRequest = {
  userName: string;
  password: string;
};

export type SignupRequest = {
  username: string;
  email: string;
  password: string;
};

export function login(request: LoginRequest) {
  return postJson<AuthUserResponse>("/auth/login", request);
}

export function signup(request: SignupRequest) {
  return postJson<AuthUserResponse>("/auth/signup", request);
}

export function getMe() {
  return getJson<AuthUser>("/auth/me");
}

export function refreshSession() {
  return postJson<AuthUserResponse>("/auth/refresh", {});
}

export function logout() {
  return postJson<{ message: string }>("/auth/logout", {});
}
