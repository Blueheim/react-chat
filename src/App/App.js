import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import '../sass/main.scss';
import AuthState from '../Auth/store/AuthState';

import ChatView from '../Chat/ChatView';
import HomeView from '../Home/HomeView';
import SignUpView from '../Auth/SignUpView';

const App = () => (
  <div className="App">
    <AuthState>
      <BrowserRouter>
        <Switch>
          <Route path="/" component={HomeView} exact />
          <Route path="/signup" component={SignUpView} exact />
          <Route path="/chat" component={ChatView} exact />
        </Switch>
      </BrowserRouter>
    </AuthState>
  </div>
);

export default App;
