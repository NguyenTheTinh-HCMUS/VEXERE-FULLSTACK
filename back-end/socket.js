module.exports = (app) => {
  const server = require("http").createServer(app);
  const io = require("socket.io")(server);

  io.on("connection", (socket) => {
    console.log("A user connected !");
    socket.on("disconnect", () => {
      console.log("A user is disconnect");
    });
    socket.on('Handle-Like-Client',like=>{
        socket.broadcast.emit('Handle-Like-Server',like)
    })
  });
  server.listen(3001, () => {
    console.log("Socket Server is running 3001");
  });
};
