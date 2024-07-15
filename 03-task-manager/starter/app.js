const express = require('express');
const app = express();
const tasks = require('./routes/tasks');
const connectDB = require('./db/connect');
require('dotenv').config();
const notFound = require('./middleware/not-found');
const errorHandlerMiddleware = require('./middleware/error-handler');

// middleware - the order of the below middleware is important
//.static method serves static files such as images, CSS files, and JavaScript files
app.use(express.static('./public'));
//.json() method parses incoming requests with JSON payloads
app.use(express.json());

// routes
/*
app.get('/hello', (req, res) => {
    res.send('Task Manager App');
});
*/

app.use('/api/v1/tasks', tasks);

// not found route - this has to be near the last route, but before the error handler
app.use(notFound);

// error handler middleware - this has to be the last middleware
app.use(errorHandlerMiddleware);

/*
app.get('/api/v1/tasks')            // get all tasks
app.post('/api/v1/tasks')           // create a new task
app.get('/api/v1/tasks/:id')        // get a single task
app.patch('/api/v1/tasks/:id');     // update task
app.delete('/api/v1/tasks/:id');    // delete task
*/

const start = async () => {
    try {
        await connectDB(process.env.MONGO_URI);
        app.listen(3000, console.log('Server is listening on port 3000...') );
    } catch (err) {
        console.log(err);
    }
}

start();