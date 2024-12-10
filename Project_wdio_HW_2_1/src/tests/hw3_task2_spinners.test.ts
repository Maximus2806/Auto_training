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
    const spinners = await $$(spinnersLocator).getElements();
    await browser.waitUntil(
      async () => {
        return await spinners.every(async (spinner) => !(await spinner.isDisplayed()))        
      },
      {
        timeout: 5000,
        timeoutMsg: `Some of spinners are still displayed on the home page after 5 sec`,
      }
    );
    const actualUserName = (await salesPortalLocators.loggedUserName().getText()).trim();
    expect(loggedUser).toBe(actualUserName);    
  });
});
