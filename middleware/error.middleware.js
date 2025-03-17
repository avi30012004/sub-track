const errorMiddleware = (err, req, res, next) => {
    try{
        let error = { ...err };
        error.message = err.message;
        console.log(err);


        // Mongoose bad object
        if(err.name === 'casterror') {
            const message = "Resource not found. Invalid";
            error = new Error(message);
            error.statusCode = 404;
        }
        // Mongoose duplicate key
        if(err.code === 11000) {
            const message = "Duplicate field value entered";
            error = new Error(message);
            error.statusCode = 400;
        }
        // Mongoose validation error
        if(err.name === 'validationerror') {
            const message = Object.values(err.errors).map(value => value.message);
            error = new Error(message.join(", "));
            error.statusCode = 400;
        }
        res.status(error.statusCode || 500).json({
            success:false,
            error:error.message || "server error",
        });
    }catch(error){
        next(error);
    }

}
export default errorMiddleware;