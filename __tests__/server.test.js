'use strict';

const app = require('../lib/server.js');
const supergoose = require('@code-fellows/supergoose');

const mockRequest = supergoose(app.server);

//PRODUCT ROUTE TESTS
describe('product routes work', () => {
  it('can GET (read) products', async () => {
    let response = await mockRequest.get('/products');
    //check screen shot at 209 for other way of calling the about line
    // console.log('GET body',response.body);
    // console.log('GET status', response.status);
    //look for status, statusCode, &/or statusMessage in 'response'
    expect(JSON.stringify(response.body)).toBe(JSON.stringify([
      { id: 1, category: 'shirt', name: 'Black shirt', display_name: 'Black short sleeve shirt', description: 'Stay Home Club Black Shirt'},
      { id: 2, category: 'pants', name: 'Black pants', display_name: 'Distressed black pants', description: 'Topshop black pants'},
      { id: 3, category: 'flat_shoes', name: 'Black flats', display_name: 'Black print shoes', description: 'Louis Et Cie black flats'},
      {category: 'sweatshirt', name: 'Black sweatshirt', display_name: 'Black long sleeve fleece', description: 'Express black lace up fleece', id: 4},
    ]),
    ),
    expect(response.status).toBe(200);
  });

  it('can POST (create) products', async () => {
    let newProductData = JSON.stringify({
      'category': 'tank top',
      'name': 'White tank top',
      'display_name': 'White sleeveless shirt',
      'description': 'H&M white tank top',
    });
    // console.log('TO STRING', newProductData);
    let response = await mockRequest.post('/products');
    let str = response.status;
    // console.log('RESPONSE', response.status);
    expect(str).toBe(201);
  });

  it('can PUT (update) products', async () => {
    let updatedProductData = JSON.stringify({
      'category': 'shoes',
      'name': 'pink flats',
      'display_name': 'Pink bow flats',
      'description': 'Aldo Slip-ons',
    });
    // console.log('TO STRING', updatedProductData);
    let response = await mockRequest.put('/products:1').send(updatedProductData);
    let str = response.status;
    // console.log('RESPONSE', response.status);
    expect(str).toBe(201);
  });

  it('can DELETE (delete, duh) products', async () => {
    let response = await mockRequest.delete('/products:1');
    let str = response.status;
    // console.log('RESPONSE', str);
    expect(str).toBe(201);
  });
});

//CATEGORY ROUTE TESTS
describe('Category routes work', () => {
  it('can GET (read) categories', async () => {
    let response = await mockRequest.get('/categories');
    // console.log('CAT! TEST', response);
    // console.log('CAT! TEST.body', JSON.stringify(response.body));
    // console.log('CAT! TEST.status', response.status);
    expect(JSON.stringify(response.body)).toBe(JSON.stringify([
      { id: 1, name: 'shirt', display_name: 'T-shirt', description: 'Short sleeves'},
      { id: 2, name: 'pants', display_name: 'Pants', description: 'Denim'},
      { id: 3, name: 'flat_shoes', display_name: 'Shoes', description: 'Flat shoes'},
    ]),
    ),
    expect(response.status).toBe(200);
  });

  it('can POST (create) categories', async () => {
    let newCategoryData = JSON.stringify({
      'name': 'dress',
      'display_name': 'Dresses',
      'description': 'long-dresses',
    });
    console.log('TO STRING', newCategoryData);
    let response = await mockRequest.post('/categories');
    let str = response.status;
    console.log('RESPONSE', response.body);
    expect(JSON.stringify(response.body)).toBe(JSON.stringify([
      { id: 1, name: 'shirt', display_name: 'T-shirt', description: 'Short sleeves'},
      { id: 2, name: 'pants', display_name: 'Pants', description: 'Denim'},
      { id: 3, name: 'flat_shoes', display_name: 'Shoes', description: 'Flat shoes'},
      { name: 'dress', display_name: 'Dresses', description: 'long-dresses', id: 4 },
    ]),
    ),
    expect(str).toBe(200);
  });

  it('can PUT (update) categories', async () => {
    let updatedCategoryData = JSON.stringify({
      'category': 'shoes',
      'name': 'pink flats',
      'display_name': 'Pink bow flats',
      'description': 'Aldo Slip-ons',
    });
    // console.log('TO STRING', updatedCategoryData);
    let response = await mockRequest.put('/categories:1').send(updatedCategoryData);
    let str = response.status;
    // console.log('RESPONSE', response.status);
    expect(str).toBe(201);
  });

  it('can DELETE (delete, duh) categories', async () => {
    let response = await mockRequest.delete('/categories:1');
    let str = response.status;
    // console.log('RESPONSE', str);
    expect(str).toBe(201);
  });
});












//MIDDLEWARE TEST
describe('middleware works', () => {
  it('gives a 404 error when accessing', async () => {
    let response = await mockRequest.delete('/categories:1111');
    let str = response.status;
    // console.log('RESPONSE', response.status);
    expect(str).toBe(404);
  });

});