const Task = require('../models/Task');
const asyncWrapper = require('../middleware/async');
const { createCustomError } = require('../errors/custom-error');

/*
// reference
app.get('/api/v1/tasks')            // get all tasks
app.post('/api/v1/tasks')           // create a new task
app.get('/api/v1/tasks/:id')        // get a single task
app.patch('/api/v1/tasks/:id');     // update task
app.delete('/api/v1/tasks/:id');    // delete task
*/


// we wrapped the async anonymous function in the asyncWrapper function
const getAllTasks = asyncWrapper( async (req, res) => {
    // we only need the try part of the code since the error handling is done in the asyncWrapper middleware
    const tasks = await Task.find( {} );
    res.status(200).json( {tasks} ); 
});

/*
const getAllTasks = async (req, res) => {
    try {
        // if we pass an empty object to the .find() method, it will return all the tasks
        const tasks = await Task.find( {} );
        // we return whatever we get back from the .find() method
        res.status(200).json( {tasks} ); // this is the same as the line below b/c the key and value are the same and it is a shorthand

        //res.status(200).json( {tasks: tasks, amount: tasks.length} );
        //res
        //  .status(200)
        //  .json({status: "success", data: {tasks, nbHits: tasks.length} });
    } catch (error) {
        res.status(500).json( {msg: error} );
    }
}
*/


const createTask = asyncWrapper( async (req, res) => {
    const task = await Task.create( req.body );
    res.status(201).json({ task });
});
/*
const createTask = async (req, res) => {
    try {
        const task = await Task.create( req.body );
        res.status(201).json({ task });
    } catch (error) {
        res.status(500).json( {msg: error} );
    }
}
*/

const getTask = asyncWrapper(async (req, res, next) => {
    const { id: taskID } = req.params;
    const task = await Task.findOne( {_id: taskID} );

    if( !task ){
        return next(createCustomError(`No task with id: ${taskID}`, 404));
        //return res.status(404).json( {msg: `No task with id: ${taskID}` } );
    }
    
    //else
    res.status(200).json( {task: task} );
});
/*
const getTask = async (req, res) => {
    try {
        const { id: taskID } = req.params;
        const task = await Task.findOne( {_id: taskID} );
    
        if( !task ){
            return res.status(404).json( {msg: `No task with id: ${taskID}` } );
        }
        
        //else
        res.status(200).json( {task: task} );
    } catch (error) {
        res.status(500).json( {msg: error} );
    }

    //res.json( {id: req.params.id} );
}
*/

const updateTask = asyncWrapper( async (req, res, next) => {
    const { id: taskID } = req.params;

    const task = await Task.findOneAndUpdate( {_id: taskID}, req.body, {new:true, runValidators:true} );

    if( !task ){
        return next(createCustomError(`No task with id: ${taskID}`, 404));
        //return res.status(404).json( {msg: `No task with id: ${taskID}` } );
    }

    res.status(200).json( { task: task });
});
/*
const updateTask = async (req, res) => {
    try {
        const { id: taskID } = req.params;

        const task = await Task.findOneAndUpdate( {_id: taskID}, req.body, {new:true, runValidators:true} );

        if( !task ){
            return res.status(404).json( {msg: `No task with id: ${taskID}` } );
        }

        res.status(200).json( { task: task });
        
        // this is like a console.log() for debugging purposes, it will echo back the id and data we send via Postman
        //res.status(200).json( { id: taskID, data: req.body });
    } catch(error) {
        res.status(500).json( {msg: error} );
    }
    //res.send('update task');
}
*/

const deleteTask = asyncWrapper( async (req, res, next) => {
    const { id: taskID } = req.params;
    const task = await Task.findOneAndDelete( {_id: taskID} );

    if( !task ){
        return next( createCustomError(`No task with id: ${taskID}`, 404));
        //return res.status(404).json( {msg: `No task with id: ${taskID}` } );
    }

    res.status(200).json( {task: task} );
});

/*
const deleteTask = async (req, res) => {
    try {
        const { id: taskID } = req.params;
        const task = await Task.findOneAndDelete( {_id: taskID} );

        if( !task ){
            return res.status(404).json( {msg: `No task with id: ${taskID}` } );
        }

        res.status(200).json( {task: task} );

    } catch(error) {
        res.status(500).json( {msg: error} );
    }   

    //res.send('delete task');
}
*/

module.exports = {
    getAllTasks,
    createTask,
    getTask,
    updateTask,
    deleteTask
}