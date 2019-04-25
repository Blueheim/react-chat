import React from 'react';
import { Link } from 'react-router-dom';
import HomeNavigation from './HomeNavigation';
import SignInForm from '../Auth/SignInForm';

const HomeView = () => {
  return (
    // <div className="l-nav">
    //   <nav className="nav--bar">
    //     <ul>
    //       <li>link 1</li>
    //     </ul>
    //   </nav>
    // </div>
    <header className="home l-header l-hero">
      <HomeNavigation />
      <div className="l-header__content ">
        <div className="home__text-box m-tx-white m-pd-md-h m-fx-cl-c-c ">
          <h1 className="home__title title title-3 m-tx-c m-mg-md-b m-tx-et-primary-light">
            Another way to chat with the whole world
          </h1>
          <Link to="/chat" className="btn m-alert m-pd-sm-h m-pd-xt-v m-fs-sm m-rd-xx m-sw">
            I can't wait
          </Link>
        </div>
        <div className="home__auth-form m-fx-cl-c-c">
          <SignInForm />
        </div>
      </div>
    </header>
  );
};

export default HomeView;
