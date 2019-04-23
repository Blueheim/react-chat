import React from 'react';

const JoinForm = ({ formState, submitHandler }) => {
  return (
    <div>
      <form
        className="join-form m-fx-cl-c-sh m-bg-white m-pd-md m-sw m-rd-xt m-bg-grey-light-2"
        onSubmit={submitHandler}
      >
        <label htmlFor="userName" className="m-mg-xt-b m-wt-700">
          Display name
        </label>
        <div className="control">
          <input
            ref={formState.fields.userName.ref}
            id="userName"
            className="control__input m-rd-xt m-pd-xt m-mg-xt-b"
            type="text"
            name="userName"
            placeholder="Display name"
            autoComplete="off"
            required
          />
        </div>
        <p className="m-fs-xt m-tx-invalid m-mg-md-b">Error</p>

        <label htmlFor="roomName" className="m-mg-xt-b m-wt-700">
          Room
        </label>
        <div className="control">
          <input
            ref={formState.fields.roomName.ref}
            id="roomName"
            className="control__input m-rd-xt m-pd-xt m-mg-xt-b"
            type="text"
            name="roomName"
            placeholder="Room"
            autoComplete="off"
            required
          />
        </div>
        <p className="m-fs-xt m-tx-invalid m-mg-md-b">Error</p>

        <button className="btn m-primary m-rd-xt m-pd-xt-v">Join</button>
      </form>
    </div>
  );
};

export default JoinForm;
