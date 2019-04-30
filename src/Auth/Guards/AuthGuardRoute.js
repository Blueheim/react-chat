import React, { useContext } from 'react';
import { Route, Redirect } from 'react-router-dom';
import AuthContext from '../store/auth-context';

const AuthGuardRoute = ({ component: Component, ...rest }) => {
  const { path } = rest;
  const { exact } = rest;
  const authContext = useContext(AuthContext);

  authContext.checkIsAuthenticated();

  if (!authContext.isAuthenticated) {
    return <Redirect to="/" />;
  }

  return <Route exact={exact} path={path} component={Component} />;
};

export default AuthGuardRoute;
