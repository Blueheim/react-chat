import React from 'react';
import UserSettingsMain from './UserSettingsMain';
import UserSettingsNav from './UserSettingsNav';
import UserSettingsProfile from './Profile/UserSettingsProfile';

const UserSettingsView = props => {
  return (
    <div className="m-fx-sh-sh m-bg-grey-light-2">
      <UserSettingsNav />
      <UserSettingsMain />
    </div>
  );
};

export default UserSettingsView;
