import React from 'react';

const AuthContext = React.createContext({
  init: () => {},
  isSignUpButtonDisabled: false,
  disableSignUpButton: () => {},
  enableSignUpButton: () => {},
  signUp: () => {},
  signUpData: {},
  signIn: () => {},
  GoogleSignIn: () => {},
  isAuthenticated: false,
  authenticate: () => {},
  checkIsAuthenticated: () => {},
  googleUrlData: {},
  getGoogleUrl: () => {},
});

export default AuthContext;
