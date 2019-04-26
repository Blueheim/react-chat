import React, { useRef, useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import googleLogo from '../statics/images/google.svg';
import facebookLogo from '../statics/images/facebook.svg';
import twitterLogo from '../statics/images/twitter.svg';
import instagramLogo from '../statics/images/instagram.svg';
import { clone } from 'ramda';
import AuthContext from './store/auth-context';

const SignInForm = props => {
  const emailRef = useRef();
  const passwordRef = useRef();

  const context = useContext(AuthContext);

  const [formState, setFormState] = useState({
    valid: false,
    fields: {
      email: {
        ref: emailRef,
        errors: [],
      },
      password: {
        ref: passwordRef,
        errors: [],
      },
    },
  });

  useEffect(() => {
    context.updateEmail('');
    context.updatePassword('');
  }, []);

  // Triggered in update only if email and password changed
  useEffect(() => {
    if (formState.valid) {
      const formData = {
        email: context.email,
        password: context.password,
      };
      console.log(formState);
      context.signIn(formData);
    }
  }, [context.email, context.password]);

  useEffect(() => {
    if (context.signInData.data) {
      context.authenticate(context.signInData.data.token);
    }
  }, [context.signInData]);

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
    if (!emailField.ref.current.value.trim()) {
      emailField.errors.push({ text: 'A valid email is required' });
      updatedFormState.valid = false;
    }

    if (!passwordField.ref.current.value.trim()) {
      passwordField.errors.push({ text: 'A valid password is required' });
      updatedFormState.valid = false;
    }

    setFormState(updatedFormState);

    if (updatedFormState.valid) {
      console.log('valid');
      context.updateEmail(emailField.ref.current.value);
      context.updatePassword(passwordField.ref.current.value);
    }
  };

  return (
    <div className="auth-box m-sw m-rd-xt m-bg-grey-light-2 m-pd-md">
      <h1 className="title m-fs-sm m-wt-300 m-mg-xs-b">Sign in</h1>
      <hr className="m-bd-xt-grey-light-3" />
      <div className="m-fx-sb-sh m-pd-ty-t">
        {/* Local auth */}
        <form action="#" className="local-auth m-fx-cl-c-sh" onSubmit={handleSubmit}>
          <label htmlFor="email" className="m-mg-xt-b m-wt-700">
            Email address
          </label>
          <input
            ref={emailRef}
            id="email"
            className="control__input m-rd-xt m-pd-xt m-mg-xt-b"
            type="email"
            name="email"
            placeholder="email address"
          />
          <div className="errors m-mg-md-b">
            {formState.fields.email.errors.map((error, index) => (
              <p key={index} className="m-fs-xt m-tx-invalid">
                {error.text}
              </p>
            ))}
          </div>

          <label htmlFor="password" className="m-mg-xt-b m-wt-700">
            Password
          </label>
          <input
            ref={passwordRef}
            id="password"
            className="control__input m-rd-xt m-pd-xt m-mg-xt-b"
            type="password"
            name="password"
            placeholder="password"
          />
          <div className="errors m-mg-md-b">
            {formState.fields.password.errors.map((error, index) => (
              <p key={index} className="m-fs-xt m-tx-invalid">
                {error.text}
              </p>
            ))}
          </div>
          <button type="submit" className="btn m-primary m-rd-xx m-pd-xt m-mg-sm-b">
            Sign in
          </button>
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
          <button className="oauth-cta btn m-fx-sb-c m-pd-xt m-pd-sm-h m-mg-xt-b m-bg-white">
            <img src={googleLogo} alt="Google logo" className="image" />
            <p className="m-mg-sm-l">Sign in with Google</p>
          </button>
          <button className="oauth-cta btn m-fx-sb-c m-pd-xt m-pd-sm-h m-mg-xt-b m-bg-white">
            <img src={facebookLogo} alt="Facebook logo" className="image " />
            <p className="m-mg-sm-l">Sign in with Facebook</p>
          </button>
          <button className="oauth-cta btn m-fx-sb-c m-pd-xt m-pd-sm-h m-mg-xt-b m-bg-white">
            <img src={twitterLogo} alt="Twitter logo" className="image" />
            <p className="m-mg-sm-l">Sign in with twitter</p>
          </button>
          <button className="oauth-cta btn m-fx-sb-c m-pd-xt m-pd-sm-h m-mg-xt-b m-bg-white">
            <img src={instagramLogo} alt="Instagram logo" className="image" />
            <p className="m-mg-sm-l">Sign in with Instagram</p>
          </button>
        </div>
      </div>
    </div>
  );
};

export default SignInForm;
