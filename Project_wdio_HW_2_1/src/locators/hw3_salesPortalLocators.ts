export const salesPortalLocators = {
    emailField: () => $('#emailinput'),
    passwordField: () => $('#passwordinput'),
    loginButton: () => $("//button[@type='submit']"),
    loggedUserName: () => $('//a/strong'),
    spinners: () => $('.spinner-border'),
    welcomeText: () => $('.welcome-text')
}