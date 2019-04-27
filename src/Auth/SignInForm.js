import React, { useRef, useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import googleLogo from '../statics/images/google.svg';
import facebookLogo from '../statics/images/facebook.svg';
import twitterLogo from '../statics/images/twitter.svg';
import instagramLogo from '../statics/images/instagram.svg';
import { clone } from 'ramda';
import AuthContext from './store/auth-context';
import ControlInput from '../components/UI/Controls/ControlInput';
import ControlLabel from '../components/UI/Controls/ControlLabel';
import ControlErrors from '../components/UI/Controls/ControlErrors';
import Button from '../components/UI/Button';

const SignInForm = props => {
  const emailRef = useRef();
  const passwordRef = useRef();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const context = useContext(AuthContext);

  const [formState, setFormState] = useState({
    valid: false,
    fields: {
      email: {
        errors: [],
      },
      password: {
        errors: [],
      },
    },
  });

  // Triggered in update only if email and password changed
  useEffect(() => {
    if (formState.valid) {
      const formData = {
        email: email,
        password: password,
      };
      context.signIn(formData);
    }
  }, [formState]);

  useEffect(() => {
    if (context.signInData.data) {
      context.authenticate(context.signInData.data.token);
    }
  }, [context.signInData]);

  const handleChangeEmail = e => {
    setEmail(e.target.value);
  };

  const handleChangePassword = e => {
    setPassword(e.target.value);
  };

  const handleSubmit = e => {
    e.preventDefault();

    const updatedFormState = clone(formState);

    const emailField = updatedFormState.fields['email'];
    const passwordField = updatedFormState.fields['password'];

    // Reset
    updatedFormState.valid = true;
    emailField.errors = [];
    passwordField.errors = [];

    //Required check
    if (!email.trim()) {
      emailField.errors.push({ text: 'A valid email is required' });
      updatedFormState.valid = false;
    }

    if (!password.trim()) {
      passwordField.errors.push({ text: 'A valid password is required' });
      updatedFormState.valid = false;
    }

    setFormState(updatedFormState);
  };

  return (
    <div className="auth-box m-sw m-rd-xt m-bg-grey-light-2 m-pd-md">
      <h1 className="title m-fs-sm m-wt-300 m-mg-xs-b">Sign in</h1>
      <hr className="m-bd-xt-grey-light-3" />
      <div className="m-fx-sb-sh m-pd-ty-t">
        {/* Local auth */}
        <form action="#" className="local-auth m-fx-cl-c-sh" onSubmit={handleSubmit}>
          {/* email */}
          <ControlLabel htmlFor="email">Email address</ControlLabel>
          <ControlInput
            ref={emailRef}
            attributes={{
              id: 'email',
              type: 'email',
              name: 'email',
              placeholder: 'email address',
              value: email,
            }}
            eventHandlers={{ onChange: handleChangeEmail }}
          />
          <ControlErrors errors={formState.fields.email.errors} />
          {/* password */}
          <ControlLabel htmlFor="password">Password</ControlLabel>
          <ControlInput
            ref={passwordRef}
            attributes={{
              id: 'password',
              type: 'password',
              name: 'password',
              placeholder: 'Password',
              value: password,
            }}
            eventHandlers={{ onChange: handleChangePassword }}
          />
          <ControlErrors errors={formState.fields.password.errors} />

          <Button attributes={{ type: 'submit' }} className="m-primary m-rd-xx m-pd-xt m-mg-sm-b">
            Sign in
          </Button>
          <p>
            Not a member yet ?{' '}
            <Link to="/signup" className="m-tx-primary">
              Create an account
            </Link>
          </p>
        </form>
        <div className="m-fx-cl-c-c m-mg-xl-h m-wt-700">
          <p className="m-pd-xt m-primary m-rd-xx">OR</p>
        </div>
        <div className="m-fx-cl-c-c">
          <Button className="oauth-cta m-fx-sb-c m-pd-xt m-pd-sm-h m-mg-xt-b m-bg-white">
            <img src={googleLogo} alt="Google logo" className="image" />
            <p className="m-mg-sm-l">Sign in with Google</p>
          </Button>
          <Button className="oauth-cta m-fx-sb-c m-pd-xt m-pd-sm-h m-mg-xt-b m-bg-white">
            <img src={facebookLogo} alt="Facebook logo" className="image " />
            <p className="m-mg-sm-l">Sign in with Facebook</p>
          </Button>
          <Button className="oauth-cta m-fx-sb-c m-pd-xt m-pd-sm-h m-mg-xt-b m-bg-white">
            <img src={twitterLogo} alt="Twitter logo" className="image" />
            <p className="m-mg-sm-l">Sign in with twitter</p>
          </Button>
          <Button className="oauth-cta m-fx-sb-c m-pd-xt m-pd-sm-h m-mg-xt-b m-bg-white">
            <img src={instagramLogo} alt="Instagram logo" className="image" />
            <p className="m-mg-sm-l">Sign in with Instagram</p>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SignInForm;
