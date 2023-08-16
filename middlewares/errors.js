class errorHandler extends Error{
    constructor(message,statusCode){
        super(message)
        this.statusCode=statusCode
    }
}


export const errorMiddleware = (err,req,res,next)=>{
    return res.status(err.statusCode).json({
        message:'invalid',
        errorName:err.message
    })
}

export default errorHandler;