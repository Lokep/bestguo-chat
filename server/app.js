const Koa = require("koa");
const http = require("http");
const fs = require("fs");

const {Server} = require("socket.io");

const { getIP } = require("./utils/ip");

const app = new Koa();
const server = http.createServer(app.callback());
const io = new Server(server, {
  cors: {
    origin: "http://192.168.16.108:3001"
  }
});

io.on("connection", (socket) => {
  console.log(`A user connected: ${socket.id}`);

  socket.on("disconnect", () => {
    console.log(`User disconnected: ${socket.id}`);
  });

  socket.on("chat", (...rest) => {
    const [msg] = rest
    console.log(`Received message: ${rest}`);
    io.emit("chat", msg);
  });
});



app.use(async (ctx) => {
  ctx.body = fs.readFileSync("./index.html", "utf-8");
});

server.listen(3000, () => {
  console.log(`Server is running at http://localhost:3000`);
  console.log(`Server is running at http://${getIP()}:3000`);
});
