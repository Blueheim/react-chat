import React from 'react';

import '../sass/main.scss';
import AuthState from '../Auth/store/AuthState';
import AppRoutes from './AppRoutes';

const App = () => {
  return (
    <div className="App">
      <AuthState>
        <AppRoutes />
      </AuthState>
    </div>
  );
};

export default App;
