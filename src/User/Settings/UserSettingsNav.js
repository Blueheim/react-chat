import React from 'react';
import { withRouter, NavLink } from 'react-router-dom';
import classNames from 'classnames';
import styles from './UserSettingsNav.module.scss';

const UserSettingsNav = props => {
  console.log(`${props.match.url}/profile`);
  const settingClasses = classNames('m-pd-sm-h m-pd-xt-v m-fx-st-c m-mg-ty-b');
  const settingActiveClasses = classNames('m-mg-sm-r m-bg-gd-primary-l m-tx-white m-wt-900 m-rd-xx-r');

  return (
    <div className={classNames(styles.UserSettingsNav, 'm-bg-grey-dark-3')}>
      <ul className="m-pd-md-v m-fs-xs m-fx-cl">
        <NavLink to={`${props.match.url}/profile`} className={settingClasses} activeClassName={settingActiveClasses}>
          Profile
        </NavLink>
        <NavLink to={`${props.match.url}/account`} className={settingClasses}>
          Account
        </NavLink>
        <NavLink to={`${props.match.url}/security`} className={settingClasses}>
          Security
        </NavLink>
        <NavLink to={`${props.match.url}/messages`} className={settingClasses}>
          Messages
        </NavLink>
        <NavLink to={`${props.match.url}/notifications`} className={settingClasses}>
          Notifications
        </NavLink>
        <NavLink to={`${props.match.url}/chat`} className={settingClasses}>
          Chat
        </NavLink>
        <NavLink to={`${props.match.url}/blacklist`} className={settingClasses}>
          Blacklist
        </NavLink>
      </ul>
    </div>
  );
};

export default withRouter(UserSettingsNav);
