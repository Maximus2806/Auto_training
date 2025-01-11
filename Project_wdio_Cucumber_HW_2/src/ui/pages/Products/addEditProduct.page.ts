import { AddProductFields, IProduct } from "../../../data/types/product.types";
import { SalesPortalPage } from "../salesPortal.page";

export abstract class AddEditProductPage extends SalesPortalPage {
  abstract readonly ["Save Product button"]: string;
  abstract readonly ["Title"]: string;

  readonly ["Name input"] = "#inputName";
  readonly ["Manufacturer dropdown"] = "#inputManufacturer";
  readonly ["Price input"] = "#inputPrice";
  readonly ["Amount input"] = "#inputAmount";
  readonly ["Notes textarea"] = "#textareaNotes";
  readonly ["Products link"] = ".back-link";

  async waitForPageOpened(): Promise<void> {
    await this.waitForDisplayed(this.Title);
    await this.waitForSpinnersToBeHidden("Edit Product");
  }

  getErrorInputSelector(inputField: AddProductFields) {
    return `#error-${this[inputField].replace("#", "")}`;
  }

  async isErrorVisible(inputField: AddProductFields): Promise<boolean> {
    const fieldSelector = this.getErrorInputSelector(inputField);
    return await this.isElementDisplayed(fieldSelector);
  }

  async getErrorText(inputField: AddProductFields) {
    return this.getText(this.getErrorInputSelector(inputField));
  }

  async fillInputs(product: Partial<IProduct>) {
    if (product.name) await this.setValue(this["Name input"], product.name);
    if (product.manufacturer) await this.selectDropdownValue(this["Manufacturer dropdown"], product.manufacturer);
    if (product.price) await this.setValue(this["Price input"], product.price);
    if (product.amount) await this.setValue(this["Amount input"], product.amount);
    if (product.notes) await this.setValue(this["Notes textarea"], product.notes);
  }

  async clickOnSaveButton() {
    await this.click(this["Save Product button"]);
  }

  async clickOnProductsLink() {
    await this.click(this["Products link"]);
  }
}
