import express from "express";
import { signJwt,verifyJwt,createPasswordHash,checkPasswordHash, } from "../../database/managedata/authData.js";
import { getUserData } from "../../database/managedata.js";
import { serverChannelsDataModel, serverDataModel, userDataModel } from "../../database/schema/databaseSchema.js";
import { createCustomId } from "../../database/managedata/customData.js";
export const router = express.Router({ mergeParams: true })

export default function user(){
  async function checkJwt(req, res, next) {
      try {
        const validToken = verifyJwt(req.cookies.tokenJwt);
        console.log("jwt check in user v2")
        if (validToken) {
          const usernameValidToken = validToken.username;
          const userIdValidToken = validToken.userId;
          req.validUser = true,
          req.username = usernameValidToken,
          req.userId = userIdValidToken;
        } else {
          req.validUser = false;
        }
      } catch (error) {
        console.log("no cookie jwtcheck");
      }
      next();
  }

  router.get("/", checkJwt, async (req, res) => {
  if (req.validUser) {
        let userData = await getUserData(req.username);
        res.json({ status: "userValid",username: req.username,userId: req.userId , userprofileurl:userData.userprofileurl});
      } else {
        res.clearCookie("tokenJwt");
        res.json({ status: "userInvalid" });
      }
  });
  router.post("/createServer", checkJwt, async (req, res) => {
    const serverName = req.body.serverName;
    if (req.validUser && serverName) {
      try {
        const date = new Date();
        const currentDate = date.toUTCString();
        const serverId = createCustomId();
        const userId = await req.userId;

        await serverDataModel.create({
          _id: `${serverId}`,
          name: `${serverName}`,
          createdDate: `${currentDate}`,
          ownerId: `${userId}`,
          serverId: `${serverId}`,
        });

        const channelId = createCustomId();
        
        await serverChannelsDataModel.create({
          _id: `${channelId}`,
          name: "General",
          createdDate: `${currentDate}`,
          channelId: `${channelId}`,
          serverId: `${serverId}`,
        });
        
        await serverDataModel.findOneAndUpdate(
          { serverId: `${serverId}` },
          { $push: { channels: `${channelId}` } }
        );

        await userDataModel.findOneAndUpdate(
          { userid: `${userId}` },
          { $push: { servers: `${serverId}` } }
        );

        await serverDataModel.findOneAndUpdate(
          { serverId: `${serverId}` },
          { $push: { members: `${userId}` } }
        );
        await serverDataModel.findOneAndUpdate(
          { serverId: `${serverId}` },
          { $push: { admins: `${userId}` } }
        );

        await serverChannelsDataModel.findOneAndUpdate(
          { channelId: `${channelId}` },
          { $push: { members: `${userId}` } }
        );

        res.json({ status: "CreatedServer", serverId: `${serverId}` });
      } catch (error) {
        console.log(error, "error in creating server ");
      }
    }
  });
  
  return router
}



