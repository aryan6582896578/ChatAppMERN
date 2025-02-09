const express = require("express");
require('dotenv').config()
const cors = require('cors');
const { createServer } = require('http');
const { Server } = require('socket.io');


const app = express()
const httpServer = createServer(app);



const socket = new Server(httpServer, {

    path:"/v1",
    cors: {
        origin: "http://localhost:5173",
        credentials: true
      },
      method:['GET', 'PUT', 'POST']
  });

  socket.on('connection', (socket,) => {
    console.log('a user connected');
 
    socket.on('disconnect', (reason) => {
      console.log('user disconnected- ',reason);
    });
    socket.emit("hello", ["world ??","ok"]);
  });




app.get("/",(res,req)=>{
    req.json({"hm":"hi"})
})
httpServer.listen(process.env.SERVER_PORT,()=>{
    console.log(`server on http://localhost:${process.env.SERVER_PORT}`)
})