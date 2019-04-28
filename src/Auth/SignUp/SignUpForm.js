import React, { useRef, useState, useContext, useEffect } from 'react';
import { withRouter, Link } from 'react-router-dom';
import styles from './SignupForm.module.scss';
import ReCAPTCHA from 'react-google-recaptcha';
import classNames from 'classnames';
import AuthContext from '../store/auth-context';
import ControlLabel from '../../components/UI/Controls/ControlLabel';
import ControlInput from '../../components/UI/Controls/ControlInput';
import ControlErrors from '../../components/UI/Controls/ControlErrors';
import validate from '../../utils/validate';
import schema from './schema';

window.recaptchaOptions = {
  lang: 'en',
};

const SignUpForm = props => {
  const context = useContext(AuthContext);

  const userNameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmationRef = useRef();
  // Used for formadedRef
  const recaptchaRef = React.createRef();

  const [globalError, setGlobalError] = useState('');

  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');
  const [recaptcha, setRecaptcha] = useState('');

  const [formState, setFormState] = useState({
    isValid: false,
    validationResult: {},
  });

  useEffect(() => {
    console.log(formState);
    if (formState.isValid) {
      const formData = {
        email: email,
        name: userName,
        password: password,
        passwordConfirmation: passwordConfirmation,
      };

      context.signUp(formData);
    }
  }, [formState]);

  useEffect(() => {
    if (context.signUpData.data) {
      props.history.push('/');
    }

    if (context.signUpData.error) {
      setGlobalError(context.signUpData.error.data.error);
    }
  }, [context.signUpData]);

  const handleChangeEmail = e => {
    setEmail(e.target.value);
  };

  const handleChangeUserName = e => {
    setUserName(e.target.value);
  };

  const handleChangePassword = e => {
    setPassword(e.target.value);
  };

  const handleChangePasswordConfirmation = e => {
    setPasswordConfirmation(e.target.value);
  };

  const handleRecaptchaResponse = value => {
    setRecaptcha(value);
  };

  const handleSubmit = e => {
    e.preventDefault();

    const validation = validate(schema, {
      email,
      userName,
      password,
      passwordConfirmation,
      recaptcha,
    });

    setFormState(validation);
  };

  return (
    <div className={classNames(styles.SignUpForm, 'm-sw m-rd-xt m-bg-grey-light-2 m-pd-md')}>
      <h1 className="title m-fs-sm m-wt-300 m-mg-xs-b">Create your account for free</h1>
      <hr className="m-bd-xt-grey-light-3" />
      {globalError && <p className="m-tx-invalid">{globalError}</p>}
      <form action="#" className="local-auth m-fx-cl-c-sh" onSubmit={handleSubmit}>
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

        <ControlLabel htmlFor="username">Username</ControlLabel>
        <ControlInput
          ref={userNameRef}
          attributes={{
            id: 'username',
            type: 'text',
            name: 'username',
            placeholder: 'Username',
            value: userName,
          }}
          eventHandlers={{ onChange: handleChangeUserName }}
        />
        {formState.validationResult.userName && <ControlErrors errors={formState.validationResult.userName.errors} />}

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

        <ControlLabel htmlFor="passwordConfirmation">Password confirmation</ControlLabel>
        <ControlInput
          ref={passwordConfirmationRef}
          attributes={{
            id: 'passwordConfirmation',
            type: 'password',
            name: 'passwordConfirmation',
            placeholder: 'Password confirmation',
            value: passwordConfirmation,
          }}
          eventHandlers={{ onChange: handleChangePasswordConfirmation }}
        />
        {formState.validationResult.passwordConfirmation && (
          <ControlErrors errors={formState.validationResult.passwordConfirmation.errors} />
        )}

        <div className="m-fx-c-c m-mg-md-b">
          <ReCAPTCHA
            ref={recaptchaRef}
            sitekey="6LddM6AUAAAAAICxVHT37G6gFlFuPPEzA9QQpg-v"
            onChange={handleRecaptchaResponse}
            size="normal"
          />
        </div>
        {formState.validationResult.recaptcha && <ControlErrors errors={formState.validationResult.recaptcha.errors} />}

        <button
          type="submit"
          className="btn m-primary m-rd-xx m-pd-xt m-mg-sm-b m-al-c"
          disabled={context.isSignUpButtonDisabled}
        >
          Sign Up
        </button>
        <p className="m-tx-c">
          Already have an account ?{' '}
          <Link to="/" className="m-tx-primary">
            Sign in
          </Link>
        </p>
      </form>
    </div>
  );
};

export default withRouter(SignUpForm);
