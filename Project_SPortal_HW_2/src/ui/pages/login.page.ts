import { SALES_PORTAL_URL } from '../../config/environment';
import { ICredentials } from '../../data/types/signIn.types';
import { logStep } from '../../utils/reporter/decorators';
import { SalesPortalPage } from './salesPortal.page';

class LoginPage extends SalesPortalPage {
  readonly ['Title'] = 'p.lead';
  readonly ['Login button'] = '//button[.="Login"]';
  readonly ['Email input'] = 'input#emailinput';
  readonly ['Password input'] = 'input#passwordinput';

  async clickOnLoginButton() {
    await this.click(this['Login button']);
  }

  async waitForPageOpened(): Promise<void> {
    await this.waitForDisplayed(this['Title']);
    await this.waitForSpinnersToBeHidden('Login');
  }

  async fillCredentials(credentials: ICredentials): Promise<void> {
    await this.setValue(this['Email input'], credentials.username);
    await this.setValue(this['Password input'], credentials.password);
  }

  @logStep("Open sales portal page")
  async open() {
    await this.openPage(SALES_PORTAL_URL);
  }
}

export default new LoginPage();
