const jwt = require('jsonwebtoken');
const { UnauthenticatedError } = require('../errors/index');

const authMiddleware = async (req, res, next) => {
    const authHeader = req.headers.authorization;
    //console.log('auth header:', authHeader);
    if( !authHeader || !authHeader.startsWith('Bearer ') ) {
        throw new UnauthenticatedError('No token provided');
    }
    // seperate the token from the 'Bearer'
    const token = authHeader.split(' ')[1];
    //console.log('JWT token:', token);

    try {
        // decode the JWT
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        //console.log('decoded:', decoded);

        // destructure the id and username from the decoded object
        const { id, username } = decoded;
        
        // add a new property to the req object (user) with the id and username we just decoded
        req.user = { id, username };

        //console.log('req.user:', req.user );

        // call the next middleware
        next();

    } catch (error) {
        // if the verify throws an error/exception, it means the token is invalid
        throw new UnauthenticatedError('Not authorized to access this route');
    }
}

module.exports = authMiddleware;