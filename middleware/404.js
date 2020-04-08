'use strict';

//404 isa n error when client tryes to request something the server can;t find

const notFound = (req, res, next) => {
    //we couldn't find it so set status code to 404 & send error message
    res.status(404);
    //no message, just end, no need to look any further
    res.end();

};

module.exports = notFound;