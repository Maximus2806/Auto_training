import { Then } from '@wdio/cucumber-framework';
import detailsProductModal from '../../pages/Products/detailsProduct.modal';
import productsPageService from '../../services/Products/productsPage.service';

Then(/^I verify "([^"]*)" of the product on "Details modal" page$/, async function (element: string) {
  const createdProduct = this.createdProduct;
  const actualProductData = await detailsProductModal.getProductData();
  expect(actualProductData[element]).toBe(createdProduct[element]);
});

Then(/^I click on "Close button" of "Details modal" page$/, async function () {
    await detailsProductModal.clickOnCancelButton()
});

Then(/^I verify all data of the product on "Details modal" page$/, async function() {
    const createdProduct = this.createdProduct;
    await productsPageService.validateProductDataInModal(createdProduct);
})