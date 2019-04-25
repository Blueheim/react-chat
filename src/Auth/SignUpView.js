import React from 'react';

import SignUpForm from './SignUpForm';
import AuthState from './store/AuthState';

const SignUpView = () => {
  return (
    <div className="m-fx-cl-c-c m-bg-primary m-pd-hg-v">
      <AuthState>
        <SignUpForm />
      </AuthState>
    </div>
  );
};

export default SignUpView;
