import React, { useState, useReducer } from 'react';
import AuthContext from './auth-context';
import * as actions from './auth-actions';
import { signUpReducer } from './auth-reducers';

const AuthState = ({ children }) => {
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  // Better not store password as a state
  // Just for prototyping purpose
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');
  const [isSignUpButtonDisabled, setSignUpButtonDisabled] = useState(false);
  const [authentication, dispatch] = useReducer(signUpReducer, { token: '' });

  const updateUserName = userName => {
    setUserName(userName);
  };

  const updateEmail = email => {
    setEmail(email);
  };

  const updatePassword = password => {
    setPassword(password);
  };

  const updatePasswordConfirmation = password => {
    setPasswordConfirmation(password);
  };

  // SignUp button
  const disableSignUpButton = () => {
    setSignUpButtonDisabled(true);
  };

  const enableSignUpButton = () => {
    setSignUpButtonDisabled(false);
  };

  const signUp = params => {
    dispatch({
      type: actions.SIGN_UP_PENDING,
    });

    fetchData(REQUEST_HISTORY, params).subscribe(
      data => dispatch({ type: actions.SIGN_UP_SUCCESS, payload: data }),
      err => dispatch({ type: actions.SIGN_UP_FAILED, payload: err })
    );
  };

  return (
    <AuthContext.Provider
      value={{
        userName,
        updateUserName,
        email,
        updateEmail,
        password,
        updatePassword,
        passwordConfirmation,
        updatePasswordConfirmation,
        isSignUpButtonDisabled,
        disableSignUpButton,
        enableSignUpButton,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthState;
