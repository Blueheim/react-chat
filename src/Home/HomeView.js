import React from 'react';
import { Link } from 'react-router-dom';
import Backdrop from '../components/Backdrop';
import AuthForm from '../Auth/AuthForm';

const HomeView = () => {
  return (
    // <div className="l-nav">
    //   <nav className="nav--bar">
    //     <ul>
    //       <li>link 1</li>
    //     </ul>
    //   </nav>
    // </div>
    <header className="home l-hero m-fx-sh-c">
      <div className="home__text-box m-tx-white m-pd-md-h m-fx-cl-c-c">
        <h1 className="title title-3 m-tx-c m-mg-md-b m-tx-et-primary-light">
          Another way to chat with the whole world
        </h1>
        <Link to="/chat" className="btn m-alert m-pd-sm-h m-pd-xt-v m-fs-sm m-rd-xx m-sw">
          I can't wait
        </Link>
      </div>
      <div className="home__auth-form">
        <AuthForm />
      </div>
    </header>
  );
};

export default HomeView;
