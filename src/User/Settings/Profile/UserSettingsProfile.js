import React from 'react';

const UserSettingsProfile = () => {
  console.log('profile');
  return (
    <div className="m-pd-xt-h">
      <h1 className="title m-fs-sm m-wt-300 m-mg-xs-b">Profile settings</h1>
      <hr className="m-bd-xt-grey-light-3" />
      <form>
        <label>Profile picture</label>
        <input type="file" />
      </form>
    </div>
  );
};

export default UserSettingsProfile;
