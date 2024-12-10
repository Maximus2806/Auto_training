export const loginRegisterFormData = {
  username: 'maximus',
  password: 'Abcd1234#!',
  messageRegister: 'Successfully registered! Please, click Back to return on login page',
  messageLogin: 'Hello, maximus!',
  loginTitle: 'Login',
  registerTitle: 'Registration',
  userNameLabel: 'Username',
  passwordLabel: 'Password',
};

export const validCredentialsRegister = [
  {
    username: 'maximus',
    password: 'Abcd1234#!',
    testName: 'Should register with valid credential',
    message: 'Successfully registered! Please, click Back to return on login page',
  },
  {
    username: 'max',
    password: 'Abcdefgh',
    testName: 'Should register with username and password of minimum length',
    message: 'Successfully registered! Please, click Back to return on login page',
  },
  {
    username: 'LongNameOf40CharactersNameOf40Characters',
    password: 'LongPasswordOf20Char',
    testName: 'Should register with username and password of maximum lengt',
    message: 'Successfully registered! Please, click Back to return on login page',
  },
];

export const invalidCredentialsRegister = [
  {
    username: ' maximus',
    password: 'Abcd1234#!',
    testName: 'Should not accept username with leading spaces',
    message: 'Prefix and postfix spaces are not allowed is username',
  },
  {
    username: 'maximus ',
    password: 'Abcd1234#!',
    testName: 'Should not accept username with trailing spaces',
    message: 'Prefix and postfix spaces are not allowed is username',
  },
  {
    username: '       ',
    password: 'Abcd1234#!',
    testName: 'Should not accept username with only spaces',
    message: 'Prefix and postfix spaces are not allowed is username',
  },
  {
    username: 'ma',
    password: 'Abcd1234#!',
    testName: 'Should not accept username less than 3 characters length',
    message: 'Username should contain at least 3 characters',
  },
  {
    username: 'LongNameOf41CharactersNameOf41Characters1',
    password: 'Abcd1234#!',
    testName: 'Should not accept username more than 40 characters length',
    message: "Username can't exceed 40 characters",
  },
  {
    username: 'maximus',
    password: 'abcdefgh',
    testName: 'Should not accept password without uppercase letters',
    message: 'Password should contain at least one character in upper case',
  },
  {
    username: 'maximus2',
    password: 'ABCDEFGH',
    testName: 'Should not accept password without lowercase letters',
    message: 'Password should contain at least one character in lower case',
  },
  {
    username: 'maximus',
    password: '        ',
    testName: 'Should not accept password with only spaces',
    message: 'Password is required',
  },
  {
    username: 'maximus',
    password: '',
    testName: 'Should not accept empty password field',
    message: 'Password is required',
  },
  {
    username: '',
    password: 'Abcd1234#!',
    testName: 'Should not accept empty username field',
    message: 'Username is required',
  },
  {
    username: '',
    password: '',
    testName: 'Should not accept empty both fields',
    message: 'Please, provide valid data',
  },
  {
    username: 'maximus',
    password: 'Abcd123',
    testName: 'Should not accept password shorter than 8 characters',
    message: 'Password should contain at least 8 characters',
  },
  {
    username: 'maximus',
    password: 'Abcd123Abcd123Abcd123',
    testName: 'Should not accept password longer than 20 characters',
    message: "Password can't exceed 20 characters",
  },
];

export const invalidCredentialsLogin = [
  {
    username: 'maximus1',
    password: 'Abcd1234',
    testName: 'Should not login with non existent name and valid password',
    message: 'Invalid credentials',
  },
  {
    username: 'maximus',
    password: 'A',
    testName: 'Should not login with valid name and incorrect password',
    message: 'Invalid credentials',
  },
  {
    username: '',
    password: 'Abcd1234',
    testName: 'Should not login with empty name and valid password',
    message: 'Username is required',
  },
  {
    username: 'maximus',
    password: '',
    testName: 'Should not login with valid name and empty password',
    message: 'Password is required',
  },
  {
    username: '',
    password: '',
    testName: 'Should not login with empty inputs',
    message: 'Credentials are required',
  },
  {
    username: 'Maximus',
    password: 'Abcd1234',
    testName: 'Should not login with incorrect letter case in username',
    message: 'Invalid credentials',
  },
];
