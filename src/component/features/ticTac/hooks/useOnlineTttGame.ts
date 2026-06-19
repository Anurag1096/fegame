import { useCallback, useMemo, useState } from "react";
import {
  buildDrawLabel,
  buildGameMessage,
  buildWinnerLabel,
  canPlayOnlineMove,
  getPlayerNames,
  mapRoomStatus,
  mapRoomToBoard,
  shouldShowOnlineBoard,
} from "../lib/mapRoomSnapshot";
import { TttGameViewModel } from "../types/game.types";
import {
  ConnectedPayload,
  GameOverPayload,
  QueueJoinedPayload,
  RoomSnapshot,
  SocketErrorPayload,
} from "../types/socket.types";
import { useTttSocket } from "./useTttSocket";

export type OnlineTttGameViewModel = TttGameViewModel & {
  isConnected: boolean;
  isConnecting: boolean;
  queuePosition: number | null;
  roomId: string | null;
  errorMessage: string | null;
  showBoard: boolean;
  showLobby: boolean;
  joinQueue: () => void;
  leaveQueue: () => void;
  createRoom: () => void;
  joinRoom: (roomId: string) => void;
};

export function useOnlineTttGame(enabled: boolean): OnlineTttGameViewModel {
  const [isConnected, setIsConnected] = useState(false);
  const [myUserId, setMyUserId] = useState<number | null>(null);
  const [room, setRoom] = useState<RoomSnapshot | null>(null);
  const [queuePosition, setQueuePosition] = useState<number | null>(null);
  const [gameOver, setGameOver] = useState<GameOverPayload | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const mySymbol =
    room && myUserId
      ? (room.players.find((player) => player.userId === myUserId)?.symbol ?? null)
      : null;

  const socketHandlers = useMemo(
    () => ({
      onConnected: (payload: ConnectedPayload) => {
        setIsConnected(true);
        setMyUserId(payload.userId);
        setErrorMessage(null);
      },
      onRoomJoined: (nextRoom: RoomSnapshot) => {
        setRoom(nextRoom);
        setQueuePosition(null);
        setGameOver(null);
        setErrorMessage(null);
      },
      onOpponentJoined: (nextRoom: RoomSnapshot) => {
        setRoom(nextRoom);
      },
      onGameStarted: (nextRoom: RoomSnapshot) => {
        setRoom(nextRoom);
        setQueuePosition(null);
        setGameOver(null);
      },
      onGameUpdate: (nextRoom: RoomSnapshot) => {
        setRoom(nextRoom);
      },
      onGameOver: (payload: GameOverPayload) => {
        setRoom(payload.room);
        setGameOver(payload);
      },
      onQueueJoined: (payload: QueueJoinedPayload) => {
        setQueuePosition(payload.position);
        setRoom(null);
        setGameOver(null);
        setErrorMessage(null);
      },
      onMatchFound: (nextRoom: RoomSnapshot) => {
        setRoom(nextRoom);
        setQueuePosition(null);
        setGameOver(null);
      },
      onOpponentDisconnected: (nextRoom: RoomSnapshot) => {
        setRoom(nextRoom);
      },
      onError: (payload: SocketErrorPayload) => {
        setErrorMessage(payload.message);
      },
      onDisconnect: () => {
        setIsConnected(false);
      },
    }),
    [],
  );

  const socket = useTttSocket(socketHandlers, enabled);

  const onCellClick = useCallback(
    (index: number) => {
      if (!room || !canPlayOnlineMove(room, mySymbol)) {
        return;
      }

      if (room.board[index]) {
        return;
      }

      socket.makeMove(room.id, index);
    },
    [room, mySymbol, socket],
  );

  const resetSession = useCallback(() => {
    if (room) {
      socket.leaveRoom(room.id);
    }

    socket.leaveQueue();
    setRoom(null);
    setQueuePosition(null);
    setGameOver(null);
    setErrorMessage(null);
  }, [room, socket]);

  const joinQueue = useCallback(() => {
    setErrorMessage(null);
    socket.joinQueue();
  }, [socket]);

  const leaveQueue = useCallback(() => {
    socket.leaveQueue();
    setQueuePosition(null);
  }, [socket]);

  const createRoom = useCallback(() => {
    setErrorMessage(null);
    socket.createRoom();
  }, [socket]);

  const joinRoom = useCallback(
    (roomId: string) => {
      const trimmedRoomId = roomId.trim();

      if (!trimmedRoomId) {
        setErrorMessage("Enter a room code to join.");
        return;
      }

      setErrorMessage(null);
      socket.joinRoom(trimmedRoomId);
    },
    [socket],
  );

  const status = mapRoomStatus(room);
  const showBoard = shouldShowOnlineBoard(room);
  const showLobby = !showBoard;
  const message = buildGameMessage(
    room,
    mySymbol,
    queuePosition,
    isConnected,
    errorMessage,
  );

  return {
    mode: "multiplayer",
    status,
    board: mapRoomToBoard(room),
    currentTurn: room?.status === "IN_PROGRESS" ? room.currentTurn : null,
    mySymbol,
    players: getPlayerNames(room),
    winnerLabel: room ? buildWinnerLabel(room, mySymbol, gameOver) : null,
    drawLabel: room ? buildDrawLabel(room) : null,
    message,
    canPlay: canPlayOnlineMove(room, mySymbol),
    onCellClick,
    onRestart: resetSession,
    isConnected,
    isConnecting: enabled && !isConnected,
    queuePosition,
    roomId: room?.id ?? null,
    errorMessage,
    showBoard,
    showLobby,
    joinQueue,
    leaveQueue,
    createRoom,
    joinRoom,
  };
}
