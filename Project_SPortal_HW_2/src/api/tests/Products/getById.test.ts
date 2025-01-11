//TODO: npm run test -- --spec="./src/api/tests/Products/getById.test.ts"
import { STATUS_CODES } from '../../../data/api/statusCodes';
import ProductsController from '../../controllers/products.controller';
import { validateJsonSchema, validateResponse } from '../../../utils/validation/apiValidation';
import { productResponseSchema } from '../../../data/jsonSchemas/product.schema';
import { generateRandomId } from '../../../utils/id/radnomId.ts';
import { SignInApiService } from '../../service/signInApiService.service.ts';
import productApiService from '../../service/productApiService.service';

describe('[API] [Products] Get product by Id', async function () {
  const signInApiService = new SignInApiService();

  beforeEach(async function () {
    const token = await signInApiService.signInAsAdmin();
    await productApiService.create(token);
  });

  afterEach(async function () {
    await productApiService.delete(signInApiService.getToken());
  });

  it('Should get product by existing Id', async function () {
    const getProductResponse = await ProductsController.get(
      productApiService.getCreatedProduct()._id,
      signInApiService.getToken()
    );
    const body = getProductResponse.body;
    validateResponse(getProductResponse, STATUS_CODES.OK, true, null);
    validateJsonSchema(productResponseSchema, getProductResponse);
    const product = body.Product;
    expect(product).toMatchObject({ ...productApiService.getCreatedProduct() });
  });

  it('Should return 404 error for valid but non existing Id', async function () {
    const nonExistentId = generateRandomId();
    const getProductResponse = await ProductsController.get(nonExistentId, signInApiService.getToken());
    expect(getProductResponse.status).toBe(STATUS_CODES.NOT_FOUND);
  });

  it('Should return 400 error for invalid Id', async function () {
    const invalidId = 'invalidId';
    const getProductResponse = await ProductsController.get(invalidId, signInApiService.getToken());
    expect(getProductResponse.status).toBe(STATUS_CODES.BAD_REQUEST);
  });

  it('Should return 401 error for invalid token', async function () {
    const invalidToken = '';
    const getProductResponse = await ProductsController.get(productApiService.getCreatedProduct()._id, invalidToken);
    expect(getProductResponse.status).toBe(STATUS_CODES.NOT_AUTHORIZED);
  });
});
