import jwt from "jsonwebtoken";
import { prisma } from "../config/db.js";

export const authMiddleware = async(req, res, next) => {

  let token;
  if(req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
    token = req.headers.authorization.split(" ")[1];
  } else if(res.cookies?.jwt){
    token = res.cookies.jwt;
  }

  if(!token) {
    return res.status(401).json({error: "Not Authorized"})
  }

  try{

    const decode = jwt.verify(token, process.env.JWT_SECRET)

    const user = await prisma.user.findUnique({
      where: {
        id: decode.id
      }
    })

    if(!user) {
      return res.status(401).json({error: "User does not exist!"})
    }

    req.user = user;
    next()
  } catch {
    return res.status(401).json({error: "Not authorized"})
  }
}