'use strict';

const app = require('../lib/server.js');
const supergoose = require('@code-fellows/supergoose');

const mockRequest = supergoose(app.server);

describe('product routes work', () => {
  it('can GET (read) products', async () => {
    let response = await mockRequest.get('/products');
    //check screen shot at 209 for other way of calling the about line
    console.log('GET body',response.body);
    console.log('GET status', response.status);
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
    let originalLength = data.products.length;

    console.log('original', originalLength);
    let newProductData = JSON.stringify({
      'category': 'tank top',
      'name': 'White tank top',
      'display_name': 'White sleeveless shirt',
      'description': 'H&M white tank top',
    });
    let response = await mockRequest.post('/products');

    console.log('TEST TWO RESPONSE', response.body.id);
    expect(response.body.id).toBe()
  });
});



//   it('can update products', async () => {

//     

//     expext(JSON.stringify(id: 1, name: 'Black shirt',display_name': 'Black short sleeve shirt' ))
//     //finish the test at 2:34 - this is corrected (test at 229 will not pass)
// });
// }


// describe('middelware works', () => {
//     it('gives a 404 error when accessing', async () => {
//         let response = .status
//     })
//     //see 251 screenshot for 404 test
// })
