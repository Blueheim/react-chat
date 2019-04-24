import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import '../sass/main.scss';
import ChatView from '../Chat/ChatView';
import HomeView from '../Home/HomeView';

const App = () => (
  <div className="App">
    <BrowserRouter>
      <Switch>
        <Route path="/" component={HomeView} exact />
        <Route path="/chat" component={ChatView} exact />
      </Switch>
    </BrowserRouter>
  </div>
);

export default App;
