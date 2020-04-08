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


/**
 * This route gives you a standard "Homepage" message
 * @route GET /
 * @param {string} name.query - a name field which adds a welcome message
 * @produces text/html
 * @returns {object} 200 - The HTML to show on the homepage
 */
app.get('/', (request, response) => {
  let homeHTML = '<div>Homepage</div>';
  if (request.query.name)
    homeHTML += 'Welcome ' + request.query.name;
  else homeHTML += '</div>';
  response.status(200);
  response.send(homeHTML);
});

//PRODUCT ROUTES


//CREATE

/**
 * This route allows you to CREATE a product
 * @route POST /products
 * @group products
 * @returns {object} 200 - The created object in the array
 * @returns {error} - if there was an issue creating a product
 */
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
/**
 * This route allows you to GET all products
 * @route GET /products
 * @group products
 * @returns {object} 200 - All objects in the array
 * @returns {error} - if there was an issue reading the product list
 */
app.get('/products', (request, response, next) => {
  console.log('attempting to get product');
  next();
},  (request, response) => {
  response.send(data.products);
});

//UPDATE - catch replaces some, put = replace all
/**
 * This route allows you to UPDATE a product
 * @route PUT /products/:id
 * @group products
 * @params {number} id.params.required - the id of the field you want to update
 * @returns {object} 200 - The updated object in the array
 * @returns {error} - if there was an issue updating a product
 */
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
/**
 * This route allows you to patch UPDATE a product's individual fields
 * @route PATCH /products/:id
 * @group products
 * @params {number} id.params.required - the id of the field you want to update
 * @returns {object} 200 - The updated object in the array
 * @returns {error} - if there was an issue updating a product
 */
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
/**
 * This route allows you to DELETE a product
 * @route DELETE /products/:id
 * @group products
 * @params {number} id.params.required - the id of the field you want to delete
 * @returns {object} 200 - A message stating the delete was successful
 * @returns {error} - if there was an issue deleting a product
 */
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
/**
 * This route allows you to CREATE a category
 * @route POST /categories
 * @group categories
 * @returns {object} 200 - The created object in the array
 * @returns {error} - if there was an issue creating a category
 */
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

/**
 * This route allows you to GET all categories
 * @route GET /categories
 * @group categories
 * @returns {object} 200 - All objects in the array
 * @returns {error} - if there was an issue reading the category list
 */
app.get('/categories', (request, response, next) => {
  console.log('attempting to get categories');
  next();
},  (request, response) => {
  response.send(data.categories);
});

/**
 * This route allows you to UPDATE a category
 * @route PUT /categories/:id
 * @group categories
 * @params {number} id.params.required - the id of the field you want to update
 * @returns {object} 200 - The updated object in the array
 * @returns {error} - if there was an issue updating a category
 */
app.put('/categories/:id', (request, response, next) => {
  console.log('attempting to replace a category');
  next();
}, (request, response) => {
  let modifiedRecord = data.categories = request.body;
  modifiedRecord.id = request.params.id;
  data.categories[request.params.id] = modifiedRecord;
  response.send(modifiedRecord);
});

/**
 * This route allows you to patch UPDATE a category's individual fields
 * @route PATCH /categories/:id
 * @group categories
 * @params {number} id.params.required - the id of the field you want to update
 * @returns {object} 200 - The updated object in the array
 * @returns {error} - if there was an issue updating a category
 */
app.patch('/categories/:id', (request, response, next) => {
  console.log('attempting to update a category');
  next();
}, (request, response) => {
  let foundRecord = data.categories[request.params.id - 1];
  let modifiedRecord = {...foundRecord, ...request.body};
  data.categories[request.params.id] = modifiedRecord;
  response.send(modifiedRecord);
   
});


/**
 * This route allows you to DELETE a category
 * @route DELETE /categories/:id
 * @group categories
 * @params {number} id.params.required - the id of the field you want to delete
 * @returns {object} 200 - A message stating the delete was successful
 * @returns {error} - if there was an issue deleting a category
 */
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