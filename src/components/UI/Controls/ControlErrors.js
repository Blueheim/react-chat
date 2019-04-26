import React from 'react';
import classNames from 'classnames';

const ControlErrors = ({ errors, className }) => {
  const classes = classNames('m-fs-xt m-tx-invalid', className);

  return (
    <div className="errors m-mg-md-b">
      {errors.map((error, index) => (
        <p key={index} className={classes}>
          {error.text}
        </p>
      ))}
    </div>
  );
};

export default ControlErrors;
