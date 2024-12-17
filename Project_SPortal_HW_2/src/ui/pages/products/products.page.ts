import { SalesPortalPage } from '../salesPortal.page';
import productDetailsModal from './details.modal';

class ProductsPage extends SalesPortalPage {
  readonly ['Add New Product'] = 'button.page-title-button';
  readonly Title = "//h2[.='Products List ']";
  readonly ['Table row'] = (productName: string) => `//tr[./td[.="${productName}"]]`;
  readonly ['Product name in table'] = (productName: string) => `${this['Table row'](productName)}/td[1]`;
  readonly ['Product price in table'] = (productName: string) => `${this['Table row'](productName)}/td[2]`;
  readonly ['Product manufacturer in table'] = (productName: string) => `${this['Table row'](productName)}/td[3]`;
  readonly ['Product creation date in table'] = (productName: string) => `${this['Table row'](productName)}/td[4]`;
  readonly ['Product Delete button in table'] = (productName: string) =>
    `${this['Table row'](productName)}//button[@title="Delete"]`;
  readonly ['Product Details button in table'] = (productName: string) =>
    `${this['Table row'](productName)}//button[@title="Details"]`;
  readonly ['Search Button'] = 'button#search-products';
  readonly ['Search input'] = "input[type='search']";
  readonly ['Table body'] = '//tbody/tr';
  readonly ['Modal Details'] = productDetailsModal;

  async clickOnAddNewProduct() {
    await this.click(this['Add New Product']);
  }

  async waitForPageOpened() {
    await this.waitForDisplayed(this.Title);
    await this.waitForSpinnersToBeHidden('Products list');
  }

  async getProductFromTable(productName: string) {
    const [name, price, manufacturer] = await Promise.all([
      this.getText(this['Product name in table'](productName)),
      this.getText(this['Product price in table'](productName)),
      this.getText(this['Product manufacturer in table'](productName)),
    ]);
    return {
      name,
      price: +price.replace('$', ''),
      manufacturer,
    };
  }

  async getProductsFromTable() {
    const tableRows = await this.findArrayOfElements(this['Table body']);
    const results = await Promise.all(
      await tableRows.map(async (_, i) => {
        const name = await this.getText(`${this['Table body']}[${i + 1}]/td[1]`);
        const price = await this.getText(`${this['Table body']}[${i + 1}]/td[2]`);
        const manufacturer = await this.getText(`${this['Table body']}[${i + 1}]/td[3]`);
        return {
          name,
          price: +price.replace('$', ''),
          manufacturer,
        };
      })
    );
    return results;
  }

  async getSearchResults(searchInput: string) {
    await this.fillSearchInput(searchInput);
    await this.clickOnSearchButton();
    await this.waitForSpinnersToBeHidden('Products list');
    const firstRowColumns = await this.findArrayOfElements(`${this['Table body']}[1]/td`);
    if (firstRowColumns.length === 1) {
      return await this.getText(`${this['Table body']}[1]/td`);
    }
    return await this.getProductsFromTable();
  }

  async clickOnDeleteProductButton(productName: string) {
    await this.click(this['Product Delete button in table'](productName));
  }

  async clickOnProductDetailsButton(productName: string) {
    await this.click(this['Product Details button in table'](productName));
  }

  async clickOnSearchButton() {
    await this.click(this['Search Button']);
  }

  async fillSearchInput(productName: string) {
    await this.setValue(this['Search input'], productName);
  }
}

export default new ProductsPage();
