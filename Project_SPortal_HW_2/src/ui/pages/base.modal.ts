import { BasePage } from './base.page';

export abstract class BaseModal extends BasePage {
  protected readonly 'Action button' = '//div[@class="modal-footer"]//button[1]';
  protected readonly 'Cancel button' = '//div[@class="modal-footer"]//button[2]';
  protected readonly 'Close modal button' = '//div[@class="modal-header"]/button';

  abstract clickOnCancelButton(): void;

  abstract clickOnCloseModalButton(): void;

  abstract clickOnActionButton(): void;
}
