const express = require("express");
const http = require("http");
const socketIo = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

let status = "Offline";

io.on("connection", (socket) => {
  socket.emit("statusUpdate", status);

  socket.on("statusChange", (newStatus) => {
    status = newStatus;
    io.emit("statusUpdate", status);
  });
});

server.listen(4000, () => {
  console.log("Server listening on port 4000");
});
