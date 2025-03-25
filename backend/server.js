import express from "express";
import dotenv from "dotenv";
dotenv.config();
import cors from "cors";
import { createServer } from "http";
import { Server } from "socket.io";
import cookieParser from "cookie-parser";
import { dbApp } from "./database/database.js";
import { channelsDataModel, userDataModel,serverDataModel } from "./database/schema/databaseSchema.js";
import { createUserId ,createPasswordHash,checkPasswordHash, signJwt,verifyJwt, getUserChannels ,getChannelData,getUserId} from "./database/managedata.js";

import runsocket from "./sockets/managesocket.js";
const app = express();
const httpServer = createServer(app);

app.use(express.json({}), express.urlencoded({}), cookieParser());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

function checkJwt(req, res, next) {
const validToken = verifyJwt(req.cookies.tokenJwt)
try {
  let usernamee = validToken.username
  if(validToken){
    req.validUser = true,
    req.username = usernamee
  }else{
    req.validUser = false
  }
} catch (error) {
  console.log("no cookie")
}

  next()
}

app.get("/test", checkJwt, async (req, res) => {
  const username = {"u":req.username}
 
//  let id = "12345678"
//  await channelsDataModel.findOneAndUpdate({name:"Global"},{ $push: {members:`${id}`}})
//  let a = channelsDataModel.findOne({name:"Global"})
//  console.log(a.members)
// console.log(createUserId().length)
// console.log(("00000000000000000000").length)
let a = "/v1/me/chat/00000000000000000000"
console.log(a.replace("/v1/me/chat/",""))
  res.send(username)
  })
app.get("/v1/verify", checkJwt, async (req, res) => {

    if(req.validUser){
      res.json({status:"userValid"})
    }else{
      res.json({status:"userInvalid"})
    }
    })

    
app.get("/v1/userdata", checkJwt, async (req, res) => {

      if(req.validUser){
        let getchannels = await getUserChannels(req.username)
        res.json({username:req.username ,channels:getchannels.servers})
        
      }
      })    
app.get("/v1/getChannelData/:id", checkJwt, async (req, res) => {

        if(req.validUser){
          // console.log(req.params.id)
          let channelData =await getChannelData(req.params.id)
          // console.log(channelData)
          res.json({"channelData":channelData})
          
        }
        })  
app.post("/v1/registeruser",checkJwt, async (req, res) => {
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
      let channelGlobal = "00000000000000000000";
      let hashedhPassword = await createPasswordHash(passwordRegister)
      try {
        await userDataModel.create({
          _id: `${usernameRegister}`,
          username: `${usernameRegister}`,
          password: `${hashedhPassword}`,
          userid: `${userID}`,
          createdDate:`${userID}`,
        });
        await userDataModel.findOneAndUpdate({userid:`${userID}`},{$push:{servers:channelGlobal}})
        await channelsDataModel.findOneAndUpdate({name:"Global"},{ $push: {members:`${userID}`}})
   
        let createToken = signJwt(usernameRegister,userID)
        res.cookie("tokenJwt",createToken ,{ maxAge: (15*24*60*60*1000) })
        res.json({ status: "userCreated" });
      } catch (error) {
        res.json({ status: "userExists" });
        console.log(error,"some err")
      }

   
  } else {
    res.json({ status: "missingUsernamePassword" });
  }
});



app.post("/v1/loginUser", async (req, res) => {
  const usernameLogin = req.body.username;
  const passwordLogin = req.body.password;
  console.log(
    "Username Login-",usernameLogin,
    "Password-",passwordLogin,
    req.cookies
  );
    const validToken = verifyJwt(req.cookies.tokenJwt)
    if(validToken){
      res.json({ status: "userValid" });
    }else{
      if (usernameLogin && passwordLogin) {
        const getUserdata =await userDataModel.findOne({
          _id:usernameLogin
        }).exec()
        if(getUserdata){
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
        }else{
          res.json({ status: "userInValid" });
        }
    } else {
      res.json({ status: "missingUsernamePassword" });
    }
    }
  
});
app.post("/test",async (req, res) => {
res.cookie("A","B" ,{ maxAge: (15*24*60*60*1000) })
res.json({"o":"k"})
})



app.post("/v1/me/createServer",checkJwt,async (req, res) => {
  if(req.validUser){
    try {
      let serverId= createUserId()
      let getUserid = await getUserId(req.username)
      const ServerName = req.body.serverName
      serverDataModel.create({
        _id: serverId,
        name:ServerName,
        admin:req.username,
        adminId:getUserid,
        createdDate: serverId,
        serverId:serverId,
        members: [getUserid]
      })
      // await serverDataModel.findOneAndUpdate({serverId:"20250325192254296000"},{ $push: {members:`${4444444}`}})
      await userDataModel.findOneAndUpdate({userid:`${getUserid}`},{ $push: {servers:`${serverId}`}})
      await res.json({"status":"CreatedServer","serverId":`${serverId}`})
    } catch (error) {
      console.log(error,"error in creating server ")
    }
  
  }
  
  })


app.get("/", (res, req) => {
  req.json({ hm: "hi" });
});
//app.put to update findbyidandupdate
//app.delete to delete ""...

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
