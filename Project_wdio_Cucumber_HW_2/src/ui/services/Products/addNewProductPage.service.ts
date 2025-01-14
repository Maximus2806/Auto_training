import { generateProductData } from "../../../data/products/generateProduct";
import type { IProduct } from "../../../data/types/product.types";
import { logStep } from "../../../utils/reporter/decorators";
import addNewProductPage from "../../pages/Products/addNewProduct.page";
import productsPage from "../../pages/Products/products.page";
import { SalesPortalPageService } from "../salesPortalPage.service";

class AddNewProductService extends SalesPortalPageService {
  private addNewProductPage = addNewProductPage;
  private productsPage = productsPage;

  @logStep("Create product via UI")
  async populate(product?: IProduct) {
    const productData = generateProductData(product);
    await this.addNewProductPage.fillInputs(productData);
    await this.addNewProductPage.clickOnSaveButton();
    await this.productsPage.waitForPageOpened();
    return productData;
  }
}

export default new AddNewProductService();
