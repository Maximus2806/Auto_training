//TODO: npm run test -- --spec="./src/api/tests/Products/create.test.ts"
import { STATUS_CODES } from '../../../data/api/statusCodes';
import { generateProductData } from '../../../data/Products/generateProduct';
import ProductsController from '../../controllers/products.controller';
import { SignInApiService } from '../../service/signInApiService.service';
import productApiService from '../../service/productApiService.service';

describe('[API] [Products] Create', async function () {
  const signInApiService = new SignInApiService();
  let id = '';

  beforeEach(async function () {
    await signInApiService.signInAsAdmin();
  });

  afterEach(async function () {
    const response = await ProductsController.delete(id, signInApiService.getToken());
    expect(response.status).toBe(STATUS_CODES.DELETED);
  });

  it('Should create product with smoke data', async function () {
    const productData = generateProductData();
    const createdProduct = await productApiService.create(signInApiService.getToken(), productData);
    id = createdProduct._id;
    const getProduct = (await ProductsController.get(id, signInApiService.getToken())).body.Product;
    expect(createdProduct).toMatchObject({ ...getProduct });
  });
});
