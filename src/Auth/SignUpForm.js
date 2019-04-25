import React, { useRef, useState, useContext, useEffect } from 'react';
import styles from './SignupForm.module.scss';
import ReCAPTCHA from 'react-google-recaptcha';
import classNames from 'classnames';
import { clone } from 'ramda';
import AuthContext from './store/auth-context';

const SignUpForm = () => {
  const context = useContext(AuthContext);

  const userNameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmationRef = useRef();

  // Used for formadedRef
  const recaptchaRef = React.createRef();

  const [formState, setFormState] = useState({
    valid: false,
    fields: {
      email: {
        ref: emailRef,
        errors: [],
      },
      userName: {
        ref: userNameRef,
        errors: [],
      },
      password: {
        ref: passwordRef,
        errors: [],
      },
      passwordConfirmation: {
        ref: passwordConfirmationRef,
        errors: [],
      },
      recaptcha: {
        ref: recaptchaRef,
        errors: [],
      },
    },
  });

  useEffect(() => {
    //context.disableSignUpButton();
  }, []);

  useEffect(() => {
    if (formState.valid) {
      console.log(context.email);
      console.log(context.userName);
      console.log(context.password);
      console.log(context.passwordConfirmation);
    }
  }, [context.email, context.userName, context.password, context.passwordConfirmation]);

  const handleRecaptchaResponse = value => {
    //context.enableSignUpButton();
    // console.log(value);
    // console.log('captcha:', recaptchaRef.current.getValue());
  };

  const handleSubmit = e => {
    e.preventDefault();

    const updatedFormState = clone(formState);

    const emailField = updatedFormState.fields['email'];
    const userNameField = updatedFormState.fields['userName'];
    const passwordField = updatedFormState.fields['password'];
    const passwordConfirmationField = updatedFormState.fields['passwordConfirmation'];
    const recaptchaField = updatedFormState.fields['recaptcha'];

    // Reset
    updatedFormState.valid = true;
    emailField.errors = [];
    userNameField.errors = [];
    passwordField.errors = [];
    passwordConfirmationField.errors = [];
    recaptchaField.errors = [];

    //Required check
    if (!emailField.ref.current.value.trim()) {
      emailField.errors.push({ text: 'A valid email is required' });
      updatedFormState.valid = false;
    }

    if (!userNameField.ref.current.value.trim()) {
      userNameField.errors.push({ text: 'A valid username is required' });
      updatedFormState.valid = false;
    }

    if (!passwordField.ref.current.value.trim()) {
      passwordField.errors.push({ text: 'A valid password is required' });
      updatedFormState.valid = false;
    }

    if (!passwordConfirmationField.ref.current.value.trim()) {
      passwordConfirmationField.errors.push({ text: 'A valid password confirmation is required' });
      updatedFormState.valid = false;
    }

    if (
      passwordField.ref.current.value.trim() &&
      passwordConfirmationField.ref.current.value.trim() &&
      passwordField.ref.current.value.trim() !== passwordConfirmationField.ref.current.value.trim()
    ) {
      passwordField.errors.push({ text: "Passwords don't match" });
      passwordConfirmationField.errors.push({ text: "Passwords don't match" });
      updatedFormState.valid = false;
    }

    if (!recaptchaField.ref.current.getValue().trim()) {
      recaptchaField.errors.push({ text: 'Please check the captcha' });
      updatedFormState.valid = false;
    }

    setFormState(updatedFormState);

    if (updatedFormState.valid) {
      context.updateEmail(emailField.ref.current.value);
      context.updateUserName(userNameField.ref.current.value);
      context.updatePassword(passwordField.ref.current.value);
      context.updatePasswordConfirmation(passwordConfirmationField.ref.current.value);
    }
  };

  return (
    <div className={classNames(styles.SignUpForm, 'm-sw m-rd-xt m-bg-grey-light-2 m-pd-md')}>
      <h1 className="title m-fs-sm m-wt-300 m-mg-xs-b">Create your account for free</h1>
      <hr className="m-bd-xt-grey-light-3" />
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

        <label htmlFor="username" className="m-mg-xt-b m-wt-700">
          Username
        </label>
        <input
          ref={userNameRef}
          id="username"
          className="control__input m-rd-xt m-pd-xt m-mg-xt-b"
          type="text"
          name="username"
          placeholder="Username"
        />
        <div className="errors m-mg-md-b">
          {formState.fields.userName.errors.map((error, index) => (
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

        <label htmlFor="passwordConfirmation" className="m-mg-xt-b m-wt-700">
          Password confirmation
        </label>
        <input
          ref={passwordConfirmationRef}
          id="passwordConfirmation"
          className="control__input m-rd-xt m-pd-xt m-mg-xt-b"
          type="password"
          name="passwordConfirmation"
          placeholder="password confirmation"
        />

        <div className="errors m-mg-md-b">
          {formState.fields.passwordConfirmation.errors.map((error, index) => (
            <p key={index} className="m-fs-xt m-tx-invalid">
              {error.text}
            </p>
          ))}
        </div>

        <div className="m-fx-c-c m-mg-md-b">
          <ReCAPTCHA
            ref={recaptchaRef}
            sitekey="6LddM6AUAAAAAICxVHT37G6gFlFuPPEzA9QQpg-v"
            onChange={handleRecaptchaResponse}
            size="normal"
          />
        </div>

        <div className="errors m-mg-md-b">
          {formState.fields.recaptcha.errors.map((error, index) => (
            <p key={index} className="m-fs-xt m-tx-invalid">
              {error.text}
            </p>
          ))}
        </div>

        <button
          type="submit"
          className="btn m-primary m-rd-xx m-pd-xt m-mg-sm-b m-al-c"
          disabled={context.isSignUpButtonDisabled}
        >
          Sign Up
        </button>
      </form>
    </div>
  );
};

export default SignUpForm;
