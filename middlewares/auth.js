import { users } from "../models/user.js";
import jwt from "jsonwebtoken";

export const isAuthenticated =async(req,res,next)=>{
    const {token} = req.cookies;

    if(!token){ 
        return res.json({ 
            message:'login first'
        })
    }

    const decoded = jwt.verify(token,process.env.JWT_SECRET)

    req.user= await users.findById(decoded._id)
    next();
}