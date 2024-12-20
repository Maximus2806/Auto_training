import { ICredentials } from '../../data/credentials';
import homePage from '../pages/home.page';
import logInPage from '../pages/logIn.page';
import { SalesPortalPageService } from './salesPortalPage.service';
import { ADMIN_USERNAME, ADMIN_PASSWORD } from '../../../src/config/environment'

class LogInPageService extends SalesPortalPageService {
  private logInPage = logInPage;
  private homePage = homePage;

  async openSalesPortal() {
    await this.logInPage.open();
  }

  async login(credentials: ICredentials) {
    await this.logInPage.fillCredentials(credentials);
    await this.logInPage.clickOnLoginButton();
    await this.homePage.waitForPageOpened();
  }

  async loginAsAdmin() {
    await this.login({
      email: ADMIN_USERNAME,
      password: ADMIN_PASSWORD,
    });
  }
}

export default new LogInPageService();
