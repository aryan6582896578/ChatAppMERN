import express from "express";
import { signJwt,verifyJwt,createPasswordHash,checkPasswordHash, } from "../../database/managedata/authData.js";
import { getUserData } from "../../database/managedata.js";
import { serverChannelsDataModel, serverDataModel, userDataModel } from "../../database/schema/databaseSchema.js";
import { createCustomId } from "../../database/managedata/customData.js";
const router = express.Router({ mergeParams: true })

export default function auth(app,socket,upload){
  async function checkJwt(req, res, next) {
      try {
        const validToken = verifyJwt(req.cookies.tokenJwt);
        console.log("jwt check in auth v2")
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
  router.post("/register",checkJwt, async (req, res) => {
    if(req.validUser){
        res.json({ status: "userValid" });
    }else{
        const usernameData = req.body.username;
        const passwordData = req.body.password;
        if(usernameData.length<4){
            res.json({status:"usernameLimitMin"})
        }else if(usernameData.length>15){
            res.json({status:"usernameLimitMax"})
        }else if(passwordData.length>30){
            res.json({status:"passwordLimitMax"})
        }else if(passwordData.length<10){
            res.json({status:"passwordLimitMin"})
        }else{
            const date = new Date();
            const currentDate = date.toUTCString();
            const userID = createCustomId().toString();
            const defaultServer = "7326033090969600000";
            const hashedhPassword = await createPasswordHash(passwordData);
            try {
            await userDataModel.create({
                _id: `${usernameData}`,
                username: `${usernameData}`,
                password: `${hashedhPassword}`,
                createdDate: `${currentDate}`,
                userid: `${userID}`,
                userprofileurl: "https://res.cloudinary.com/dz9lsudey/image/upload/v1759405162/default_pfp_aflbjz.png",
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
            );

            const createToken = signJwt(usernameData, userID);
            const userCreated = await userDataModel.findOne({
                userid: `${userID}`,
            });

            console.log(userCreated, "new user created");
            res.cookie("tokenJwt", createToken, {
                maxAge: 15 * 24 * 60 * 60 * 1000,
            });
            res.json({ status: "userCreated" });
            } catch (error) {
            res.json({ status: "userExists" });
            console.log(error, "some err in register");
            }
        }
        }
    });

    router.post("/login",checkJwt, async (req, res) => {
        if(req.validUser){
            res.json({ status: "userValid" });
        }else{
            const usernameData = req.body.username;
            const passwordData = req.body.password;

            if (usernameData.length>=1 && passwordData.length>=1) {
                const getUserdata = await userDataModel.findOne({ _id: usernameData });
                if (getUserdata) {
                    const userID = getUserdata.userid;
                    const checkHash = await checkPasswordHash(passwordData,getUserdata.password);
                    try {
                        if (getUserdata && checkHash === true) {
                            const createToken = signJwt(usernameData, userID);
                            res.cookie("tokenJwt", createToken, {maxAge: 15 * 24 * 60 * 60 * 1000});
                            res.json({ status: "userValid" });
                        } else {
                            res.json({ status: "userInValid" });
                        }
                    } catch (error) {
                        res.json({ status: "userInValid" });
                        console.log(error, "some err in login");
                    }
                    } else {
                        res.json({ status: "userInValid" });
                    }
            }else{
                res.json({ status: "userInValid" });
            }
        }
    });



//     const validToken = verifyJwt(req.cookies.tokenJwt);
//     if (validToken) {
//       res.json({ status: "userValid" });
//     } else {
//       if(usernameLogin.length<=15 && passwordLogin.length<=30){
//         if (usernameLogin && passwordLogin) {
//           const getUserdata = await userDataModel.findOne({ _id: usernameLogin });
//           if (getUserdata) {
//             const userID = getUserdata.userid;
//             const checkHash = await checkPasswordHash(passwordLogin,getUserdata.password);
//             try {
//               if (getUserdata && checkHash === true) {
//                 const createToken = signJwt(usernameLogin, userID);
//                 res.cookie("tokenJwt", createToken, {maxAge: 15 * 24 * 60 * 60 * 1000});
//                 res.json({ status: "userValid" });
//               } else {
//                 res.json({ status: "userInValid" });
//               }
//             } catch (error) {
//               res.json({ status: "userInValid" });
//               console.log(error, "some err");
//             }
//           } else {
//             res.json({ status: "userInValid" });
//           }
//         } else {
//           res.json({ status: "missingUsernamePassword" });
//         }
//     }else{
//     res.json({ status: "username length should less than 15 and password less than 30" });
//   }
//   }

  
  return router
}



