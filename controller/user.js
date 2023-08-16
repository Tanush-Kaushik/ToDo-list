import { users } from "../models/user.js"
import bcrypt from 'bcrypt';
import { sendCookie } from "../utils/features.js";
import jwt from "jsonwebtoken";



export const getAllUsers=async(req,res)=>{

}



export const postNewUser = async(req,res)=>{ // register
    
    let user = await users.findOne({email:req.body.email})

    if(user){
        return res.json({
            message:'user already exists'
        })
    }

    const hashedPassword = await bcrypt.hash(req.body.password,10)

    user = await users.create({
        name:req.body.name,
        email:req.body.email,
        password:hashedPassword
    })

    sendCookie(user,res,`${req.body.name} registered succesfully`)
}



export const getUserDetails = async(req,res)=>{  

    res.json({
        user:req.user
    })
}
 


export const login = async(req,res)=>{
    
    const user = await users.findOne({email:req.body.email}).select('+password')

    if(!user){
        return res.json({
            message:"user not found in DB"
        })
    }

    const isMatch = await bcrypt.compare(req.body.password,user.password)

    if(!isMatch){
        return res.json({
            message:'wrong password or email'
        })
    }

    sendCookie(user,res,`${req.body.name} welcome back`);
}


export const logout = (req,res)=>{
    res.cookie('token',null,{
        expires:new Date(Date.now()),
        sameSite:process.env.NODE_ENV=='Development'?'lax':'none',
        secure: process.env.NODE_ENV=='Development'?false: true
    }).json({
        message:'logged out'
    })
}
