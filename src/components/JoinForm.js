import React from 'react';
import classNames from 'classnames';

const JoinForm = ({ formState, submitHandler }) => {
  const userInputClasses = classNames('control__input m-rd-xt m-pd-xt m-mg-xt-b', {
    'm-bd-xt-invalid': formState.fields['userName'].errors.length > 0,
  });
  const roomInputClasses = classNames('control__input m-rd-xt m-pd-xt m-mg-xt-b', {
    'm-bd-xt-invalid': formState.fields['roomName'].errors.length > 0,
  });

  return (
    <div>
      <form className="join-form m-fx-cl-c-sh m-pd-md m-sw m-rd-xt m-bg-grey-light-2" onSubmit={submitHandler}>
        <h1 className="title m-fs-sm m-wt-300 m-mg-xs-b">Quick Join</h1>
        <label htmlFor="userName" className="m-mg-xt-b m-wt-700">
          Username
        </label>
        <div className="control">
          <input
            ref={formState.fields.userName.ref}
            id="userName"
            className={userInputClasses}
            type="text"
            name="userName"
            placeholder="Username"
            autoComplete="off"
          />
        </div>

        <div className="errors m-mg-md-b">
          {formState.fields.userName.errors.map(error => (
            <p className="m-fs-xt m-tx-invalid">{error.text}</p>
          ))}
        </div>

        <label htmlFor="roomName" className="m-mg-xt-b m-wt-700">
          Room
        </label>
        <div className="control">
          <input
            ref={formState.fields.roomName.ref}
            id="roomName"
            className={roomInputClasses}
            type="text"
            name="roomName"
            placeholder="Room"
            autoComplete="off"
          />
        </div>
        <div className="errors m-mg-md-b">
          {formState.fields.roomName.errors.map(error => (
            <p className="m-fs-xt m-tx-invalid ">{error.text}</p>
          ))}
        </div>

        <button className="btn m-primary m-rd-xt m-pd-xt-v">Join</button>
      </form>
    </div>
  );
};

export default JoinForm;
