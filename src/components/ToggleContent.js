import React, { useState } from 'react';

const ToggleContent = ({ toggleHOF, contentHOF }) => {
  const [isShown, setIsShown] = useState(false);

  const hide = () => setIsShown(false);
  const show = () => setIsShown(true);
  const toggle = () => setIsShown(!isShown);

  return (
    <React.Fragment>
      {toggleHOF({ toggle, show, hide })}
      {isShown && contentHOF(hide)}
    </React.Fragment>
  );
};

export default ToggleContent;
