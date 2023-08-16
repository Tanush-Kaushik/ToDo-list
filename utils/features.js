import jwt from "jsonwebtoken";


export const sendCookie = (user,res,message)=>{
    const token = jwt.sign({_id:user._id},process.env.JWT_SECRET)

    res.status(201).cookie('token',token,{
        httpOnly:true,
        maxAge:15*60*1000,  // given directly in millisecs
        sameSite:process.env.NODE_ENV=='Development'?'lax':'none',
        secure: process.env.NODE_ENV=='Development'?false: true   // cookies wont be produced in postman because of this
    }).json({
        message
    })
}