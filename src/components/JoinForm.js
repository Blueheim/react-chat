import React from 'react';

const JoinForm = ({ formState, submitHandler }) => {
  return (
    <div>
      <form className="form m-bg-white" onSubmit={submitHandler}>
        <label htmlFor="userName">Display name</label>
        <div className="control">
          <input
            ref={formState.fields.userName.ref}
            id="userName"
            className="control__input m-rd-xt m-pd-xt"
            type="text"
            name="userName"
            placeholder="Display name"
            autoComplete="off"
            required
          />
        </div>
        <p className="m-bd-xt-invalid">Error</p>

        <label htmlFor="roomName">Room</label>
        <div className="control">
          <input
            ref={formState.fields.roomName.ref}
            id="roomName"
            className="control__input m-rd-xt m-pd-xt"
            type="text"
            name="roomName"
            placeholder="Room"
            autoComplete="off"
            required
          />
        </div>

        <button className="btn m-primary m-rd-xt m-pd-xt-v">Join</button>
      </form>
    </div>
  );
};

export default JoinForm;
