import React, { useState, useReducer } from 'react';
import AuthContext from './auth-context';
import * as actions from './auth-actions';
import api from './auth-api';
import fetchData from '../../utils/fetchData';
import { signInReducer, signUpReducer } from './auth-reducers';

const AuthState = ({ children }) => {
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  // Better not store password as a state
  // Just for prototyping purpose
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');
  const [isSignUpButtonDisabled, setSignUpButtonDisabled] = useState(false);
  const [authentication, setAuthentication] = useState({ isAuthenticated: false, token: '' });
  const [signInData, signInDispatch] = useReducer(signInReducer, {
    isLoading: false,
    data: null,
    error: null,
  });

  const [signUpData, signUpDispatch] = useReducer(signUpReducer, {
    isLoading: false,
    data: null,
    error: null,
  });

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

  const signUp = formData => {
    console.log('signup');
    signUpDispatch({
      type: actions.SIGN_UP_PENDING,
    });

    fetchData({
      url: api[actions.SIGN_UP].url,
      options: {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify(formData),
      },
    }).subscribe(
      data => signUpDispatch({ type: actions.SIGN_UP_SUCCESS, payload: data }),
      err => {
        signUpDispatch({ type: actions.SIGN_UP_FAILED, payload: err });
      }
    );
  };

  const signIn = formData => {
    console.log('signin');
    signInDispatch({
      type: actions.SIGN_IN_PENDING,
    });

    fetchData({
      url: api[actions.SIGN_IN].url,
      options: {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      },
    }).subscribe(
      data => signInDispatch({ type: actions.SIGN_IN_SUCCESS, payload: data }),
      err => {
        console.log(err);
        signInDispatch({ type: actions.SIGN_IN_FAILED, payload: err });
      }
    );
  };

  const authenticate = token => {
    setAuthentication({
      isAuthenticated: true,
      token,
    });
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
        signUp,
        signUpData,
        signIn,
        signInData,
        authentication,
        authenticate,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthState;
