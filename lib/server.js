'use strict';

const express = require('express');

//Do not modify data yet - for now, in memory changes. Below line can be deleled later
let data = require('../db.json');
const notFound = require('../middleware/404.js');
const logger = require('../middleware/logger.js');

const app = express();


//Application Middleware
//this line will check all formats to ensure json formatting
app.use(express.json());
app.use(logger);

const startServer = (port) =>  {
  app.listen(port, () => {
    console.log('Server is up and running on port', port);
  });
};

app.get('/', (request, response) => {
  console.log('headers', request.headers);
  console.log('body', request.body);
  console.log('params', request.params);
  console.log('query', request.query);


  let homeHTML = '<div>Homepage</div>';

  if (request.query.name)
    homeHTML += 'Welcome ' + request.query.name;
  else homeHTML += '</div>';

  response.send(homeHTML);

});

//PRODUCT ROUTES
//CREATE
app.post('/products', (request, response, next) => {
  // let products = data.products;
  let newProduct = request.body;

  newProduct.id = data.products.length +1;

  data.products.push(newProduct);
  response.status(201);
  response.send(newProduct);
});

//READ
app.get('/products', (request, response, next) => {
  console.log('attempting to get product');
  next();
},  (request, response) => {
  response.send(data.products);
});

//UPDATE - catch replaces some, put = replace all
app.put('/products/:id', (request, response, next) => {

  data.products[request.params.id - 1] = {...request.body, id: parseInt(request.params.id)};

  console.log('PUT FUNCTION,', data.products[request.params.id - 1]);

  response.send(data.products(parseInt[request.params.id -1]));
//see 237 for final update
});

//DELETE
app.delete('/products/:id', (request, response, next) => {
   
});





//CATEGORY ROUTES
app.post('/categories', (request, response) => {
  let newCategory = request.body;

  newCategory.id = data.Categories.length +1;
  
  data.Categories.push(newCategory);
  
  
  response.status(201);
  response.send(newCategory);
});


app.get('/categories', (request, response, next) => {
  console.log('attempting to get categories');
  next();
},  (request, response) => {
  response.send(data.categories);
});


app.put('/categories/:id', (request, response) => {
   
});

app.delete('/categories/:id', (request, response) => {
   
});




//ANY request, if it doesn't match above, send the 404. This runs top to bottom = put things ooorder, will not work
app.use('*', notFound);

module.exports = {
  server: app,
  start: startServer,
};