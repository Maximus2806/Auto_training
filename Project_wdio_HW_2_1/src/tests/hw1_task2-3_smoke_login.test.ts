import { authLocators } from '../locators/task2_authFormLocators.ts';
import { invalidCredentialsLogin, loginRegisterFormData } from '../data/authFormData/task2_authFormCreds.ts';

describe('Smoke login form', () => {
  before(async function () {
    await browser.maximizeWindow();
  });
  beforeEach(async function () {
    await browser.url('https://anatoly-karpovich.github.io/demo-login-form/');
    await authLocators.switchToRegisterButton().click();
    await authLocators.userNameOnRegister().setValue(loginRegisterFormData.username);
    await authLocators.passwordOnRegister().setValue(loginRegisterFormData.password);
    await authLocators.registerButton().click();
    const confirmationText = (await authLocators.afterRegisterMessage().getText()).trim();
    expect(confirmationText).toBe(loginRegisterFormData.messageRegister);
    await authLocators.backToLoginButton().click();
    
  });
  afterEach(async function () {
    await browser.execute('window.localStorage.clear()');
  });
  it('Login with validcredantials', async function () {
    await authLocators.userNameField().setValue(loginRegisterFormData.username);
    await authLocators.passwordField().setValue(loginRegisterFormData.password);
    await authLocators.submitButton().click();
    const successMessage = (await authLocators.afterLoginMessage().getText()).trim();
    expect(successMessage).toBe(loginRegisterFormData.messageLogin);
  });

  it('Validate correct form displaying', async function() {
    const formTitle = (await authLocators.loginFormTitle().getText()).trim();
    const nameFieldLabel = (await authLocators.usernameLabel().getText()).trim();
    const passwordFieldLabel = (await authLocators.passwordLabel().getText()).trim();
    expect(formTitle).toBe(loginRegisterFormData.loginTitle);
    expect(nameFieldLabel).toBe(loginRegisterFormData.userNameLabel);
    expect(passwordFieldLabel).toBe(loginRegisterFormData.passwordLabel)
  })

  context('Login with invalid credentials. Check validation.', async function () {
    for (const cred of invalidCredentialsLogin) {
      it(`${cred.testName}`, async () => {
        await authLocators.userNameField().setValue(cred.username);
        await authLocators.passwordField().setValue(cred.password);
        await authLocators.submitButton().click();
        const warningMessage = (await authLocators.warningInvalidCreds().getText()).trim();
        expect(warningMessage).toBe(`${cred.message}`);
      });
    }
  });
});
