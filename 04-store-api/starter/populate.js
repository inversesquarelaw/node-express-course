// this puts some starting data in the mongoDB database from a json file
require('dotenv').config();

// import the logic to connect to the database
const connectDB = require('./db/connect');

// import the product model
const Product = require('./models/product');

// this is the file that has all the data/products
const jsonProducts = require('./products.json');

const start = async () => {
    try { 
        await connectDB(process.env.MONGO_URI);

        // clear the previous things in the database
        await Product.deleteMany()

        // this adds the data from the json file to the database
        await Product.create(jsonProducts);

        console.log("Connected to the database...");

        // we successfully added the data to the database and exit the populating process with '0' status
        process.exit(0);
    } catch (error) {
        console.log(error);

        // we failed to add the data to the database and exit the populating process with '1' status
        process.exit(1);
    }
}
start();
// to run this file, type 'node populate.js' in the terminal