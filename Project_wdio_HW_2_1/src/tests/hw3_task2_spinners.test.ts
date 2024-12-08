import { salesPortalLocators } from '../locators/hw3_salesPortalLocators.ts';
import { salesPortalCreds } from '../data/authFormData/hw3_salesPortalCreds.ts';
describe('Wait for all spinners to hide', () => {
  const loggedUser = 'AQA User';

  before(async function () {
    await browser.maximizeWindow();
  });

  beforeEach(async function () {
    await browser.url('https://anatoly-karpovich.github.io/aqa-course-project/#');
  });

  it('Wait for spinners to hide', async function () {
    await salesPortalLocators.emailField().setValue(salesPortalCreds.login);
    await salesPortalLocators.passwordField().setValue(salesPortalCreds.password);
    await salesPortalLocators.loginButton().click();
    await salesPortalLocators.welcomeText().waitForDisplayed();
    const spinnersLocator = '.spinner-border';
    await browser.waitUntil(
      async () => {
        const spinners = await $$(spinnersLocator);
        for (const spiner of spinners) {
          if (await spiner.isDisplayed()) {
            return false;
          }
        }
        return true;
      },
      {
        timeout: 5000,
        timeoutMsg: 'Some of spinners are still displayed',
      }
    );
    const actualUserName = (await salesPortalLocators.loggedUserName().getText()).trim();
    expect(loggedUser).toBe(actualUserName);    
  });
});
