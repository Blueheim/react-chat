import React from 'react';
import classNames from 'classnames';
import dayjs from 'dayjs';

const Message = ({ message, isUserAuthored }) => {
  let rendering = null;

  switch (message.type) {
    case 'info':
      rendering = (
        <span className="message">
          <span className="message__body m-al-c m-bg-grey-light-1 m-rd-xx m-pd-xt-h">{message.text}</span>
        </span>
      );
      break;
    case 'message':
      const messageClasses = classNames('message box m-bg-grey-light-1 m-pd-xt m-rd-xt', {
        'm-al-en': isUserAuthored,
        'm-al-st': !isUserAuthored,
      });
      const bodyClasses = classNames('message__body m-wt-700', {
        'm-tx-primary': isUserAuthored,
        'm-tx-secondary': !isUserAuthored,
      });

      rendering = (
        <span className={messageClasses}>
          <span className="message__header m-fs-xt">
            {message.userName} - {dayjs(message.createdAt).format('HH:mm')}
          </span>
          <span className={bodyClasses}>{message.text}</span>
        </span>
      );
      break;

    default:
  }

  return rendering;
};

export default Message;
