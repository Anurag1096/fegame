import { useCallback, useEffect, useRef } from "react";
import type { Socket } from "socket.io-client";
import { createGameSocket } from "@/socket/socket";
import {
  CLIENT_EVENTS,
  ConnectedPayload,
  GameOverPayload,
  QueueJoinedPayload,
  RoomEventPayload,
  RoomSnapshot,
  SERVER_EVENTS,
  SocketErrorPayload,
} from "../types/socket.types";

export type TttSocketHandlers = {
  onConnected: (payload: ConnectedPayload) => void;
  onRoomJoined: (room: RoomSnapshot) => void;
  onOpponentJoined: (room: RoomSnapshot) => void;
  onGameStarted: (room: RoomSnapshot) => void;
  onGameUpdate: (room: RoomSnapshot) => void;
  onGameOver: (payload: GameOverPayload) => void;
  onQueueJoined: (payload: QueueJoinedPayload) => void;
  onMatchFound: (room: RoomSnapshot) => void;
  onOpponentDisconnected: (room: RoomSnapshot) => void;
  onError: (payload: SocketErrorPayload) => void;
  onDisconnect: () => void;
};

export function useTttSocket(handlers: TttSocketHandlers, enabled: boolean) {
  const handlersRef = useRef(handlers);
  handlersRef.current = handlers;

  const socketRef = useRef<Socket | null>(null);

  useEffect(() => {
    if (!enabled) {
      return;
    }

    const socket = createGameSocket();
    socketRef.current = socket;

    socket.on(SERVER_EVENTS.CONNECTED, (payload: ConnectedPayload) => {
      handlersRef.current.onConnected(payload);
    });

    socket.on(SERVER_EVENTS.ROOM_JOINED, (room: RoomSnapshot) => {
      handlersRef.current.onRoomJoined(room);
    });

    socket.on(SERVER_EVENTS.OPPONENT_JOINED, (payload: RoomEventPayload) => {
      handlersRef.current.onOpponentJoined(payload.room);
    });

    socket.on(SERVER_EVENTS.GAME_STARTED, (payload: RoomEventPayload) => {
      handlersRef.current.onGameStarted(payload.room);
    });

    socket.on(SERVER_EVENTS.GAME_UPDATE, (payload: RoomEventPayload) => {
      handlersRef.current.onGameUpdate(payload.room);
    });

    socket.on(SERVER_EVENTS.GAME_OVER, (payload: GameOverPayload) => {
      handlersRef.current.onGameOver(payload);
    });

    socket.on(SERVER_EVENTS.QUEUE_JOINED, (payload: QueueJoinedPayload) => {
      handlersRef.current.onQueueJoined(payload);
    });

    socket.on(SERVER_EVENTS.MATCH_FOUND, (payload: RoomEventPayload) => {
      handlersRef.current.onMatchFound(payload.room);
    });

    socket.on(SERVER_EVENTS.OPPONENT_DISCONNECTED, (payload: RoomEventPayload) => {
      handlersRef.current.onOpponentDisconnected(payload.room);
    });

    socket.on(SERVER_EVENTS.ERROR, (payload: SocketErrorPayload) => {
      handlersRef.current.onError(payload);
    });

    socket.on("disconnect", () => {
      handlersRef.current.onDisconnect();
    });

    socket.connect();

    return () => {
      socket.emit(CLIENT_EVENTS.LEAVE_QUEUE, {});
      socket.disconnect();
      socket.removeAllListeners();
      socketRef.current = null;
    };
  }, [enabled]);

  const joinQueue = useCallback(() => {
    socketRef.current?.emit(CLIENT_EVENTS.JOIN_QUEUE, {});
  }, []);

  const leaveQueue = useCallback(() => {
    socketRef.current?.emit(CLIENT_EVENTS.LEAVE_QUEUE, {});
  }, []);

  const createRoom = useCallback(() => {
    socketRef.current?.emit(CLIENT_EVENTS.CREATE_ROOM, {});
  }, []);

  const joinRoom = useCallback((roomId: string) => {
    socketRef.current?.emit(CLIENT_EVENTS.JOIN_ROOM, { roomId });
  }, []);

  const makeMove = useCallback((roomId: string, cellIndex: number) => {
    socketRef.current?.emit(CLIENT_EVENTS.MAKE_MOVE, { roomId, cellIndex });
  }, []);

  const leaveRoom = useCallback((roomId: string) => {
    socketRef.current?.emit(CLIENT_EVENTS.LEAVE_ROOM, { roomId });
  }, []);

  return {
    joinQueue,
    leaveQueue,
    createRoom,
    joinRoom,
    makeMove,
    leaveRoom,
  };
}
