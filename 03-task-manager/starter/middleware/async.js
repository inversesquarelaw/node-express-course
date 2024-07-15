// wraps the async function in a try catch block
// a wrapper is a function that takes another function and adds some functionality to it
const asyncWrapper = (fn) => {
    // wrapper in javascript is possible because functions are first-class citizens and closures
    // are wrappers curry functions? https://javascript.info/currying-partials

    // we are returning a function that takes in the req, res, and next parameters
    return async (req, res, next) => {
        try {
            // we are calling the function that we passed to asyncWrapper
            // javascript syntax can invoke a function by using the parentheses with the function name as in fn(req, res, next)
            await fn(req, res, next);
        } catch (error) {
            // we are passing the error to the next middleware
            next(error);
        }
    }

}

module.exports = asyncWrapper;