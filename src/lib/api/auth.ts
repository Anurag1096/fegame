import { AuthResponse } from "@/lib/auth/types";
import { postJson } from "./client";

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
  return postJson<AuthResponse>("/auth/login", request);
}

export function signup(request: SignupRequest) {
  return postJson<AuthResponse>("/auth/signup", request);
}
