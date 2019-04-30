import React, { useRef, useState, useEffect, useContext } from 'react';
import { withRouter, Link } from 'react-router-dom';
import googleLogo from '../../statics/images/google.svg';
import facebookLogo from '../../statics/images/facebook.svg';
import twitterLogo from '../../statics/images/twitter.svg';
import instagramLogo from '../../statics/images/instagram.svg';
import AuthContext from '../store/auth-context';
import ControlInput from '../../components/UI/Controls/ControlInput';
import ControlLabel from '../../components/UI/Controls/ControlLabel';
import ControlErrors from '../../components/UI/Controls/ControlErrors';
import Button from '../../components/UI/Button';
import schema from './schema';
import validate from '../../utils/validate';

const SignInForm = props => {
  const context = useContext(AuthContext);

  const emailRef = useRef();
  const passwordRef = useRef();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [globalError, setGlobalError] = useState('');

  const [formState, setFormState] = useState({
    isValid: false,
    validationResult: {},
  });

  // On mount
  useEffect(() => {
    context.getGoogleUrl();
  }, []);

  // Triggered in update only if email and password changed
  useEffect(() => {
    if (formState.isValid) {
      const formData = {
        email: email,
        password: password,
      };
      context.signIn(formData);
    }
  }, [formState]);

  useEffect(() => {
    if (context.signInResult.data) {
      context.authenticate(context.signInResult.data.authToken);
      props.history.push('/');
    }

    if (context.signInResult.error) {
      setGlobalError(context.signInResult.error.data.error);
    }
  }, [context.signInResult]);

  const handleChangeEmail = e => {
    setEmail(e.target.value);
  };

  const handleChangePassword = e => {
    setPassword(e.target.value);
  };

  const handleGoogleSignIn = e => {
    console.log('click');
    context.GoogleSignIn();
  };

  const handleSubmit = e => {
    e.preventDefault();

    const validation = validate(schema, {
      email,
      password,
    });

    setFormState(validation);
  };

  return (
    <div className="auth-box m-sw m-rd-xt m-bg-grey-light-2 m-pd-md">
      <h1 className="title m-fs-sm m-wt-300 m-mg-xs-b">Sign in</h1>
      <hr className="m-bd-xt-grey-light-3" />
      {globalError && <p className="m-tx-invalid">{globalError}</p>}
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
          {formState.validationResult.email && <ControlErrors errors={formState.validationResult.email.errors} />}
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
          {formState.validationResult.password && <ControlErrors errors={formState.validationResult.password.errors} />}

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
          <a
            href={context.googleUrlResult.data}
            className="oauth-cta btn m-fx-sb-c m-pd-xt m-pd-sm-h m-mg-xt-b m-bg-white"
          >
            <img src={googleLogo} alt="Google logo" className="image" />
            <p className="m-mg-sm-l">Sign in with Google</p>
          </a>
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

export default withRouter(SignInForm);
