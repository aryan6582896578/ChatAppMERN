import dotenv from "dotenv";
dotenv.config();
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
const saltCount = process.env.saltCount;

export function signJwt(username, userId) {
  const createJwtToken = jwt.sign({ username: username, userId: userId, test: true },process.env.privateKey);
  return createJwtToken;
}

export function verifyJwt(token) {
  try {
    const verifyJwtToken = jwt.verify(token, process.env.privateKey);
    return verifyJwtToken;
  } catch (error) {
    console.log("invalid jwt");
  }
}

export async function createPasswordHash(plainPassword) {
  const hashedPassword = await bcrypt.hash(plainPassword, parseInt(saltCount));
  return hashedPassword;
}

export async function checkPasswordHash(plainPassword, hashedPassword) {
  const isHashedPassword = await bcrypt.compare(plainPassword, hashedPassword);
  return isHashedPassword;
}
