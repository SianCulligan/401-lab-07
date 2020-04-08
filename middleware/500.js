'use strict';


const properError = (req, res, next) => {
  res.status(500);
  res.statusMessage('Internal Server Error');
  res.end();

};

module.exports = properError;