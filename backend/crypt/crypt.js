import dotenv from "dotenv";
dotenv.config();
import bcrypt, { getRounds } from "bcrypt";
const saltCount = process.env.saltCount
async function createPasswordHash(plainPassword){
   let hashedPassword =await bcrypt.hash(plainPassword, parseInt(saltCount))
   return hashedPassword
}
async function check(plainPassword,hashed){
    let a =await bcrypt.compare(plainPassword, hashed)
     return a
 }


export {createPasswordHash,check}