import dotenv from "dotenv";
dotenv.config();
import {userDataModel,serverDataModel,inviteDataModel,serverChannelsDataModel } from "./schema/databaseSchema.js";

function createId(){
    let date = new Date();
    let someRandom =Math.floor(Math.random() * (999 - 100 +1) + 100)
    let id = String(date.getUTCFullYear()) +String(date.getUTCMonth() + 1).padStart(2, '0') + String(date.getUTCDate()).padStart(2, '0') + String(date.getUTCHours()).padStart(2, '0') + String(date.getUTCMinutes()).padStart(2, '0') + String(date.getUTCSeconds()).padStart(2, '0') + String(date.getUTCMilliseconds()).padStart(3, '0') + String(someRandom);
    return id;
}

async function userDataSeverList(username) {
    const userDataSeverList = await userDataModel.findOne({username:username})
    return userDataSeverList.servers
}

async function getChannelData(serverId) {
    let serverData = await serverDataModel.findOne({serverId:serverId})
    if(serverData){
        let serverName = serverData.name
        let memberList = serverData.members
        let list = {}
        for (const [key, element] of memberList.entries()) {
            try {
                list[memberList[key]] = await getUsername(element[0]);
            } catch (error) {
                console.log(error, "err");
            }
        }
        const serverInfo={
            name:serverName,
            members:list
        }
        return(serverInfo)
    }

}

async function getServerData(serverId){
    let serverData = await serverDataModel.findOne({serverId:serverId})
    if(serverData){
        return serverData.name
    }

}
async function getServerMemberList(serverId){
    let serverData = await serverDataModel.findOne({serverId:serverId})
    if(serverData){
        return serverData.members
    }

}

async function getServerChannelList(serverId){
    let serverData = await serverDataModel.findOne({serverId:serverId})
    if(serverData){
        return serverData.channels
    }

}

async function getServerChannelMemberList(serverChannelId){
    let serverChannelData = await serverChannelsDataModel.findOne({serverChannelId:serverChannelId})
    if(serverChannelData){
        return serverChannelData
    }

}

async function getUsername(memberIds) {
    let getUsername = await userDataModel.findOne({userid:`${memberIds}`})
    return(getUsername.username)
}

async function getUserId(username) {
    let getUserId = await userDataModel.findOne({username:username}) 
    return(getUserId.userid)
}

function randomChar(){
    let someRandom =Math.floor(Math.random() * (90 - 65+1) + 65)
    let someRandomChar = String.fromCharCode(someRandom)
    return someRandomChar
}

async function createInviteCode(){
    let createdInviteCode=""
    for(let i=0;i<8;i++){
        createdInviteCode += randomChar()
    }
    return createdInviteCode
}


async function validInviteCode(serverId) {
  let someflag = 0;

  while (someflag == 0) {
    const inviteCode = await createInviteCode();
    let usedInviteCode = await inviteDataModel.findOne({
      inviteCode: `${inviteCode}`,
    });
    if(usedInviteCode){
        console.log("yes")
    }else{
        let createdId = createId();
              await inviteDataModel.create({
      _id: `${inviteCode}`,
      serverId:`${serverId}`,
      inviteCode:`${inviteCode}`,
      createdDate: `${createdId}`,
    });
    return inviteCode
    }
  }
}


export {createId,getChannelData,getUserId,getServerMemberList,createInviteCode,validInviteCode,getServerChannelList,userDataSeverList,getServerData,getServerChannelMemberList}