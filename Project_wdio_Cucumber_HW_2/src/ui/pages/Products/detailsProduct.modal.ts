import {DeleteProductModal} from './deleteProduct.modal'

 class DetailsProductModal extends DeleteProductModal {
    readonly ["Value by name"] = (value: string) => `//div[@class='modal-body']//strong[text()='${value}:']/parent::h6/following-sibling::p`;

    async getProductData() {
        const [name, amount, price, manufacturer, createdOn, notes] = await Promise.all([
            this.getText(this['Value by name']('Name')),
            this.getText(this['Value by name']('Amount')),
            this.getText(this['Value by name']('Price')),
            this.getText(this['Value by name']('Manufacturer')),
            this.getText(this['Value by name']('Created On')),
            this.getText(this['Value by name']('Notes'))
          ]);
          return { name, amount: +amount, price: +price, manufacturer, createdOn, notes };
    };

}

export default new DetailsProductModal();