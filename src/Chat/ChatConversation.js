import React, { useState, useContext, useRef, useEffect } from 'react';
import io from 'socket.io-client';
import { ChatConversationContext } from './store/chat-context';
import { clone } from 'ramda';
import { formatMessage, autoScroll } from '../utils/message';

import Modal from '../components/Modal';
import JoinForm from '../components/JoinForm';
import Backdrop from '../components/Backdrop';
import ToggleContent from '../components/ToggleContent';
import EmojiList from '../components/EmojiList';
import StatusList from '../components/StatusList';
import StatusIndicator from '../components/StatusIndicator';
import Tooltip from '../components/Tooltip';
import Message from '../components/Message';

const Chat = props => {
  const context = useContext(ChatConversationContext);

  const userNameRef = useRef();
  const roomNameRef = useRef();
  const messageRef = useRef();

  // TODO: to externalize
  const [joinFormState, setJoinFormState] = useState({
    valid: false,
    fields: {
      userName: {
        ref: userNameRef,
        errors: [],
      },
      roomName: {
        ref: roomNameRef,
        errors: [],
      },
    },
  });

  // On mount hook
  useEffect(() => {
    let sock = io('http://localhost:5000/chat');

    sock.on('connect', () => {
      console.log('connected');
      sock.emit('test', 'client data');
    });

    sock.on('chat message', message => {
      context.addMessage(message);
      //autoScroll();
    });

    sock.on('chat room data', ({ roomName, users }) => {
      // updater form
      context.updateRoomsInfos(roomName, users);
    });

    context.initSocket(sock);

    //-> To remove test purpose
    // setUserName('Xavier');
    // setRoomName('web');
    //<-
  }, []);

  // On update userName and roomName
  useEffect(() => {
    if (context.userName && context.roomName) {
      joinChat();
    }
  }, [context.userName, context.roomName]);

  const joinChat = () => {
    console.log(context.socket);
    const joinMessage = formatMessage(context.userName, 'info', `${context.userName} joined the room`);

    context.socket.emit(
      'chat join room',
      { roomName: context.roomName, message: joinMessage, userName: context.userName },
      error => {
        if (error) {
          console.log(error);
        }
      }
    );
  };

  // On update messages
  useEffect(() => {
    if (document.getElementById('messages')) {
      autoScroll(document.getElementById('messages'));
    }
  }, [context.messages]);

  const handleSubmitJoinForm = e => {
    e.preventDefault();

    const updatedFormState = clone(joinFormState);

    updatedFormState.valid = true;

    const userNameField = updatedFormState.fields['userName'];
    const roomNameField = updatedFormState.fields['roomName'];

    //Required check
    if (!userNameField.ref.current.value.trim()) {
      userNameField.errors.push({ text: 'A valid username is required' });
      updatedFormState.valid = false;
    }

    if (!roomNameField.ref.current.value.trim()) {
      roomNameField.errors.push({ text: 'A valid roomname is required' });
      updatedFormState.valid = false;
    }

    setJoinFormState(updatedFormState);

    if (updatedFormState.valid) {
      context.updateUserName(userNameField.ref.current.value);
      context.updateRoomName(roomNameField.ref.current.value);
    }
  };

  const handlerSelectEmoji = (e, hideTooltip) => {
    const emoji = e.target.dataset.emoji;
    if (emoji) {
      messageRef.current.value += emoji;
      hideTooltip();
      messageRef.current.focus();
    }
  };

  const handlerSelectStatus = (e, hideTooltip) => {
    const status = e.target.dataset.status;
    context.socket.emit('chat user status', status, error => {
      if (error) {
        return console.log(error);
      }

      context.updateUserStatus(status);
      hideTooltip();
    });
  };

  const handleSendNewMessage = event => {
    event.preventDefault();

    if (!messageRef.current.value) {
      return false;
    }
    console.log('submit');

    context.disableSendButton(true);
    //disable the form

    const message = formatMessage(context.userName, 'message', messageRef.current.value);

    context.socket.emit('chat new message', message, error => {
      context.enableSendButton(false);
      messageRef.current.value = '';
      messageRef.current.focus();

      // enable the form
      if (error) {
        return console.log(error);
      }

      console.log('Message delivered');
    });
  };

  return (
    <React.Fragment>
      {!context.userName || !context.roomName ? (
        <React.Fragment>
          <Backdrop className="m-bg-primary" />
          <Modal>
            <JoinForm formState={joinFormState} submitHandler={handleSubmitJoinForm} />
          </Modal>
        </React.Fragment>
      ) : (
        <div className="chat">
          <div className="chat__sidebar m-primary">
            {/* TODO: componize room list */}
            <div className="rooms">
              {context.roomsInfos.map((roomInfos, roomIndex) => {
                return (
                  <div className="room" key={roomIndex}>
                    <div className="room__name m-bg-primary-dark">#{roomInfos.name}</div>
                    <ul className="room__users">
                      {roomInfos.users.map((user, userIndex) => (
                        <li className="room__user m-fx-st-c" key={userIndex}>
                          <StatusIndicator status={user.status} />
                          <span className="m-pd-xt-l">{user.userName}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                );
              })}
            </div>
          </div>
          <div className="chat__main">
            <div id="messages" className="chat__messages">
              {context.messages.map((message, index) => (
                <Message key={index} message={message} isUserAuthored={message.userName === context.userName} />
              ))}
            </div>
            <div className="chat__composition m-bg-grey-light-2">
              <form className="composition__form " onSubmit={handleSendNewMessage}>
                <ToggleContent
                  toggleHOF={handlers => (
                    <button
                      id="toggleStatus"
                      className="btn m-sw m-pd-xt m-mg-xt-r m-fx-c-c m-bg-white m-rd-xt"
                      type="button"
                      onClick={handlers.toggle}
                    >
                      <StatusIndicator status={context.userStatus} />
                    </button>
                  )}
                  contentHOF={hide => (
                    <Tooltip referenceBoxId="toggleStatus" position="top" targetId="statutList">
                      <StatusList id="statutList" clickHandler={e => handlerSelectStatus(e, hide)} />
                    </Tooltip>
                  )}
                />
                <div className="control">
                  <input
                    className="control__input m-mg-xt-r m-pd-xt-l m-bd-xt-grey-light-3"
                    ref={messageRef}
                    autoComplete="off"
                  />
                </div>

                <ToggleContent
                  toggleHOF={handlers => (
                    <button
                      id="toggleEmojis"
                      className="btn m-sw m-pd-xt m-mg-xt-r m-fx-c-c m-bg-white m-rd-xt"
                      type="button"
                      onClick={handlers.toggle}
                    >
                      <span role="img" aria-label="">
                        🙂
                      </span>
                    </button>
                  )}
                  contentHOF={hide => (
                    <Tooltip referenceBoxId="toggleEmojis" position="top" targetId="emojiList">
                      <EmojiList id="emojiList" clickHandler={e => handlerSelectEmoji(e, hide)} />
                    </Tooltip>
                  )}
                />
                <button
                  className="btn m-info m-sw-info m-pd-xt m-rd-xt"
                  type="submit"
                  disabled={context.isSendButtonDisabled}
                >
                  Send
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
    </React.Fragment>
  );
};

export default Chat;
