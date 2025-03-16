import express from "express";
import dotenv from "dotenv";
dotenv.config();
import cors from "cors";
import { createServer } from "http";
import { Server } from "socket.io";
import cookieParser from "cookie-parser";
import { dbApp } from "./database/database.js";
import { userDataModel } from "./database/schema/databaseSchema.js";
import { createUserId ,createPasswordHash,checkPasswordHash} from "./database/managedata.js";
const app = express();
const httpServer = createServer(app);

app.use(express.json({}), express.urlencoded({}), cookieParser());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.post("/v1/registeruser", async (req, res) => {
  const usernameRegister = req.body.username;
  const passwordRegister = req.body.password;
  console.log(
    "Username-",
    usernameRegister,
    "Password-",
    passwordRegister,
    "Password hashed-",
    await createPasswordHash(passwordRegister),
    req.cookies
  );

  if (usernameRegister && passwordRegister) {

      let userID = createUserId();
      let hashedhPassword = await createPasswordHash(passwordRegister)
      try {
        await userDataModel.create({
          _id: `${usernameRegister}`,
          username: `${usernameRegister}`,
          password: `${hashedhPassword}`,
          userid: `${userID}`,
          createdDate:`${userID}`
        });
        res.json({ status: "userCreated" });
      } catch (error) {
        res.json({ status: "userExists" });
        console.log(error,"some err")
      }

    // res.cookie("zz", "z1", { expires: new Date(Date.now() + 9999999999) });
   
  } else {
    res.json({ status: "missingUsernamePassword" });
  }
});


app.post("/v1/loginUser", async (req, res) => {
  const usernameLogin = req.body.username;
  const passwordLogin = req.body.password;
  console.log(
    "Username Login-",
    usernameLogin,
    "Password-",
    passwordLogin,
    "Password check-",
    passwordLogin,
    req.cookies
  );

  if (usernameLogin && passwordLogin) {

      // let userID = createUserId();
    
      const getUserdata =await userDataModel.findOne({
        _id:usernameLogin
        
      }).exec()
      let checkHash = await checkPasswordHash(passwordLogin,getUserdata.password)
      try {
        if(getUserdata&&checkHash===true){
          res.json({ status: "userValid" });
        }else{
          res.json({ status: "userInValid" });
        }
      } catch (error) {
        res.json({ status: "userInValid" });
        
        console.log(error,"some err")
      }

    // res.cookie("zz", "z1", { expires: new Date(Date.now() + 9999999999) });
    // res.json({status:"hmm"})
  } else {
    res.json({ status: "missingUsernamePassword" });
  }
});

// app.use((req, res, next) => {
//   // console.log(req.ip)
//   next()
// })
// const router = express.Router([options])  middelware use it for case sensitive strict https://expressjs.com/en/5x/api.html#router
app.get("/", (res, req) => {
  req.json({ hm: "hi" });
});
//app.put to update findbyidandupdate
//app.delete to delete ""...

const socket = new Server(httpServer, {
  path: "/v2",
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

socket.on("connection", (socket) => {
  console.log("a user connected");

  socket.on("disconnect", (reason) => {
    console.log("user disconnected- ", reason);
  });
  socket.emit("hello", ["world ??", "ok"]);
});

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
