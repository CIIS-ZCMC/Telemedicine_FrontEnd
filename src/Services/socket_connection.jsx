import { io } from "socket.io-client";

// const socket = io("https://zcmc-development.online/chat");
// const socket = io("http://192.168.137.188:8573");
const socket = io("http://localhost:8573");
// const socket = io("http://192.168.137.117:8573");

const connectToSocket = () => {
  socket.on("connect");
};

const initializeMessageID = (id) => {
  socket.emit("sendID", id);
};

const subscribeToMessages = (callback) => {
  socket.on("message", (data) => {
    callback(data);
  });
};

const unsubscribeFromMessages = () => {
  socket.off("message");
};

export {
  socket,
  connectToSocket,
  initializeMessageID,
  unsubscribeFromMessages,
  subscribeToMessages,
};
