import React from 'react';
import classNames from 'classnames';

const ControlLabel = ({ htmlFor, children, className }) => {
  const classes = classNames('m-mg-xt-b m-wt-700', className);
  return (
    <label htmlFor={htmlFor} className={classes}>
      {children}
    </label>
  );
};

export default ControlLabel;
