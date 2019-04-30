import React, { useContext } from 'react';
import AuthContext from '../Auth/store/auth-context';

import { NavLink } from 'react-router-dom';

import logo from '../statics/images/logo.png';

const HomeNavigation = () => {
  const authContext = useContext(AuthContext);

  return (
    <div className="l-nav">
      <nav className="nav nav--bar m-pd-md-h">
        <div className="nav__logo m-fx-cl-c-c">
          <NavLink to="/">
            <img src={logo} alt="logo" className="image" />
          </NavLink>
        </div>
        <ul className="nav__actions m-wt-900">
          <li className="nav__action m-tx-white">
            <NavLink to="/">What is parling ?</NavLink>
          </li>
          <li className="nav__action m-tx-white">
            <NavLink to="/">Help</NavLink>
          </li>
          <li className="nav__action m-tx-white">
            {!authContext.isAuthenticated ? (
              <NavLink to="/signin">Sign in</NavLink>
            ) : (
              <NavLink to="/user/settings">Your profile</NavLink>
            )}
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default HomeNavigation;
