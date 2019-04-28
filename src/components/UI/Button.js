import React from 'react';
import classNames from 'classnames';

const Button = ({ children, attributes, eventHandlers, className }) => {
  const classes = classNames('btn', className);
  return (
    <button {...attributes} className={classes} {...eventHandlers}>
      {children}
    </button>
  );
};

export default Button;
