import { ICredentials } from '../../data/types/signIn.types';
import homePage from '../pages/home.page';
import logInPage from '../pages/logIn.page';
import { SalesPortalPageService } from './salesPortalPage.service';
import { ADMIN_USERNAME, ADMIN_PASSWORD } from '../../../src/config/environment'
import { logStep } from '../../utils/reporter/decorators'

class LogInPageService extends SalesPortalPageService {
  private logInPage = logInPage;
  private homePage = homePage;

  @logStep("Open Sales Portal")
  async openSalesPortal() {
    await this.logInPage.open();
  }

  @logStep("Login to Sales Portal")
  async login(credentials: ICredentials) {
    await this.logInPage.fillCredentials(credentials);
    await this.logInPage.clickOnLoginButton();
    await this.homePage.waitForPageOpened();
  }

  @logStep("Login as admin")
  async loginAsAdmin() {
    await this.login({
      username: ADMIN_USERNAME,
      password: ADMIN_PASSWORD,
    });
  }
}

export default new LogInPageService();
