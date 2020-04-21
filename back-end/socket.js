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
    socket.on('Handle-DanhGia-Client',data=>{
        socket.broadcast.emit('Handle-DanhGia-Server',data)
    })
    socket.on('chon-ghe-client',(data)=>{
      socket.broadcast.emit('chon-ghe-server',data)
    })
    socket.on('ghe-bo-client',(data)=>{
     
      socket.broadcast.emit('ghe-bo-server',data)
    })
    socket.on('huy-tat-ghe-client',data=>{
      
      socket.broadcast.emit('huy-tat-ghe-server',data)
    })
  });
  server.listen(3001, () => {
    console.log("Socket Server is running 3001");
  });
};
