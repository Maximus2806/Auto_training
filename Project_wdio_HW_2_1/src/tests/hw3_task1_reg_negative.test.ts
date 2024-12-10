import { authLocators } from '../locators/task2_authFormLocators.ts';
import { invalidCredentialsRegister, loginRegisterFormData } from '../data/authFormData/task2_authFormCreds.ts';

describe('Registration negative cases', () => {
  before(async function () {
    await browser.maximizeWindow();
  });
  beforeEach(async function () {
    await browser.url('https://anatoly-karpovich.github.io/demo-login-form/');
    await authLocators.switchToRegisterButton().click();
    const actualFormTitle = (await authLocators.registerFormTitle().getText()).trim();
    expect (loginRegisterFormData.registerTitle).toBe(actualFormTitle)
  });
  afterEach(async function () {
    await browser.execute('window.localStorage.clear()');
  });
  

  context('Try to register with invalid credentials. Check validation.', async function () {
    invalidCredentialsRegister.forEach(cred => {
        it(`${cred.testName}`, async () => {
            await authLocators.userNameOnRegister().setValue(cred.username);
            await authLocators.passwordOnRegister().setValue(cred.password);
            await authLocators.submitRegisterButton().click();
            const warningMessage = (await authLocators.warningInvalidCredsRegister().getText()).trim();
            expect(warningMessage).toBe(`${cred.message}`);
          });
    })    
  });
});