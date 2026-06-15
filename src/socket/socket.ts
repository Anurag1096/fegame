import { io, Socket } from "socket.io-client";
import { API_URL } from "@/lib/api/client";

export function createGameSocket(accessToken: string): Socket {
  return io(`${API_URL}/game`, {
    auth: { token: accessToken },
    autoConnect: false,
  });
}
