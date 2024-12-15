import {authLocators} from '../locators/task1_authFormLocators.ts';
import {authFormCreds} from '../data/authFormData/task1_authFormCreds.ts';
import {authFormContent} from '../data/authFormData/task1_authFormContent.ts'
describe('Verify login functionality', () => {
    
before(async function(){
    await browser.maximizeWindow();    
});
beforeEach(async function(){    
    await browser.url("https://the-internet.herokuapp.com/");
});
it('Login with valid credantials and validate content', async function(){
    await authLocators.authenticationForm().click();
    const authFormTitle = (await authLocators.loginFormTitle().getText()).trim();
    const authSubHeader = (await authLocators.loginFormSubheader().getText()).trim();
    expect(authFormTitle).toBe(authFormContent.title);
    expect(authSubHeader).toBe(authFormContent.subheader);
    await authLocators.userNameField().setValue(authFormCreds.userName);
    await authLocators.passwordField().setValue(authFormCreds.password);
    await authLocators.loginButton().click();
    const titleAfterLogin = (await authLocators.afterLoginTitle().getText()).trim();
    const subheaderAfterLogin = (await authLocators.afterLoginSubheader().getText()).trim();
    const logoutButtontext = (await authLocators.logoutButton().getText()).trim();
    expect(titleAfterLogin).toBe(authFormContent.titleAfterLogin);
    expect(subheaderAfterLogin).toBe(authFormContent.subheaderAfterLogin);
    expect (logoutButtontext).toBe(authFormContent.logoutButtonText)   
})
})