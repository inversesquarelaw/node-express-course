const CustomAPIError = require('./custom-error');
const BadRequestError = require('./bad-request');
const UnauthenticatedError = require('./unauthenticated');
// we put all the errors in index.js so that we can import all the errors from a single file
module.exports = {
    CustomAPIError,
    BadRequestError,
    UnauthenticatedError,
}