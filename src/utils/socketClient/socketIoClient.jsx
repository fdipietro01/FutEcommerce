import { io } from "socket.io-client";
const socket = io("http://localhost:8081", {
  autoConnect: false,
});

export default socket;
