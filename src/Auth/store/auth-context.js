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
  signUpData: {},
  signIn: () => {},
  GoogleSignIn: () => {},
  authentication: { isAuthenticated: false, token: '' },
  authenticate: () => {},
});

export default AuthContext;
