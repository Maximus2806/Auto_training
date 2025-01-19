import _ from 'lodash';
import { AddNewCustomerPage } from '../../pages/customers/addNewCustomer.page.js';
import { CustomersListPage } from '../../pages/customers/customers.page.js';
import { expect, Page } from '@playwright/test';
import { NOTIFICATIONS } from '../../../data/notifications.js';
import { SalesPortalPageService } from '../salesPortal.service.js';

export class CustomersListPageService extends SalesPortalPageService {
  private customersPage: CustomersListPage;
  private addNewCustomerPage: AddNewCustomerPage;
  constructor(protected page: Page) {
    super(page);
    this.customersPage = new CustomersListPage(page);
    this.addNewCustomerPage = new AddNewCustomerPage(page);
  }

  async openAddNewCustomerPage() {
    await this.customersPage.clickOnAddNewCustomer();
    await this.customersPage.waitForSpinnerToHide();
    await this.addNewCustomerPage.waitForOpened();
  }

  async validateCreateCustomerNotification() {
    const notificationText = await this.customersPage.getLastNotificationText();
    expect(notificationText).toBe(NOTIFICATIONS.CUSTOMER_CREATED);
  }

  async validateEmpryTableText() {
    const actualText = await this.customersPage.getEmptyTableMessage();
    expect(actualText).toBe('No records created yet');
  }

  async validateFilterResults(field: string, value: string) {
    const customers = await this.customersPage.getAllCustomersFromTable();
    switch (field) {
      case 'email':
        customers.every((customer) => expect(customer.email).toContain(value));
        break;
      case 'name':
        customers.every((customer) => expect(customer.name).toContain(value));
        break;
      case 'country':
        customers.every((customer) => expect(customer.country).toContain(value));
        break;
      case 'createdOn':
        customers.every((customer) => expect(customer.createdOn).toContain(value));
        break;
      default:
        throw new Error(`No such fields in the table ${field}`);
    }
  }
}
