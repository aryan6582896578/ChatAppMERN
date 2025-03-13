import express from 'express';
import dotenv from 'dotenv'
dotenv.config()
import cors from 'cors';
import { createServer } from 'http';
import { Server } from 'socket.io';
import { dbApp } from "./database/database.js";
import {ttest} from './database/schema/databaseSchema.js'
const app = express()
const httpServer = createServer(app);

app.use(express.json())
app.use(cors())
// const router = express.Router([options])  middelware use it for case sensitive strict https://expressjs.com/en/5x/api.html#router
app.get("/",(res,req)=>{
    req.json({"hm":"hi"})
})
app.post("/v1/registeruser",(req, res)=>{
  console.log(req.body)
  res.send({"A":"b"})

})
//app.put to update findbyidandupdate
//app.delete to delete ""...


const socket = new Server(httpServer, {

  path:"/v2",
  cors: {
      origin: "http://localhost:5173",
      credentials: true
    },
    method:['GET', 'PUT', 'POST'],
    transports: [
      'websocket', 
      'flashsocket', 
      'htmlfile', 
      'xhr-polling', 
      'jsonp-polling', 
      'polling'
    ]
});

socket.on('connection', (socket,) => {
  console.log('a user connected');

  socket.on('disconnect', (reason) => {
    console.log('user disconnected- ',reason);
  });
  socket.emit("hello", ["world ??","ok"]);
});



async function runServer(){
  try {
    dbApp().then(()=>{
      httpServer.listen(process.env.SERVER_PORT,()=>{
        console.log(`server running on http://localhost:${process.env.SERVER_PORT}`)
    })
    })
  
  } catch (error) {
    
  }
}
runServer()