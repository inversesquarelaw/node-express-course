const { query } = require('express');
const Product = require('../models/product');

const getAllProductsStatic = async (req, res) => {
    // pass in the empty object to get all the products
    const products = await Product.find({
        // featured: true
    }).sort('-name')
      .select('name price')
      .limit(10)
      .skip(3);

    //limit and skip are used to create a pagination ability

    res.status(200).json({ nbHits: products.length, products });
    //res.status(200).json({ msg: 'products testing route' });
}

const getAllProducts = async (req, res) => {
    const { featured, company, name, sort, fields, numericFilters } = req.query;

    // we use queryObject to build the query string
    // if a query string that doesn't exist is passed in, it will be ignored and the queryObject will be empty and all results will be returned
    const queryObject = {};

    // to ensure that featured is in the query string
    if( featured ) {
        queryObject.featured = featured === 'true' ? true : false;
    }

    if( company ) {
        queryObject.company = company;
    }   

    if ( name ) {
        queryObject.name = { $regex: name, $options: 'i' };
    }

    if ( numericFilters ) {
        const operatorMap = {
            '>': '$gt',
            '>=': '$gte',
            '=': '$eq',
            '<': '$lt',
            '<=': '$lte',
        }

        const regEx = /\b(>|>=|=|<|<=)\b/g
        let filters = numericFilters.replace(
            regEx,
            (match) => `-${operatorMap[match]}-`
        );

        const options = ['price', 'rating'];
        filters = filters.split(',').forEach( (item) => {
            const [field, operator, value] = item.split('-');
            
            if( options.includes(field)  ){
                queryObject[field] = { [operator]: Number(value) };
            }

        })

        console.log(filters);
    }

    console.log( queryObject );


    let result = Product.find( queryObject );

    if( sort ){
        // split on comma and rejoin on space
        const sortList = sort.split(',').join(' ');
        result = result.sort(sortList);

        //console.log(sort);

        /*
        products = products.sort((a, b) => {
            return a.price - b.price;
        });
        */
    } else {
        result = result.sort('createdAt');
    }

    if( fields ) {
        const fieldsList = fields.split(',').join(' ');
        
        // this is the important part, not the use of the select method
        result = result.select(fieldsList);
    }

    const page = Number(req.query.page) || 1; //if no page is passed in, default to 1

    //limit and skip are used to create a pagination ability
    const limit = Number(req.query.limit) || 10; //if no limit is passed in, default to 10
    const skip = (page - 1) * limit; // this is the formula to calculate the number of items to skip

    result = result.skip(skip).limit(limit);

    const products = await result;

    res.status(200).json({ nbHits: products.length, products });
    //res.status(200).json({ msg: 'products route' });
}

module.exports = {
    getAllProductsStatic,
    getAllProducts
}