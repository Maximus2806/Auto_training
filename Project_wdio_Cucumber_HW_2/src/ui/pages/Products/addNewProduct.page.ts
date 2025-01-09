import { AddEditProductPage } from "./addEditProduct.page";

class AddNewProductPage extends AddEditProductPage {
  readonly Title = '//h2[.="Add New Product "]';

  readonly ["Save Product button"] = "#save-new-product";
}

export default new AddNewProductPage();
