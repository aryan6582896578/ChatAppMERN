import {userDataModel,serverDataModel, inviteDataModel,serverChannelsDataModel} from "../database/schema/databaseSchema.js";
import {createId,getServerData,getUserId,getServerMemberList,validInviteCode,userDataSeverList,getServerChannelList,getServerChannelMemberList} from "../database/managedata.js";
import {signJwt,verifyJwt,createPasswordHash,checkPasswordHash} from "../database/managedata/authData.js"
import { createCustomId } from "../database/managedata/customData.js";
export default function runroutes(app,socket) {

  function checkJwt(req, res, next) {
    try {
      const validToken = verifyJwt(req.cookies.tokenJwt);
      if (validToken) {
        const usernameValidToken = validToken.username;
        const userIdValidToken = validToken.userId;
        (req.validUser = true), 
        (req.username = usernameValidToken),
        (req.userId = userIdValidToken);
      } else {
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
  app.get("/v1/username", checkJwt, async (req, res) => {
    if (req.validUser) {
      res.json({ username:req.username});
    } 
  });

  app.post("/v1/registeruser", checkJwt, async (req, res) => {
    const usernameRegister = req.body.username;
    const passwordRegister = req.body.password;

    if (usernameRegister && passwordRegister) {
      const date = new Date();
      const currentDate = date.toUTCString()
      const userID = createCustomId().toString();
      const defaultServer = "7326033090969600000";
      const hashedhPassword = await createPasswordHash(passwordRegister);
      try {
        await userDataModel.create({
          _id: `${usernameRegister}`,
          username:`${usernameRegister}`,
          password:`${hashedhPassword}`,
          createdDate: `${currentDate}`,
          userid:`${userID}`,
        });

        await userDataModel.findOneAndUpdate(
          { userid: `${userID}` },
          { $push: { servers: `${defaultServer}` } }
        );

        await serverDataModel.findOneAndUpdate(
          { serverId: `${defaultServer}` },
          { $push: { members: `${userID}` } }
        );

        await serverChannelsDataModel.findOneAndUpdate(
          { serverId: `${defaultServer}` },
          { $push: { members: `${userID}` } }
        )

        const createToken = signJwt(usernameRegister, userID);
        const userCreated = await userDataModel.findOne(
          { userid: `${userID}` },
        );
        console.log(userCreated ,"new user created")
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
    console.log("Username Login-",usernameLogin,"Password-",passwordLogin,"cookies",req?.cookies);
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

  app.get("/v1/userDataSeverList", checkJwt, async (req, res) => {
    if (req.validUser) {
      const userDataSevers = await userDataSeverList(req.username);
      res.json({serverList: userDataSevers });
    }
  });

  app.get("/v1/getServerData/:id", checkJwt, async (req, res) => {
    if (req.validUser) {
      const serverData = await getServerData(req.params.id);
      res.json({ serverName: serverData });
    }
  });
  app.post("/v1/me/createServer", checkJwt, async (req, res) => {
    if (req.validUser) {
      try {
        const date = new Date();
        const currentDate = date.toUTCString()
        const serverId = createCustomId();
        const userId = await req.userId;
        const serverName = req.body.serverName;
        await serverDataModel.create({
          _id: `${serverId}`,
          name:`${serverName}`,
          createdDate: `${currentDate}`,
          ownerId:`${userId}`,
          serverId:`${serverId}`,

        });

        const channelId = createCustomId();
        await serverChannelsDataModel.create({
          _id: `${channelId}`,
          name:"General",
          createdDate: `${currentDate}`,
          channelId:`${channelId}`,
          serverId:`${serverId}`,
        })

        await userDataModel.findOneAndUpdate(
          { userid: `${userId}` },
          { $push: { servers: `${serverId}` } }
        );

        await serverDataModel.findOneAndUpdate(
          { serverId: `${serverId}` },
          { $push: { channels: `${channelId}` }}
        );

        await serverDataModel.findOneAndUpdate(
          { serverId: `${serverId}` },
          { $push: { members: `${userId}` }}
        );

        await serverChannelsDataModel.findOneAndUpdate(
          { channelId:`${channelId}`, },
          { $push: { members: `${userId}` }}
        );
        
        await res.json({ status: "CreatedServer", serverId: `${serverId}` });
      } catch (error) {
        console.log(error, "error in creating server ");
      }
    }
  });
  
  app.get("/v1/permissionCheckServer/:serverId/:userId", checkJwt, async (req, res) => {
    if (req.validUser) {
      console.log("serverperms");
      const serverId = req.params.serverId
      const userId = req.params.userId
      const serverDataMemberList = await getServerMemberList(serverId);
      const serverChannelData=await getServerChannelList(serverId);
      const defaultChannel = serverChannelData[0].channelId
      const serverChannelId = String(defaultChannel)+String(serverId)
      console.log(serverChannelId)
      const a = await getServerChannelMemberList(serverChannelId)
      console.log(a,"a")
console.log(defaultChannel)

      console.log(serverChannelData)

      if(serverDataMemberList.includes(userId)){
        console.log("server yes")
      }
      // if(serverDataMemberList){
      //   if(serverData.includes(userId)){
      //     res.json({ status: "validUser" ,channelId:serverChannelRedirect});
      //   }else{
      //     res.json({ status: "invalid" });
      //   }
      // }else{
      //   res.json({ status: "invalid" });
      // }
     
      
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


  app.post("/test",async (req, res) => {
    res.json({"o":"k"})
    })
  app.get("/test",async (req, res) => {


      res.json({"o":createCustomId().toString()})
      })
}
