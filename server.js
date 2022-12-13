const app = require("./app");
const connectDatabase = require("./config/database");

const http = require("http").Server(app);
const io = require("socket.io")(http);

// Handling Uncaught Exception
process.on("uncaughtException", (err) => {
  console.log(`Error: ${err.message}`);
  console.log(`Shutting down the server due to Uncaught Exception`);
  process.exit(1);
});

// Config
// if (process.env.NODE_ENV !== "PRODUCTION") {
require("dotenv").config({ path: ".env" });
// }

// Connecting to database
connectDatabase();

// connect socket server

// 5. Socket emit and On function example including socket connection.

io.on("connection", (socket) => {
  io.emit("test", {
    msg: "hello world",
  });

  socket.on("connect_error", function () {
    console.log("Test Socket Connection Failed");
  });

  socket.on("connect", function () {
    console.log("Test Socket Connected..!!");
  });
});

const server = http.listen(process.env.PORT || 5000, () => {
  console.log(
    `Server is working on http://localhost:${process.env.PORT || 5000}`
  );
});

// Unhandled Promise Rejection
process.on("unhandledRejection", (err) => {
  console.log(`Error: ${err.message}`);
  console.log(`Shutting down the server due to Unhandled Promise Rejection`);

  server.close(() => {
    process.exit(1);
  });
});
