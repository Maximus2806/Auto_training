import productsPage from '../../pages/Products/products.page';
import addNewProductPage from '../../pages/Products/addNewProduct.page';
import productDetailsModal from '../../pages/Products/details.modal';
import { NOFITICATIONS } from '../../../data/notifications';
import { IProduct } from '../../../data/types/product.types';
import _ from 'lodash';
import deleteProductModal from '../../pages/Products/deleteProductModal';
import { SalesPortalPageService } from '../salesPortalPage.service';

class ProductsPageService extends SalesPortalPageService {
  private productsPage = productsPage;
  private addNewProductPage = addNewProductPage;
  private productDetailsModal = productDetailsModal;
  private deleteProductModal = deleteProductModal;

  async openAddNewProductPage() {
    await this.productsPage.clickOnAddNewProduct();
    await this.addNewProductPage.waitForPageOpened();
  }

  async openProductDetails(productName: string) {
    await this.productsPage.clickOnProductDetailsButton(productName);
    await this.productDetailsModal.waitForPageOpened();
  }

  async closeProductDetails() {
    await this.productDetailsModal.clickOnCloseModalButton();
    await this.productDetailsModal.waitForDisappeared();
  }

  async getProductDataFromModal(productName: string) {
    await this.openProductDetails(productName);
    const actualData = await this.productDetailsModal.getProductData();
    await this.closeProductDetails();
    return actualData;
  }

  async validateProductDataFromNodal(product: IProduct) {
    const actualData = _.omit(await this.getProductDataFromModal(product.name), 'createdOn');
    expect(actualData).toEqual(product);
  }

  async deleteProduct(productName: string) {
    await this.productsPage.clickOnDeleteProductButton(productName);
    await this.deleteProductModal.waitForPageOpened();
    await this.deleteProductModal.clickOnActionButton();
    await this.deleteProductModal.waitForDisappeared();
    await this.productsPage.waitForPageOpened();
  }

  async validateSearchSingleProduct(searchInput: string, product: IProduct) {
    const searchResult = await this.productsPage.getSearchResults(searchInput);
    expect(searchResult[0]).toEqual(_.omit(product, ['amount', 'notes']));
    expect(searchResult.length).toBe(1);
  }

  async validateSearchMatch(searchInput: string) {
    const searchResult = await this.productsPage.getSearchResults(searchInput);
    if (Array.isArray(searchResult)) {
      searchResult.forEach((item) => expect(item.name).toContain(searchInput));
    } else expect(searchResult).toBe(NOFITICATIONS.NO_SEARCH_RESULTS);
  }
}

export default new ProductsPageService();
