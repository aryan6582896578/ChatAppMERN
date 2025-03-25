import dotenv from "dotenv";
dotenv.config();
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken"
import { channelsDataModel, userDataModel } from "./schema/databaseSchema.js";

function signJwt(username,userId){
let createJwtToken = jwt.sign({ username:username ,userId:userId }, process.env.privateKey)
return(createJwtToken)
}

function verifyJwt(token){

try {
    let verifyJwtToken =jwt.verify(token, process.env.privateKey);
    return verifyJwtToken
} catch (error) {
    console.log("invalid jwt")
}

}
function createUserId(){
    let date = new Date();
    let someRandom =Math.floor(Math.random() * (999 - 100 +1) + 100)
    let id = String(date.getUTCFullYear()) +String(date.getUTCMonth() + 1).padStart(2, '0') + String(date.getUTCDate()).padStart(2, '0') + String(date.getUTCHours()).padStart(2, '0') + String(date.getUTCMinutes()).padStart(2, '0') + String(date.getUTCSeconds()).padStart(2, '0') + String(date.getUTCMilliseconds()).padStart(3, '0') + String(someRandom);
    return id;
}


const saltCount = process.env.saltCount
async function createPasswordHash(plainPassword){
   let hashedPassword =await bcrypt.hash(plainPassword, parseInt(saltCount))
   return hashedPassword;
}
async function checkPasswordHash(plainPassword,hashedPassword){
    let isHashedPassword =await bcrypt.compare(plainPassword, hashedPassword)
     return isHashedPassword;
 }

async function getUserChannels(username) {
    let channels = await userDataModel.findOne({username:username})
    return channels
}

async function getChannelData(channelId) {
    let channelData = await channelsDataModel.findOne({channelId:channelId})
    let a = channelData.members
    let list = {}
    for (const [key, element] of a.entries()) {
        // console.log(element[0], key , "channel data");
        try {
            list[a[key]] = await getUsername(element[0]);
        } catch (error) {
            console.log(error, "err");
        }
    }
    // (async (value,key)=>{console.log(value[0] ,key)   , list[key] =  await getUsername(value[0]) })
    return(list)
    // console.log(await getUsername(a.map((x)=>{x[0]})))
}

//add channel name later for tab title

async function getUsername(memberIds) {
    let getUsername = await userDataModel.findOne({userid:memberIds})
    // console.log(getUsername.username ,"hmmmmmmm")
    return(getUsername.username)
}

async function getUserId(username) {
    let getUserId = await userDataModel.findOne({username:username})
    // // console.log(getUsername.username ,"hmmmmmmm")
    // console.log(getUserId,"gg",username);
    
    return(getUserId.userid)
}
export {createPasswordHash,checkPasswordHash,createUserId,signJwt,verifyJwt,getUserChannels,getChannelData,getUserId}