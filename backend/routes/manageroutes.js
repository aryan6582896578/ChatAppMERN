import {userDataModel,serverDataModel,} from "../database/schema/databaseSchema.js";
import {createUserId,createPasswordHash,checkPasswordHash,signJwt,verifyJwt,getUserChannels,getChannelData,getUserId,} from "../database/managedata.js";
export default function runroutes(app) {
  // app.get("/", (res, req) => {
  //     req.json({ hm :"from other file" });
  //   });

  function checkJwt(req, res, next) {
    const validToken = verifyJwt(req.cookies.tokenJwt);
    try {
      let usernamee = validToken.username;
      if (validToken) {
        (req.validUser = true), (req.username = usernamee);
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
      res.json({ status: "userValid" });
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
      res.json({ username: req.username, channels: getchannels.servers });
    }
  });

  app.get("/v1/getChannelData/:id", checkJwt, async (req, res) => {
    if (req.validUser) {
      let channelData = await getChannelData(req.params.id);
      res.json({ channelData: channelData });
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
}

//   app.put to update findbyidandupdate
//   app.delete to delete ""...

// app.post("/test",async (req, res) => {
// res.cookie("A","B" ,{ maxAge: (15*24*60*60*1000) })
// res.json({"o":"k"})
// })

// app.get("/test", checkJwt, async (req, res) => {
//   const username = {"u":req.username}
// let a = "/v1/me/chat/00000000000000000000"
// console.log(a.replace("/v1/me/chat/",""))
//   res.send(username)
//   })
