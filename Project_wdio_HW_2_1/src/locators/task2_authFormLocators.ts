export const authLocators = {    
    userNameField: () => $('//input[@id="userName"]'),
    passwordField: () => $('//input[@id="password"]'),
    userNameOnRegister: () => $('//input[@id="userNameOnRegister"]'),
    passwordOnRegister: () => $('//input[@id="passwordOnRegister"]'),
    submitButton: () => $('//input[@type="submit"]'),
    backButton: () => $('//input[@id="back"]'),
    loginFormTitle: () => $('//h2[text()="Login"]'),
    switchToRegisterButton: () => $('//input[@id="registerOnLogin"]'),
    registerButton: ()=> $('//input[@id="register"]'),
    afterRegisterMessage: () => $('//h4[@id="errorMessageOnRegister"]'),
    afterLoginMessage: () => $('//h4[@id="successMessage"]'),
    backToLoginButton: () => $('//input[@id="backOnRegister"]'),
    warningInvalidCreds: () => $('//h4[@id="errorMessage"]'),
    usernameLabel: () => $('//input[@id="userName"]/following-sibling::label'),
    passwordLabel: () => $('//input[@id="password"]/following-sibling::label')
};