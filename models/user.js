import mongoose from "mongoose";

const schema=new mongoose.Schema({
    name:{
        required:true,
        type:String
    },
    email:{
        type:String,
        unique:true,
        required:true
    },
    password:{
        type:String,
        select:false,
        required:true
    },
    createdAt:{
        type:Date,
        default:Date.now
    }
})

export const users=mongoose.model('Users',schema);
