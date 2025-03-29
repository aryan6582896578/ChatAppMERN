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
const app = express();
const httpServer = createServer(app);

app.use(express.json({}), express.urlencoded({}), cookieParser());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);









runroutes(app)
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

runsocket(socket)

async function runServer() {
  try {
    dbApp().then(() => {
      httpServer.listen(process.env.SERVER_PORT, () => {
        console.log(
          `server running on http://localhost:${process.env.SERVER_PORT}`
        );
      });
    });
  } catch (error) {}
}
runServer();
