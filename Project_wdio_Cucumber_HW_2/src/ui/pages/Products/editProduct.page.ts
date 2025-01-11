import { AddEditProductPage } from "./addEditProduct.page";

class EditProductPage extends AddEditProductPage {
  readonly ["Title"] = "h2.page-title-text";
  readonly ["Save Product button"] = "#save-product-changes";

  async getTitleText() {
    return await this.getText(this.Title);
  }
}

export default new EditProductPage();
