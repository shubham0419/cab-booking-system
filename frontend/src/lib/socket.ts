import { io, Socket } from "socket.io-client";

const SOCKET_URL = process.env.NEXT_PUBLIC_SOCKET_URL || "http://localhost:4000";

let socket: Socket | null = null;

export function getSocket() {
  if (!socket) {
    socket = io(SOCKET_URL, {
      withCredentials: true,
      transports: ["websocket"],
    });

    socket.on("connect", () => {
      // You can handle connection logic here
      console.log("Connected to socket server:", socket?.id);
    });

    socket.on("disconnect", () => {
      console.log("Disconnected from socket server");
    });

    socket.on("connect_error", (err) => {
      console.error("Socket connection error:", err);
    });
  }
  return socket;
}

// Helper to emit only after connection is established
export function sendMessage(eventName: string, data: any) {
  const s = getSocket();
  if (s.connected) {
    console.log(eventName);
    s.emit(eventName, data);
  } else {
    s.once("connect", () => {
      s.emit(eventName, data);
    });
  }
}

export function onMessage(eventName: string, callback: (data: any) => void) {
  getSocket().on(eventName, callback);
}


