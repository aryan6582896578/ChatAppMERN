import { verifyJwt } from "../database/managedata.js";

export default async function runsocket(socket) {
  socket.use((socket, next) => {
    const validToken = verifyJwt(socket.handshake.auth.jwt);
    try {
      let usernamee = validToken.username;
      if (validToken) {
        (socket.validUser = true), (socket.username = usernamee);
        socket.path = socket.handshake.auth.path;
      } else {
        req.validUser = false;
      }
    } catch (error) {
      console.log("no jwt socket check");
    }

    next();
  });

  socket.on("connection", (socket) => {
    if (socket.validUser) {
      console.log(`${socket.username} connected `);
      
      
      socket.join(`${socket.path}`);
      socket.on(`${socket.path}`, (data) => {
        console.log(`${socket.username} connected to ${socket.path}`);
        console.log(`Message received in room ${socket.path}:`,data,socket.username);
        const chatData = {
          username: socket.username,
          message: data,
          channelId: socket.path,
        };
        console.log(chatData);
        socket.server.to(`${socket.path}`).emit(`${socket.path}`, chatData);
      });
      
    }
  });
}
