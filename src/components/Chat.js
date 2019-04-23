import React, { useState, useRef, useEffect } from 'react';
import io from 'socket.io-client';
import { clone } from 'ramda';
import { formatMessage, autoScroll } from '../utils/message';

import Modal from './Modal';
import JoinForm from './JoinForm';
import Backdrop from './Backdrop';
import ToggleContent from './ToggleContent';
import EmojiList from './EmojiList';
import StatusList from './StatusList';
import StatusIndicator from './StatusIndicator';
import Tooltip from './Tooltip';
import Message from './Message';

const Chat = props => {
  const userNameRef = useRef();
  const roomNameRef = useRef();
  const messageRef = useRef();

  const [socket, setSocket] = useState();
  const [isSendButtonDisabled, setButtonDisabled] = useState(false);
  const [messages, setMessages] = useState([]);
  const [userName, setUserName] = useState('');
  const [roomName, setRoomName] = useState('');
  const [status, setStatus] = useState('');
  const [roomsInfos, setRoomsInfos] = useState([]);
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
      // github issues 15041
      // Because function components like useEffect capture the state that belongs to the render
      // The socket handling is the one created in first render when messages is empty
      // We Need to use set state in the "updater form"
      setMessages(messages => [...messages, message]);
      //autoScroll();
    });

    sock.on('chat room data', ({ roomName, users }) => {
      // updater form
      setRoomsInfos(roomsInfos => {
        const updatedRoomsInfos = clone(roomsInfos);
        const roomInfosIndex = updatedRoomsInfos.findIndex(roomInfos => {
          return roomInfos.name === roomName;
        });

        if (roomInfosIndex === -1) {
          updatedRoomsInfos.push({
            name: roomName,
            users: users,
          });
        } else {
          updatedRoomsInfos[roomInfosIndex].users = users;
        }

        return updatedRoomsInfos;
      });
    });

    setSocket(sock);

    //-> To remove test purpose
    // setUserName('Xavier');
    // setRoomName('web');
    //<-
  }, []);

  // On update userName and roomName
  useEffect(() => {
    if (userName && roomName) {
      joinChat();
    }
  }, [userName, roomName]);

  const joinChat = () => {
    console.log(socket);
    const joinMessage = formatMessage(userName, 'info', `${userName} joined the room`);

    socket.emit('chat join room', { roomName: roomName, message: joinMessage, userName: userName }, error => {
      if (error) {
        console.log(error);
      }
    });
  };

  // On update messages
  useEffect(() => {
    if (document.getElementById('messages')) {
      autoScroll(document.getElementById('messages'));
    }
  }, [messages]);

  const handleSubmitJoinForm = e => {
    e.preventDefault();

    const updatedFormState = clone(joinFormState);

    updatedFormState.valid = true;

    const userNameField = updatedFormState.fields['userName'];
    const roomNameField = updatedFormState.fields['roomName'];

    //Required check
    if (!userNameField.ref.current.value.trim()) {
      userNameField.errors.push({ class: '', text: 'A valid username is required' });
      updatedFormState.valid = false;
    }

    if (!roomNameField.ref.current.value.trim()) {
      roomNameField.errors.push({ class: '', text: 'A valid roomname is required' });
      updatedFormState.valid = false;
    }

    setJoinFormState(updatedFormState);

    if (updatedFormState.valid) {
      setUserName(userNameField.ref.current.value);
      setRoomName(roomNameField.ref.current.value);
    }
  };

  const handlerSelectEmoji = (e, hideTooltip) => {
    const emoji = e.target.dataset.emoji;
    if (emoji) {
      messageRef.current.value += emoji;
      hideTooltip();
    }
  };

  const handlerSelectStatus = (e, hideTooltip) => {
    const status = e.target.dataset.status;
    socket.emit('chat user status', status, error => {
      if (error) {
        return console.log(error);
      }

      setStatus(status);
      hideTooltip();
    });
  };

  const handleSendNewMessage = event => {
    event.preventDefault();

    if (!messageRef.current.value) {
      return false;
    }
    console.log('submit');

    setButtonDisabled(true);
    //disable the form

    const message = formatMessage(userName, 'message', messageRef.current.value);

    socket.emit('chat new message', message, error => {
      setButtonDisabled(false);
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
      {!userName || !roomName ? (
        <React.Fragment>
          <Backdrop />
          <Modal>
            <JoinForm formState={joinFormState} submitHandler={handleSubmitJoinForm} />
          </Modal>
        </React.Fragment>
      ) : (
        <div className="chat">
          <div className="chat__sidebar m-primary">
            {/* TODO: componize room list */}
            <div className="rooms">
              {roomsInfos.map((roomInfos, roomIndex) => {
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
              {messages.map((message, index) => (
                <Message key={index} message={message} isUserAuthored={message.userName === userName} />
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
                      <StatusIndicator status={status} />
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
                <button className="btn m-info m-sw-info m-pd-xt m-rd-xt" type="submit" disabled={isSendButtonDisabled}>
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
