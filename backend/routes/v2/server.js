import express from "express";
import { signJwt,verifyJwt,createPasswordHash,checkPasswordHash, } from "../../database/managedata/authData.js";
import { getChannelName, getServerChannelMemberList, getServerData, getUserData, getUsername, validServerChannelList } from "../../database/managedata.js";
import { serverChannelsDataModel, serverDataModel, userDataModel } from "../../database/schema/databaseSchema.js";
import { createCustomId } from "../../database/managedata/customData.js";
export const router = express.Router({ mergeParams: true })
export default function serverV2(){
  async function checkJwt(req, res, next) {
      try {
        const validToken = verifyJwt(req.cookies.tokenJwt);
        console.log("jwt check in server v2")
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
    router.get("/:serverId/channelList", checkJwt, async (req, res) => {
    const serverId = req.params.serverId;
    const userId= req.userId;
    console.log(serverId)
    if (req.validUser && serverId) {
      const serverData = await getServerData(req.params.serverId);
      if (serverData) {
        const serverMemberList = serverData.members;
        if (serverMemberList.includes(userId)) {
          const channelList = await validServerChannelList(serverId, userId);
          const names = await Promise.all(
            channelList.map(async (channelId) => {
              const channelName = await getChannelName(channelId);
              return [channelId, channelName];
            })
          );
          const channelNameList = Object.fromEntries(names);
          return res.json({ channelList: channelNameList });
        } else {
          res.json({ status: "userInValid" });
        }
      } else {
        res.json({ status: "userInValid" });
      }
    }
  });
  router.get("/:serverId/permissionCheckServer",checkJwt,async (req, res) => {
      const serverId = req.params.serverId;
      const userId = req.userId;
      if (req.validUser && serverId) {
        const serverData = await getServerData(req.params.serverId);
        if (serverData) {
          const serverMemberList = serverData.members;
          if (serverMemberList.includes(userId)) {
            const channelList = await validServerChannelList(serverId, userId);
            if (channelList.length >= 1) {
              res.json({ status: "validChannel", channelId: channelList[0] });
            } else {
              res.json({ status: "noChannel" });
            }
          } else {
            res.json({ status: "userInValid" });
          }
        } else {
          res.json({ status: "userInValid" });
        }
      }
    }
  );
  router.get("/:serverId/serverInfo", checkJwt, async (req, res) => {
    const serverId = req.params.serverId;
    const userId = req.userId;
    if (req.validUser) {
      const serverData = await getServerData(serverId);
      const adminList = serverData.admins;
      const serverName = serverData.name;
      if (adminList.includes(userId)) {
        res.json({ adminStatus: true ,serverName:serverName });
      } else {
        res.json({ adminStatus: false ,serverName:serverName });
      }
    }
  });
  router.get("/:serverId/:channelId/channelData",checkJwt,async (req, res) => {
      const userId = req.userId;
      const serverId = req.params.serverId;
      const channelId = req.params.channelId;
      if (req.validUser && serverId) {
        const serverData = await getServerData(serverId);
        if (serverData) {
          const serverMemberList = serverData.members;
          if (serverMemberList.includes(userId)) {
            const channelName = await getChannelName(channelId);
            return res.json({ channelName: channelName });
          } else {
            res.json({ status: "userInValid" });
          }
        } else {
          res.json({ status: "userInValid" });
        }
      }
    }
  );
  router.get("/:serverId/:channelId/channelMemberList/",checkJwt,async (req, res) => {
      const userId = req.userId;
      const serverId = req.params.serverId;
      const channelId = req.params.channelId;
      if (req.validUser && serverId) {
        const serverData = await getServerData(serverId);
        if (serverData) {
          const serverMemberList = serverData.members;
          if (serverMemberList.includes(userId)) {
            const channelList = await validServerChannelList(serverId, userId);
            if (channelList.includes(channelId)) {
              const usernameList = await getServerChannelMemberList(channelId);

              const usernames = await Promise.all(
                usernameList.map(async (userId) => {
                  const username = await getUsername(userId);
                  return [userId, username];
                })
              );
              const usernameListData = Object.fromEntries(usernames);
              return res.json({ usernameList: usernameListData });
            } else {
              res.json({ status: "noUsers" });
            }
          } else {
            res.json({ status: "userInValid" });
          }
        } else {
          res.json({ status: "userInValid" });
        }
      }
    }
  );

    return router
}