//TODO: npm run test -- --spec="./src/api/tests/Products/getById.test.ts"

import { ADMIN_PASSWORD, ADMIN_USERNAME } from '../../../config/environment';
import { STATUS_CODES } from '../../../data/api/statusCodes';
import ProductsController from '../../controllers/products.controller';
import signInController from '../../controllers/signIn.controller';
import { ICredentials } from '../../../data/credentials';
import { validateJsonSchema, validateResponse } from '../../../utils/validation/apiValidation';
import { generateProductData } from '../../../data/Products/generateProduct';
import { IProduct } from '../../../data/types/product.types';
import { productResponseSchema } from '../../../data/jsonSchemas/product.schema';
import { generateRandomId } from '../../../utils/id/radnomId.ts';

describe('[API] [Products] Get product by Id', async function () {
  const loginBody: ICredentials = {
    username: ADMIN_USERNAME,
    password: ADMIN_PASSWORD,
  };

  let token = '';
  let id: string;
  let productData: IProduct;

  beforeEach(async function () {
    const loginResponse = await signInController.login(loginBody);
    expect(loginResponse.status).toBe(STATUS_CODES.OK);
    token = loginResponse.headers.get('authorization')!;
    expect(token).not.toBe(undefined);
    productData = generateProductData();
    const createdProductResponse = await ProductsController.create(productData, token);
    const body = await createdProductResponse.json();
    id = body.Product._id;
  });

  afterEach(async function () {
    const response = await ProductsController.delete(id, token);
    expect(response.status).toBe(STATUS_CODES.DELETED);
  });

  it('Should get product by existing Id', async function () {
    const getProductResponse = await ProductsController.get(id, token);
    expect(getProductResponse.status).toBe(STATUS_CODES.OK);
    const body = await getProductResponse.json();
    validateResponse(body, true, null);
    validateJsonSchema(productResponseSchema, body);
    const product = body.Product;
    expect(product).toMatchObject({ ...productData });
  });

  it('Should return 404 error for valid but non existing Id', async function () {
    const nonExistentId = generateRandomId();
    const getProductResponse = await ProductsController.get(nonExistentId, token);
    expect(getProductResponse.status).toBe(STATUS_CODES.NOT_FOUND);
  });

  it('Should return 400 error for invalid Id', async function () {
    const invalidId = 'invalidId';
    const getProductResponse = await ProductsController.get(invalidId, token);
    expect(getProductResponse.status).toBe(STATUS_CODES.BAD_REQUEST);
  });

  it('Should return 401 error for invalid token', async function () {
    const invalidToken = '';
    const getProductResponse = await ProductsController.get(id, invalidToken);
    expect(getProductResponse.status).toBe(STATUS_CODES.NOT_AUTHORIZED);
  });
});
