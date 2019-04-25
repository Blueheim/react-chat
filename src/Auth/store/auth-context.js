import React from 'react';

const AuthContext = React.createContext({
  userName: '',
  updateUserName: () => {},
  email: '',
  updateEmail: () => {},
  password: '',
  updatePassword: () => {},
  passwordConfirmation: '',
  updatePasswordConfirmation: () => {},
  isSignUpButtonDisabled: false,
  disableSignUpButton: () => {},
  enableSignUpButton: () => {},
  signUp: () => {},
});

export default AuthContext;
