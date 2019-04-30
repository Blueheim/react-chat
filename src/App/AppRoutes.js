import React, { useContext } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import AuthContext from '../Auth/store/auth-context';

import ChatView from '../Chat/ChatView';
import HomeView from '../Home/HomeView';
import SignUpView from '../Auth/SignUp/SignUpView';
import AuthGuardRoute from '../Auth/Guards/AuthGuardRoute';
import UserSettingsView from '../User/Settings/UserSettingsView';

const AppRoutes = () => {
  const authContext = useContext(AuthContext);

  authContext.init();

  let routes = (
    <Switch>
      <Route path="/" component={HomeView} exact />
      <Route path="/signup" component={SignUpView} exact />
      {/* TODO: Add standalone sign in route */}
    </Switch>
  );

  if (authContext.isAuthenticated) {
    routes = (
      <Switch>
        <Route path="/" component={HomeView} exact />
        <Route path="/signup" component={SignUpView} exact />
        <AuthGuardRoute path="/user/settings" component={UserSettingsView} />
        <Route path="/chat" component={ChatView} exact />
      </Switch>
    );
  }

  return <BrowserRouter>{routes}</BrowserRouter>;
};

export default AppRoutes;
