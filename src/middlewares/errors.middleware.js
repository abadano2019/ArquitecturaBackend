export const errorMiddleware = (error,req,res,next)=>{
    console.log("entre al middleware de errores")
    res.send({
        status:error.name,
        message: error.message,
        cause: error.cause,
        number: error.Number,
    })
}