const express = require('express');
const app = express();
const tasks = require('./routes/tasks');

app.use(express.static('./public'));

// middleware
app.use(express.json());

// routes
app.get('/hello', (req, res) => {
    res.send('Task Manager App');
});

app.use('/api/v1/tasks', tasks);

/*
app.get('/api/v1/tasks')            // get all tasks
app.post('/api/v1/tasks')           // create a new task
app.get('/api/v1/tasks/:id')        // get a single task
app.patch('/api/v1/tasks/:id');     // update task
app.delete('/api/v1/tasks/:id');    // delete task
*/

app.listen(3000, () => {
    console.log('Server is listening on port 3000...');
})