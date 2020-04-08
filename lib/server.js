'use strict';

const express = require('express');

let data = require('../db.json');
const notFound = require('../middleware/404.js');
const properError = require('../middleware/500.js');
const logger = require('../middleware/logger.js');

const app = express();

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
  console.log('attempting to create a product');
  next();
}, (request, response) => {
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
  console.log('attempting to replace a product');
  next();
}, (request, response) => {
  let modifiedRecord = data.products = request.body;
  modifiedRecord.id = request.params.id;
  data.products[request.params.id] = modifiedRecord;
  response.send(modifiedRecord);
});

//PATCH - replaces SOME of the query, not the whole record
app.patch('/products/:id', (request, response, next) => {
  console.log('attempting to update a product');
  next();
}, (request, response) => {
  let foundRecord = data.products[request.params.id - 1];
  let modifiedRecord = {...foundRecord, ...request.body};
  data.products[request.params.id] = modifiedRecord;
  response.send(modifiedRecord);
});

//DELETE
app.delete('/products/:id', (request, response, next) => {
  console.log('attempting to delete a category');
  next();
}, (request, response) => {
  let products = data.products;
  products.filter(val => {
    if(val.id === parseInt(request.params.id))
      return false;
    else
      return true;
  });
  response.send('Product successfully deleted.');
});

//CATEGORY ROUTES
app.post('/categories', (request, response, next) => {
  console.log('attempting to create a category');
  next();
}, (request, response) => {
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


app.put('/categories/:id', (request, response, next) => {
  console.log('attempting to replace a category');
  next();
}, (request, response) => {
  let modifiedRecord = data.categories = request.body;
  modifiedRecord.id = request.params.id;
  data.categories[request.params.id] = modifiedRecord;
  response.send(modifiedRecord);
});

app.patch('/categories/:id', (request, response, next) => {
  console.log('attempting to update a category');
  next();
}, (request, response) => {
  let foundRecord = data.categories[request.params.id - 1];
  let modifiedRecord = {...foundRecord, ...request.body};
  data.categories[request.params.id] = modifiedRecord;
  response.send(modifiedRecord);
   
});

app.delete('/categories/:id', (request, response, next) => {
  console.log('attempting to delete a category');
  next();
}, (request, response) => {
  let category = data.category;
  category.filter(val => {
    if(val.id === parseInt(request.params.id))
      return false;
    else
      return true;
  });
  response.send('Category successfully deleted.');
});

//ANY request, if it doesn't match above, send the 404. This runs top to bottom = put things out of order, will not work
app.use('*', notFound);

module.exports = {
  server: app,
  start: startServer,
};