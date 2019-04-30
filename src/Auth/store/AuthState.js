import React, { useState, useReducer, useEffect } from 'react';
import AuthContext from './auth-context';
import * as actions from './auth-actions';
import api from './auth-api';
import fetchData from '../../utils/fetchData';
import { signInReducer, signUpReducer, googleUrlReducer } from './auth-reducers';
import * as isAfter from 'date-fns/is_after';
import { addToLocalStorage, getFromLocalStorage, removeFromLocalStorage } from '../../utils/localStorage';
import jwtDecode from 'jwt-decode';

const STORAGE_TOKEN_KEY = 'PARLAPP_TOKEN_ID';

const AuthState = ({ children }) => {
  const [isSignUpButtonDisabled, setSignUpButtonDisabled] = useState(false);
  const [isAuthenticated, setAuthenticated] = useState(false);
  const [signInResult, signInDispatch] = useReducer(signInReducer, {
    isLoading: false,
    data: null,
    error: null,
  });

  const [signUpResult, signUpDispatch] = useReducer(signUpReducer, {
    isLoading: false,
    data: null,
    error: null,
  });

  const [googleUrlResult, googleUrlDispatch] = useReducer(googleUrlReducer, {
    isLoading: false,
    data: null,
    error: null,
  });

  // init method called in AppRoutes definition

  const init = () => {
    checkIsAuthenticated();

    if (!isAuthenticated) {
      // Google redirected query token
      let params = new URL(document.location).searchParams;
      if (params.has('token')) {
        let token = params.get('token');
        authenticate(token);
      }
    }
  };

  //

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

  const getGoogleUrl = () => {
    googleUrlDispatch({
      type: actions.GOOGLE_URL_PENDING,
    });

    fetchData({
      url: api[actions.GOOGLE_URL].url,
    }).subscribe(
      data => googleUrlDispatch({ type: actions.GOOGLE_URL_SUCCESS, payload: data }),
      err => {
        console.log(err);
        googleUrlDispatch({ type: actions.GOOGLE_URL_FAILED, payload: err });
      }
    );
  };

  const GoogleSignIn = () => {
    console.log('google sign in');
    fetchData({
      url: api[actions.SIGN_IN_GOOGLE].url,
    }).subscribe(
      data => signInDispatch({ type: actions.SIGN_IN_SUCCESS, payload: data }),
      err => {
        console.log(err);
        signInDispatch({ type: actions.SIGN_IN_FAILED, payload: err });
      }
    );
  };

  const updateAuthenticatedUser = () => {
    const token = jwtDecode(localStorage.getItem('IDK_COMPART_TOKEN'));
    return token.sub;
  };

  const checkIsAuthenticated = () => {
    const token = getFromLocalStorage(STORAGE_TOKEN_KEY);
    const isTokenExpired = checkTokenExpired(token);
    if (isTokenExpired) {
      removeFromLocalStorage(STORAGE_TOKEN_KEY);
      setAuthenticated(false);
    } else {
      setAuthenticated(true);
    }
  };

  const checkTokenExpired = token => {
    if (!token) {
      return true;
    }
    const payload = jwtDecode(token);
    const expiresAt = payload.exp;
    return isAfter(new Date(), expiresAt);
  };

  const authenticate = token => {
    addToLocalStorage(STORAGE_TOKEN_KEY, token);
    setAuthenticated(true);
  };

  return (
    <AuthContext.Provider
      value={{
        init,
        isSignUpButtonDisabled,
        disableSignUpButton,
        enableSignUpButton,
        signUp,
        signUpResult,
        signIn,
        signInResult,
        GoogleSignIn,
        isAuthenticated,
        getGoogleUrl,
        googleUrlResult,
        authenticate,
        checkIsAuthenticated,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthState;
