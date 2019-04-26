import { useImperativeHandle } from 'react';

const useInputRefHandle = (forwardRef, ref) => {
  useImperativeHandle(forwardRef, () => ({
    focus: () => {
      ref.current.focus();
    },
    getValue: () => {
      return ref.current.value;
    },
  }));
};

export { useInputRefHandle };
