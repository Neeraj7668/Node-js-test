// creating server

const socketIO = require("socket.io");

socketIO.on("connection", (socket) => {
  //when connect

  socketIO.emit("test", {
    msg: "hello world",
  });

  socket.on("connect_error", function () {
    console.log("Test Socket Connection Failed");
  });

  socket.on("connect", function () {
    console.log("Test Socket Connected..!!");
  });
});

module.exports = socketIO;
