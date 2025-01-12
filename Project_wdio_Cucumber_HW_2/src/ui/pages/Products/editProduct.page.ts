import { AddEditProductPage } from "./addEditProduct.page";

class EditProductPage extends AddEditProductPage {
  readonly ["Title"] = "h2.page-title-text";
  readonly ["Save Product button"] = "#save-product-changes";

  async getTitleText() {
    return await this.getText(this.Title);
  }

  async saveChanges(){
    await this.click(this["Save Product button"])
  }
}

export default new EditProductPage();
