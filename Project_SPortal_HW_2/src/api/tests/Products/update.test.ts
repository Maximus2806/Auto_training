//TODO: npm run test -- --spec="./src/api/tests/Products/update.test.ts"

import { ADMIN_PASSWORD, ADMIN_USERNAME } from '../../../config/environment';
import { STATUS_CODES } from '../../../data/api/statusCodes';
import { generateProductData } from '../../../data/Products/generateProduct';
import ProductsController from '../../controllers/products.controller';
import signInController from '../../controllers/signIn.controller';
import { ICredentials } from '../../../data/credentials';
import { validateJsonSchema, validateResponse } from '../../../utils/validation/apiValidation';
import { productResponseSchema } from '../../../data/jsonSchemas/product.schema';
import { generateRandomId } from '../../../utils/id/radnomId';

describe('[API] [Products] Post', async function () {
  const loginBody: ICredentials = {
    username: ADMIN_USERNAME,
    password: ADMIN_PASSWORD,
  };

  let token = '';
  let id = '';

  beforeEach(async function () {
    const loginResponse = await signInController.login(loginBody);
    expect(loginResponse.status).toBe(STATUS_CODES.OK);
    token = loginResponse.headers.get('authorization')!;
    expect(token).not.toBe(undefined);
    const productData = generateProductData();
    const createProductResponse = await ProductsController.create(productData, token);
    expect(createProductResponse.status).toBe(STATUS_CODES.CREATED);
    const body = await createProductResponse.json();
    id = body.Product._id;
  });

  afterEach(async function () {
    const response = await ProductsController.delete(id, token);
    expect(response.status).toBe(STATUS_CODES.DELETED);
  });

  it('Should update product with smoke data', async function () {
    const producNewtData = generateProductData();
    const updatedProductResponse = await ProductsController.update(id, producNewtData, token);
    expect(updatedProductResponse.status).toBe(STATUS_CODES.OK);
    const udpdatedBody = await updatedProductResponse.json();
    validateResponse(udpdatedBody, true, null);
    validateJsonSchema(productResponseSchema, udpdatedBody);
    const updatedProduct = udpdatedBody.Product;
    expect(updatedProduct).toMatchObject({ ...producNewtData });
    const getUpdatedProductResponse = await ProductsController.get(id, token);
    const body = await getUpdatedProductResponse.json();
    const product = body.Product;
    expect(updatedProduct).toEqual({ ...product});
  });

  it('Should return 404 error for valid but non existing Id', async function () {
    const producNewtData = generateProductData();
    const nonExistentId = generateRandomId();
    const updatedProductResponse = await ProductsController.update(nonExistentId, producNewtData, token);
    expect(updatedProductResponse.status).toBe(STATUS_CODES.NOT_FOUND);
  });

  it('Should return 400 error for invalid Id', async function () {
    const producNewtData = generateProductData();
    const invalidId = 'invalidId';
    const updatedProductResponse = await ProductsController.update(invalidId, producNewtData, token);
    expect(updatedProductResponse.status).toBe(STATUS_CODES.BAD_REQUEST);
  });

  it('Should return 401 error for invalid token', async function () {
    const producNewtData = generateProductData();
    const invalidToken = '';
    const updatedProductResponse = await ProductsController.update(id, producNewtData, invalidToken);
    expect(updatedProductResponse.status).toBe(STATUS_CODES.NOT_AUTHORIZED);
  });
});
