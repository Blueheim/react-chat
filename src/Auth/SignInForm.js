import React from 'react';
import { Link } from 'react-router-dom';
import googleLogo from '../statics/images/google.svg';
import facebookLogo from '../statics/images/facebook.svg';
import twitterLogo from '../statics/images/twitter.svg';
import instagramLogo from '../statics/images/instagram.svg';

const SignInForm = ({ submitHandler }) => {
  return (
    <div className="auth-box m-sw m-rd-xt m-bg-grey-light-2 m-pd-md">
      <h1 className="title m-fs-sm m-wt-300 m-mg-xs-b">Sign in</h1>
      <hr className="m-bd-xt-grey-light-3" />
      <div className="m-fx-sb-sh m-pd-ty-t">
        {/* Local auth */}
        <form action="#" className="local-auth m-fx-cl-c-sh" onSubmit={submitHandler}>
          <label htmlFor="email" className="m-mg-xt-b m-wt-700">
            Email address
          </label>
          <input
            id="email"
            className="control__input m-rd-xt m-pd-xt m-mg-xt-b"
            type="email"
            name="email"
            placeholder="email address"
          />
          <div className="errors m-mg-md-b" />

          <label htmlFor="password" className="m-mg-xt-b m-wt-700">
            Password
          </label>
          <input
            id="password"
            className="control__input m-rd-xt m-pd-xt m-mg-xt-b"
            type="password"
            name="password"
            placeholder="password"
          />
          <div className="errors m-mg-md-b" />
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
