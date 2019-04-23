import React, { useRef, useEffect } from 'react';
import ReactDOM from 'react-dom';

const Tooltip = ({ referenceBoxId, targetId, position, children }) => {
  const tooltipRef = useRef();

  const referencePosition = document.getElementById(referenceBoxId).getBoundingClientRect();

  //console.log(boxPosition);

  useEffect(() => {
    //tooltipRef.current.style.opacity = 0;
  }, []);

  useEffect(() => {
    const { width: targetWidth, height: targetHeight } = document.getElementById(targetId).getBoundingClientRect();

    switch (position) {
      case 'top':
        tooltipRef.current.style.top = `${referencePosition.top - targetHeight}px`;
        tooltipRef.current.style.left = `${referencePosition.left + referencePosition.width / 2 - targetWidth / 2}px`;
        tooltipRef.current.style.opacity = 1;
        break;
      default:
    }
  });

  // toolTip
  //   .style('left', event.pageX - boundingRect.width / 2 + 'px')
  //   .style('top', event.pageY - boundingRect.height * 1.3 + 'px');

  return ReactDOM.createPortal(
    <div className="tooltip" ref={tooltipRef}>
      {children}
    </div>,
    document.getElementById('tooltip-root')
  );
};

export default Tooltip;
