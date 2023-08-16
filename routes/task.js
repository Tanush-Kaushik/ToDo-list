import express from "express";
import { deleteTask, getTask, newTask, updateTask } from "../controller/task.js";
import { isAuthenticated } from "../middlewares/auth.js";

const router = express.Router()

router.post('/new',isAuthenticated,newTask)

router.get('/myTasks',isAuthenticated,getTask)

router.route('/:id').put(isAuthenticated,updateTask).delete(isAuthenticated,deleteTask)


export default router;
