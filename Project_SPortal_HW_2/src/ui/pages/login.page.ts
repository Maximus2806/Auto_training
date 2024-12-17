import { ICredentials } from '../../data/credentials';
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
    await this.setValue(this['Email input'], credentials.email);
    await this.setValue(this['Password input'], credentials.password);
  }

  async open() {
    await this.openPage('/aqa-course-project');
  }
}

export default new LoginPage();
