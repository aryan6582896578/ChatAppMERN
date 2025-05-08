import dotenv from "dotenv";
dotenv.config();
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken"
const saltCount = process.env.saltCount

export function signJwt(username,userId){
let createJwtToken = jwt.sign({ username:username ,userId:userId ,test:true}, process.env.privateKey)
return(createJwtToken)
}

export function verifyJwt(token){
try {
    let verifyJwtToken =jwt.verify(token, process.env.privateKey);
    return verifyJwtToken
} catch (error) {
    console.log("invalid jwt")
}
}


export async function createPasswordHash(plainPassword){
   let hashedPassword =await bcrypt.hash(plainPassword, parseInt(saltCount))
   return hashedPassword;
}
export async function checkPasswordHash(plainPassword,hashedPassword){
    let isHashedPassword =await bcrypt.compare(plainPassword, hashedPassword)
     return isHashedPassword;
 }