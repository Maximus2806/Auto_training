//TODO: npm run test -- --spec="./src/api/tests/Products/getAll.test.ts"

import { ADMIN_PASSWORD, ADMIN_USERNAME } from "../../../config/environment";
import { STATUS_CODES } from "../../../data/api/statusCodes";
import ProductsController from "../../controllers/products.controller";
import signInController from "../../controllers/signIn.controller";
import { ICredentials } from "../../../data/credentials";
import { validateJsonSchema, validateResponse } from "../../../utils/validation/apiValidation";
import { allProductsSchema } from "../../../data/jsonSchemas/allProducts.schema";
import { testCases } from '../../../data/api/Products/getAllProducts';


describe("[API] [Products] Get all products", async function () {
    const loginBody: ICredentials = {
      username: ADMIN_USERNAME,
      password: ADMIN_PASSWORD,
    };
  
    let token = "";    
  
    beforeEach(async function () {
      const loginResponse = await signInController.login(loginBody);  
      expect(loginResponse.status).toBe(STATUS_CODES.OK);
      token = loginResponse.headers.get("authorization")!;      
      expect(token).not.toBe(undefined);
    });    

    testCases.forEach(({ description, params, expectedStatus, isSuccess, errorMessage }) => {
        it(`Should handle query parameters: ${description}`, async function () {
          const getProductsResponse = await ProductsController.getAll(token, params);
          expect(getProductsResponse.status).toBe(expectedStatus);      
          const body = await getProductsResponse.json();
          validateResponse(body, isSuccess, errorMessage);      
          if (isSuccess) {
            validateJsonSchema(allProductsSchema, body);
          }
        });
      });

      it('Should return 401 error for invalid token', async function () {
        const invalidToken = '';
        const getProductsResponse = await ProductsController.getAll(invalidToken, {});
        expect(getProductsResponse.status).toBe(STATUS_CODES.NOT_AUTHORIZED);
      });    

});