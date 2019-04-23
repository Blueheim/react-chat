import React from 'react';
import StatusIndicator from './StatusIndicator';

const StatusList = ({ clickHandler }) => {
  return (
    <div onClick={clickHandler}>
      <button className="status m-fx-st-c m-mg-xt-b" data-status="active">
        <StatusIndicator status="active" />
        <span>Active</span>
      </button>
      <button className="status m-fx-st-c m-mg-xt-b" data-status="away">
        <StatusIndicator status="away" />
        <span>Away</span>
      </button>
      <button className="status m-fx-st-c" data-status="busy">
        <StatusIndicator status="busy" />
        <span>Busy</span>
      </button>
    </div>
  );
};

export default StatusList;
