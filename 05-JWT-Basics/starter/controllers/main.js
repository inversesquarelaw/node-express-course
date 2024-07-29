const CustomAPIError = require('../errors/custom-error');

const login = async (req, res) => {
    const { username, password } = req.body;

    // different ways to validate the data
    // 1. mongoose validation
    // 2. JOI
    // 3. check in the controller
    
    if( !username || !password ) {
        // if username as password are not provided, throw an error
        throw new CustomAPIError('Please provide email or password', 400);
    }

    //console.log( username, password );
    res.send('Fake Login/Register/Signup Route');
};

// here is the controller/logic for the route
const dashboard = async (req, res) => {
    const luckyNumber = Math.floor(Math.random() * 100);
    res.status(200)
        .json({ 
            msg: `Hello John`, 
            secret: `Here is your authorized data, your lucky number is ${luckyNumber}`
        });
};

module.exports = {
    login,
    dashboard
}
