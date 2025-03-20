import dotenv from "dotenv";
dotenv.config();
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken"


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
    let someRandom =Math.floor(Math.random() * (999 - 111) + 100)
    let id = String(date.getUTCFullYear())+String(date.getUTCMonth()+1)+String(date.getUTCDate())+String(date.getUTCHours())+String(date.getUTCMinutes())+String(date.getUTCSeconds())+String(date.getUTCMilliseconds())+String(someRandom);
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


export {createPasswordHash,checkPasswordHash,createUserId,signJwt,verifyJwt}