import { io } from "socket.io-client";
import BASE_URI from "../uri.config";

// Retrieve the token from localStorage
const token = localStorage.getItem("authToken");

const socket = io(`${BASE_URI}`, {
  query: { token }, // Pass the token in the query
  transports: ["websocket"], // Ensure WebSocket connection (optional)
});

export default socket;
