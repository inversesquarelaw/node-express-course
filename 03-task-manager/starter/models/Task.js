const mongoose = require('mongoose');

const TaskSchema = new mongoose.Schema({
    // key value pairs for the schema: name, completed

    name: { 
        type: String,                                   // this schema requires a string for the name
        required: [true, 'must provide a name'],        // this validation requires that a name is provided
        true: true,                                    // this validation requires that the name is not empty
        maxlength: [20, 'name can not be more than 20 characters'], // this validation requires that the name is not more than 20 characters long
    },
    completed: {
        type: Boolean,
        default: false,                                 // "Completed" checkbox is false by default
    }
});

module.exports = mongoose.model('Task', TaskSchema);