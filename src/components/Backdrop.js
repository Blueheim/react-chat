import React from 'react';
import ReactDOM from 'react-dom';
import classNames from 'classnames';

const Backdrop = ({ className, children }) => {
  const classes = classNames('backdrop', className);
  return ReactDOM.createPortal(<div className={classes}>{children}</div>, document.getElementById('backdrop-root'));
};

export default Backdrop;
