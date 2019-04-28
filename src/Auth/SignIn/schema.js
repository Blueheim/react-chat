const schema = {
  email: {
    label: 'Email',
    rules: ['REQUIRED', 'EMAIL'],
  },
  password: {
    label: 'Password',
    rules: ['REQUIRED', { MIN_LENGTH: 5 }],
  },
};

export default schema;
