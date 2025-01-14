import { When } from "@wdio/cucumber-framework";
import addNewProductPageService from "../../services/Products/addNewProductPage.service";

When(/^I create new product on "Add New Product" page$/, async function () {
  const createdProduct = await addNewProductPageService.populate();
  this.createdProduct = createdProduct;
});
