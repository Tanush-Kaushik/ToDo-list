import express from 'express';
import mongoose from 'mongoose';
import userRouter from './routes/user.js'
import { config } from 'dotenv';
import cookieParser from 'cookie-parser';
import taskRouter from './routes/task.js'
import { errorMiddleware } from './middlewares/errors.js';
import cors from 'cors';

export const app=express();

config({path:'./config.env'})

app.use(express.urlencoded({extended:true}))
app.use(express.json())
app.use('/users',userRouter);
app.use(cookieParser())
app.use('/tasks',taskRouter)
app.use(cors({
    origin:[process.env.FRONTEND_URI],
    methods:['GET','POST','PUT','DELETE'],
    credentials:true
}))

app.use((req,res)=>{res.setHeader("Access-Control-Allow-Origin", "*");
res.setHeader("Access-Control-Allow-Headers", "X-Requested-With"); 
res.setHeader("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
res.setHeader("X-Powered-By",' 3.2.1');
res.setHeader("Content-Type", "application/json;charset=utf-8");})


mongoose.connect(process.env.MONGO_URI,{
    dbName:'backendAPI'
}).then(()=>console.log("DB connected")).catch((e)=>console.log(e));


app.get('/',(req,res)=>{
    res.send('hell yeah')
})

app.use(errorMiddleware)


app.listen(process.env.PORT,()=>{
    console.log(`server at 4000 on ${process.env.NODE_ENV} mode`);
})
