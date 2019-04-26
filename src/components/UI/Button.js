import React from 'react';
import classNames from 'classnames';

const Button = ({ children, attributes, className }) => {
  const classes = classNames('btn', className);
  return (
    <button {...attributes} className={classes}>
      {children}
    </button>
  );
};

export default Button;
