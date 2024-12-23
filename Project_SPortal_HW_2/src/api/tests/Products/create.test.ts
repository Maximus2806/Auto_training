//TODO: npm run test -- --spec="./src/api/tests/Products/create.test.ts"

import { ADMIN_PASSWORD, ADMIN_USERNAME } from "../../../config/environment";
import { STATUS_CODES } from "../../../data/api/statusCodes";
import { generateProductData } from '../../../data/Products/generateProduct';
import ProductsController from "../../controllers/products.controller";
import signInController from "../../controllers/signIn.controller";
import { ICredentials } from "../../../data/credentials";
import { validateJsonSchema, validateResponse } from "../../../utils/validation/apiValidation";
import { productResponseSchema } from "../../../data/jsonSchemas/product.schema";

describe("[API] [Products] Post", async function () {
    const loginBody: ICredentials = {
      username: ADMIN_USERNAME,
      password: ADMIN_PASSWORD,
    };
  
    let token = "";
    let id = "";
  
    beforeEach(async function () {
      const loginResponse = await signInController.login(loginBody);
  
      expect(loginResponse.status).toBe(STATUS_CODES.OK);
      token = loginResponse.headers.get("authorization")!;      
      expect(token).not.toBe(undefined);
    });

    afterEach(async function () {
      const response = await ProductsController.delete(id, token);
      expect(response.status).toBe(STATUS_CODES.DELETED);
    });

    it("Should create product with smoke data", async function () {
      const productData = generateProductData();
      const createProductResponse = await ProductsController.create(productData, token);
      expect(createProductResponse.status).toBe(STATUS_CODES.CREATED);
      const body = await createProductResponse.json();
      validateResponse(body, true, null);
      validateJsonSchema(productResponseSchema, body);
      id = body.Product._id;
      const createdProduct = body.Product;
      expect(createdProduct).toMatchObject({ ...productData });
    });
});