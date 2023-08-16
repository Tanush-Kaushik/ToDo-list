import errorHandler from "../middlewares/errors.js"
import { tasks } from "../models/task.js"



export const newTask = async(req,res,next)=>{

    try {
        const task = await tasks.create({
            title:req.body.title,
            description:req.body.description,
            user:req.user
        })
    
        res.json({
            message:'task added succesfully'
        })
    } catch (error) {
        next(error)
    }
}
 

export const getTask = async(req,res,next)=>{
 
    try {
        const task = await tasks.find({user:req.user._id})

    res.json({
        task
    })
    } catch (error) {
        next(error)
    }
}


export const updateTask = async(req,res,next)=>{

    try {
        const task  = await tasks.findById(req.params.id)

    if(!task) return next(new errorHandler('task not found',404))
    
    task.isCompleted=!task.isCompleted

    await task.save()

    res.status(200).json({
        message:'task updated'
    })
    } catch (error) {
        next(error)
    }
}


export const deleteTask = async(req,res,next)=>{

    try {
        const task  = await tasks.findById(req.params.id)
    
        if(!task) return next(new errorHandler('task not found',404))
    
        await task.deleteOne();
    
        res.status(200).json({
            message:'task deleted'
        })
    } catch (error) {
        next(error)
    }
}
