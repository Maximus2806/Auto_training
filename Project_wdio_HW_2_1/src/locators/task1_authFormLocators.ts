export const authLocators = {
    authenticationForm: () => $('a[href="/login"]'),
    userNameField: () => $('//input[@id="username"]'),
    passwordField: () => $('//input[@id="password"]'),
    loginButton: () => $('//button[@type="submit"]'),
    logoutButton: () => $('//i[contains(@class,"icon-signout")]'),
    loginFormTitle: () => $('//h2[text()="Login Page"]'),
    loginFormSubheader: ()=> $('.subheader'),
    afterLoginTitle: () => $('//h2'),
    afterLoginSubheader: () => $('//h4')
};