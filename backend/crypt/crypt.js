import dotenv from "dotenv";
dotenv.config();
import bcrypt from "bcrypt";
const saltCount = process.env.saltCount
async function createPasswordHash(plainPassword){
   let hashedPassword =await bcrypt.hash(plainPassword, parseInt(saltCount))
   return hashedPassword
}
async function checkPasswordHash(plainPassword,hashed){
    let passwordHash =await bcrypt.compare(plainPassword, hashed)
     return passwordHash
 }


export {createPasswordHash,checkPasswordHash}