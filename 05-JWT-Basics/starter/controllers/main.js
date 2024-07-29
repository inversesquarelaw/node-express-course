/*
1. check username and password in post(login) request
2. if username and password exist, create new JWT token
3. send JWT token to the client (frontend)
4. client stores the token and sends it in the header for every request
5. add functionality to authentication so that only requests with valid JWT token can access the protected routes
*/
const jwt = require('jsonwebtoken');
const {BadRequestError} = require('../errors/index');

const login = async (req, res) => {
    const { username, password } = req.body;

    // different ways to validate the data
    // 1. mongoose validation
    // 2. JOI
    // 3. check in the controller
    
    if( !username || !password ) {
        // if username as password are not provided, throw an error
        throw new BadRequestError('Please provide email or password');
    }

    // typically, you would check the username and password in the database,
    // but since we don't have a user database, we will use date as token
    const id = new Date().getDate();

    // try to keep payload small, better experience for the user
    // just for demo, we use a simple secret, but in production, use a complex, long, and ungessable secret
    const token = jwt.sign( {id, username}, process.env.JWT_SECRET, {expiresIn: '30d'} );

    res.status(200).send( {msg: 'user created', token} );
    
    //console.log( username, password );
    //res.send('Fake Login/Register/Signup Route');
};

// here is the controller/logic for the route
const dashboard = async (req, res) => {
    //console.log(req.headers);
    // const authHeader = req.headers.authorization;
    // console.log(authHeader);

    // if( !authHeader || !authHeader.startsWith('Bearer ') ) {
    //     throw new CustomAPIError('No token provided', 401);
    // }

    // const token = authHeader.split(' ')[1];
    //console.log(token);
    // try {
    //     // decode the JWT
    //     const decoded = jwt.verify(token, process.env.JWT_SECRET);

    //     const luckyNumber = Math.floor(Math.random() * 100);
    //     res.status(200)
    //         .json({ 
    //             msg: `Hello ${decoded.username}`, 
    //             secret: `Here is your authorized data, your lucky number is ${luckyNumber}`
    //         });

    // } catch (error) {
    //     // if the verify throws an error/exception, it means the token is invalid
    //     throw new CustomAPIError('Not authorized to access this route', 401);
    // }

    //console.log(req.user);
    const luckyNumber = Math.floor(Math.random() * 100);
    res.status(200)
        .json({ 
            msg: `Hello ${req.user.username}`, 
            secret: `Here is your authorized data, your lucky number is ${luckyNumber}`
        });

};

module.exports = {
    login,
    dashboard
}
