import React from 'react';
import classNames from 'classnames';

const StatusIndicator = ({ status }) => {
  const baseClasses = 'round m-rd-xx m-dp-bk';
  let statusClass = '';

  switch (status) {
    case 'active':
      statusClass = 'm-bg-valid';
      break;
    case 'away':
      statusClass = 'm-bg-alert';
      break;
    case 'busy':
      statusClass = 'm-bg-invalid';
      break;
    default:
      statusClass = 'm-bg-valid';
  }

  return <span className={classNames(baseClasses, statusClass)} />;
};

export default StatusIndicator;
