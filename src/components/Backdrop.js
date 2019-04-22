import React from 'react';
import ReactDOM from 'react-dom';

const Backdrop = ({ children }) =>
  ReactDOM.createPortal(<div className="backdrop">{children}</div>, document.getElementById('backdrop-root'));

export default Backdrop;
