import { io } from "socket.io-client";

export let socket;

export const initiateSocketConnection = () => {
  socket = io("http://localhost:5000/");
};

export const disconnectSocket = () => {
  if (socket) socket.disconnect();
};