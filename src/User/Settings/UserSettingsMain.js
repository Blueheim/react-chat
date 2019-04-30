import React from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';
import styles from './UserSettingsMain.module.scss';
import UserSettingsProfile from './Profile/UserSettingsProfile';
import classNames from 'classnames';

const UserSettingsMain = props => {
  return (
    <div className={classNames(styles.UserSettingsMain, 'm-mg-xt-l')}>
      <div className={classNames(styles.UserSettingsMain__container, 'm-pd-md-t m-bg-white')}>
        <Switch>
          <Route path={`${props.match.path}/profile`} component={UserSettingsProfile} exact />
        </Switch>
      </div>
    </div>
  );
};

export default withRouter(UserSettingsMain);
