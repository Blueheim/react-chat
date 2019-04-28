const schema = {
  email: {
    label: 'Email',
    rules: ['REQUIRED', 'EMAIL'],
  },
  userName: {
    label: 'Username',
    rules: ['REQUIRED', 'ONLY_LETTERS', { MIN_LENGTH: 5 }],
  },
  password: {
    label: 'Password',
    rules: ['REQUIRED', { MIN_LENGTH: 5 }],
  },
  passwordConfirmation: {
    label: 'Password confirmation',
    rules: ['REQUIRED', { FIELD_EQUALITY: 'password' }],
  },
  recaptcha: {
    label: 'recaptcha',
    rules: ['REQUIRED'],
  },
};

export default schema;
