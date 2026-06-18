import { io, Socket } from "socket.io-client";
import { SOCKET_IO_PATH } from "@/lib/api/client";

export function createGameSocket(): Socket {
  return io("/game", {
    path: SOCKET_IO_PATH,
    withCredentials: true,
    autoConnect: false,
  });
}
