const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        require: [true, 'Product name is required']
    },
    price: {
        type: Number,
        require: [true, 'Product price is required']
    },
    featured: {
        type: Boolean,
        default: false
    },
    rating: {
        type: Number,
        default: 4.5
    },
    createdAt: {
        type: Date,
        default: Date.now()
    },
    company: {
        type: String,
        enum: {
            values: ['ikea', 'liddy', 'caressa', 'marcos'],
            message: '{VALUE} is not supported'
        }
    }
});

// 2 lines is euqivalent to the 1 line below
const Products = mongoose.model('Product', productSchema);
module.exports = Products

// this syntax is wrong
//mongoose.model('Product', productSchema);
//module.exports = mongoose.model;

// this 1 line is equivalent to the 2 lines above
//module.exports = mongoose.model('Product', productSchema);