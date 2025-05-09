import express from "express";
import dotenv from "dotenv";
dotenv.config();
import cors from "cors";
import { createServer } from "http";
import { Server } from "socket.io";
import cookieParser from "cookie-parser";
import { dbApp } from "./database/database.js";

import runsocket from "./sockets/managesocket.js";
import runroutes from "./routes/manageroutes.js";
import createDefaultData from "./database/default/createdefault.js";
const app = express();
const httpServer = createServer(app);

app.use(express.json({}), express.urlencoded({}), cookieParser());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
const socket = new Server(httpServer, {
  cors: {
    origin: "http://localhost:5173",
    credentials: true,
  },

  method: ["GET", "PUT", "POST"],
  transports: [
    "websocket",
    "flashsocket",
    "htmlfile",
    "xhr-polling",
    "jsonp-polling",
    "polling",
  ],
});
runroutes(app,socket)
runsocket(socket)

async function runServer() {
  try {
    dbApp().then(async () => {
       httpServer.listen(process.env.SERVER_PORT, () => {
        console.log(`server running on http://localhost:${process.env.SERVER_PORT}`);
      }), createDefaultData()   
    })  
  } catch (error) {
    console.log(error,"error in server start")
  }
}
runServer();
