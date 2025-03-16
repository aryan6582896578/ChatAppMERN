
import dotenv from "dotenv";
dotenv.config();
import bcrypt from "bcrypt";

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


export {createPasswordHash,checkPasswordHash,createUserId}