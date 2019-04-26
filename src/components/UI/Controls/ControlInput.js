import React, { forwardRef, useRef } from 'react';
import { useInputRefHandle } from '../../../utils/refForwardHandlers';
import classNames from 'classnames';

const ControlInput = ({ attributes, eventHandlers, className }, ref) => {
  const inputRef = useRef();

  useInputRefHandle(ref, inputRef);

  const classes = classNames('control__input m-rd-xt m-pd-xt m-mg-xt-b', className);

  return (
    <div className="control">
      <input ref={inputRef} {...attributes} className={classes} {...eventHandlers} />
    </div>
  );
};

export default forwardRef(ControlInput);
