const { CustomAPIError } = require('../errors/custom-error');

// this error handler will handle HTTP 5XX type errors
const errorHandlerMiddleware = (err, req, res, next) => {
    if( err instanceof CustomAPIError) {
        return res.status(err.statusCode).json( {msg: err.message} );
    }
    
    return res.status(500).json( {msg: err.message} );
}

// this error handler will handle HTTP 4XX type errors

module.exports = errorHandlerMiddleware;