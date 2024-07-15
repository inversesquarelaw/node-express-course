const mongoose = require('mongoose');
const { use } = require('../routes/tasks');


// it is best practice to connect to the database 1st before starting the server, in case there is an error connecting to the database
const connectDB = (url) => {
    return mongoose.connect(
            url,
            {
                userNewUrlParser: true,
                useUnifiedTopology: true,
                useFindAndModify: false,
                useCreateIndex: true
            })
        //.then(() => { console.log('CONNECTED TO THE DATABASE...') })
        //.catch((err) => { console.log(err) });
}

module.exports = connectDB;