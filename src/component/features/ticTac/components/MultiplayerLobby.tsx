import { FormEvent, useState } from "react";
import { OnlineTttGameViewModel } from "../hooks/useOnlineTttGame";
import styles from "./MultiplayerLobby.module.css";

type MultiplayerLobbyProps = Pick<
  OnlineTttGameViewModel,
  | "message"
  | "isConnecting"
  | "queuePosition"
  | "roomId"
  | "joinQueue"
  | "leaveQueue"
  | "createRoom"
  | "joinRoom"
>;

export default function MultiplayerLobby({
  message,
  isConnecting,
  queuePosition,
  roomId,
  joinQueue,
  leaveQueue,
  createRoom,
  joinRoom,
}: MultiplayerLobbyProps) {
  const [roomCode, setRoomCode] = useState("");

  function handleJoinRoom(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    joinRoom(roomCode);
  }

  return (
    <div className={styles.lobby}>
      <p className={styles.message}>{message}</p>

      {roomId && (
        <div className={styles.roomCodeBox}>
          <span className={styles.roomCodeLabel}>Room code</span>
          <code className={styles.roomCode}>{roomId}</code>
        </div>
      )}

      {queuePosition !== null ? (
        <button
          type="button"
          className={styles.secondaryButton}
          onClick={leaveQueue}
          disabled={isConnecting}
        >
          Cancel matchmaking
        </button>
      ) : (
        <>
          <button
            type="button"
            className={styles.primaryButton}
            onClick={joinQueue}
            disabled={isConnecting}
          >
            Find random opponent
          </button>

          <button
            type="button"
            className={styles.secondaryButton}
            onClick={createRoom}
            disabled={isConnecting}
          >
            Create private room
          </button>

          <form className={styles.joinForm} onSubmit={handleJoinRoom}>
            <input
              className={styles.input}
              value={roomCode}
              onChange={(event) => setRoomCode(event.target.value)}
              placeholder="Enter room code"
              aria-label="Room code"
              disabled={isConnecting}
            />
            <button
              type="submit"
              className={styles.secondaryButton}
              disabled={isConnecting}
            >
              Join room
            </button>
          </form>
        </>
      )}
    </div>
  );
}
