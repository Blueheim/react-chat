import React from 'react';
import StatusIndicator from './StatusIndicator';

const StatusList = ({ id, clickHandler }) => {
  return (
    <div id={id} onClick={clickHandler} className="m-fx-cl-c-sh m-sw m-bg-white">
      <button className="status m-fx-st-c m-mg-xt-b m-pd-xt" data-status="active">
        <StatusIndicator status="active" />
        <span className="m-pd-xt-l">Active</span>
      </button>
      <button className="status m-fx-st-c m-mg-xt-b m-pd-xt" data-status="away">
        <StatusIndicator status="away" />
        <span className="m-pd-xt-l">Away</span>
      </button>
      <button className="status m-fx-st-c m-pd-xt" data-status="busy">
        <StatusIndicator status="busy" />
        <span className="m-pd-xt-l">Busy</span>
      </button>
    </div>
  );
};

export default StatusList;
