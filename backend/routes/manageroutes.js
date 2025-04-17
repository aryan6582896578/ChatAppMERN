import {userDataModel,serverDataModel, inviteDataModel,} from "../database/schema/databaseSchema.js";
import {createUserId,createPasswordHash,checkPasswordHash,signJwt,verifyJwt,getUserChannels,getChannelData,getUserId,getChannelDataUserId,validInviteCode} from "../database/managedata.js";
import runsocket from "../sockets/managesocket.js";
export default function runroutes(app,socket) {
  // app.get("/", (res, req) => {
  //     req.json({ hm :"from other file" });
  //   });

  function checkJwt(req, res, next) {
    const validToken = verifyJwt(req.cookies.tokenJwt);
    try {
      let usernamee = validToken.username;
      let idd = validToken.userId
      if (validToken) {
        (req.validUser = true), (req.username = usernamee),(req.userId = idd);
      } else {
        // res.clearCookie("tokenJwt")
        req.validUser = false;
      }
    } catch (error) {
      console.log("no cookie jwtcheck");
    }
    next();
  }
  app.get("/v1/verify", checkJwt, async (req, res) => {
    if (req.validUser) {
      res.json({ status: "userValid" ,username:req.username ,userId :req.userId});
    } else {
      res.clearCookie("tokenJwt");
      res.json({ status: "userInvalid" });
    }
  });

  app.post("/v1/registeruser", checkJwt, async (req, res) => {
    const usernameRegister = req.body.username;
    const passwordRegister = req.body.password;
    console.log("Username-",usernameRegister,"Password-",passwordRegister,"cookies",req.cookies?req.cookies:"no cookies");

    if (usernameRegister && passwordRegister) {
      let userID = createUserId();
      let channelGlobal = "00000000000000000000";
      let hashedhPassword = await createPasswordHash(passwordRegister);
      try {
        await userDataModel.create({
          _id: `${usernameRegister}`,
          username: `${usernameRegister}`,
          password: `${hashedhPassword}`,
          userid: `${userID}`,
          createdDate: `${userID}`,
        });
        await userDataModel.findOneAndUpdate(
          { userid: `${userID}` },
          { $push: { servers: channelGlobal } }
        );
        await serverDataModel.findOneAndUpdate(
          { serverId: "00000000000000000000" },
          { $push: { members: `${userID}` } }
        );
        let createToken = signJwt(usernameRegister, userID);
        await socket.emit("00000000000000000000",{server:"update"})
        res.cookie("tokenJwt", createToken, {maxAge: 15 * 24 * 60 * 60 * 1000,});
        res.json({ status: "userCreated" });
      } catch (error) {
        res.json({ status: "userExists" });
        console.log(error, "some err");
      }
    } else {
      res.json({ status: "missingUsernamePassword" });
    }
  });

  app.post("/v1/loginUser", async (req, res) => {
    const usernameLogin = req.body.username;
    const passwordLogin = req.body.password;
    console.log("Username Login-",usernameLogin,"Password-",passwordLogin,"cookies",req.cookies?req.cookies:"no cookies");
    const validToken = verifyJwt(req.cookies.tokenJwt);
    if (validToken) {
      res.json({ status: "userValid" });
    } else {
      if (usernameLogin && passwordLogin) {
          const getUserdata = await userDataModel.findOne({_id: usernameLogin})
          if (getUserdata) {
            const userID = getUserdata.userid
            let checkHash = await checkPasswordHash(passwordLogin,getUserdata.password);
            try {
              if (getUserdata && checkHash === true) {
                let createToken = signJwt(usernameLogin, userID);
                res.cookie("tokenJwt", createToken, {maxAge: 15 * 24 * 60 * 60 * 1000,});
                res.json({ status: "userValid" });
              } else {
                res.json({ status: "userInValid" });
              }
            } catch (error) {
              res.json({ status: "userInValid" });
              console.log(error, "some err");
            }
          } else {
            res.json({ status: "userInValid" });
          }
      } else {
        res.json({ status: "missingUsernamePassword" });
      }
    }
  });
  app.get("/v1/userdata", checkJwt, async (req, res) => {
    if (req.validUser) {
      let getchannels = await getUserChannels(req.username);
      res.json({ username: req.username, serverList: getchannels.servers });
    }
  });

  app.get("/v1/getChannelData/:id", checkJwt, async (req, res) => {
    if (req.validUser) {
      let channelData = await getChannelData(req.params.id);
      
      res.json({ channelData: channelData });
    }
  });
  app.get("/v1/permissionCheck/:cid/:uid", checkJwt, async (req, res) => {
    if (req.validUser) {
      let channelData = await getChannelDataUserId(req.params.cid);
      let a = req.params.uid
      if(channelData.includes(a)){
        res.json({ status: "validUser" });
      }else{
        res.json({ status: "invalidUser" });
      }
      
    }
  });
  app.get("/v1/inviteCode/:cid", checkJwt, async (req, res) => {
    if (req.validUser) {
      try {
        let serverInviteCode = await inviteDataModel.findOne({
          serverId: `${req.params.cid}`,
        });
        if(serverInviteCode){
          res.json({"inviteCode":`${serverInviteCode.inviteCode}`})
        }else{
          let inviteCode = await validInviteCode(req.params.cid)
          res.json({"inviteCode":`${inviteCode}`})
        }
      } catch (error) {
        console.log(error,"create invite code")
      }

      
      
    }
  });
  app.post("/v1/me/joinServer", checkJwt, async (req, res) => {
    if (req.validUser) {
      const serverInviteCodeJoin = req.body.serverInviteCode
      try {
        let serverInviteCode = await inviteDataModel.findOne({
          inviteCode: `${serverInviteCodeJoin}`,
        });
        if(serverInviteCode){
          let getUserid = await getUserId(req.username);

          let userInServerCheck = await userDataModel.findOne(
            { userid: `${getUserid}` },
          );

          if(userInServerCheck.servers.includes(serverInviteCode.serverId)){
            await res.json({ status: "alreadyJoined", serverId: `${serverInviteCode.serverId}` });
          }else{
          await userDataModel.findOneAndUpdate(
          { userid: `${getUserid}` },
          { $push: { servers: `${serverInviteCode.serverId}` } }
          
        );
        await serverDataModel.findOneAndUpdate(
          { serverId: `${serverInviteCode.serverId}` },
          { $push: { members: `${getUserid}` } })
          await res.json({ status: "ServerJoined", serverId: `${serverInviteCode.serverId}` });
          }

          



        }else{
          res.json({ status: "invalidCode" });
        }

      } catch (error) {
        console.log(error, "error in joining server ");
      }
    }
  });
  app.post("/v1/me/createServer", checkJwt, async (req, res) => {
    if (req.validUser) {
      try {
        let serverId = createUserId();
        let getUserid = await getUserId(req.username);
        const ServerName = req.body.serverName;
        serverDataModel.create({
          _id: serverId,
          name: ServerName,
          admin: req.username,
          adminId: getUserid,
          createdDate: serverId,
          serverId: serverId,
          members: [getUserid],
        });
        await userDataModel.findOneAndUpdate(
          { userid: `${getUserid}` },
          { $push: { servers: `${serverId}` } }
        );
        await res.json({ status: "CreatedServer", serverId: `${serverId}` });
      } catch (error) {
        console.log(error, "error in creating server ");
      }
    }
  });

  app.post("/test",async (req, res) => {

    res.json({"o":"k"})
    })
}

//   app.put to update findbyidandupdate
//   app.delete to delete ""...

// app.post("/test",async (req, res) => {
// // res.cookie("A","B" ,{ maxAge: (15*24*60*60*1000) })
// res.json({"o":"k"})
// })

// app.get("/test", checkJwt, async (req, res) => {
//   const username = {"u":req.username}
// let a = "/v1/me/chat/00000000000000000000"
// console.log(a.replace("/v1/me/chat/",""))
//   res.send(username)
//   })
