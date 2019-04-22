import React, { useState, useRef, useEffect } from 'react';
import io from 'socket.io-client';
import { clone } from 'ramda';
import { formatMessage } from '../utils/message';
import dayjs from 'dayjs';
import Modal from './Modal';
import JoinForm from './JoinForm';
import Backdrop from './Backdrop';
import ToggleContent from './ToggleContent';
import EmojiList from './EmojiList';

const Chat = props => {
  const userNameRef = useRef();
  const roomNameRef = useRef();
  const messageRef = useRef();

  const [socket, setSocket] = useState();
  const [isSendButtonDisabled, setButtonDisabled] = useState(false);
  const [messages, setMessages] = useState([]);
  const [userName, setUserName] = useState('');
  const [roomName, setRoomName] = useState('');
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

    setSocket(sock);
  }, []);

  // On change userName and roomName
  useEffect(() => {
    if (userName && roomName) {
      joinChat();
    }
  }, [userName, roomName]);

  const joinChat = () => {
    console.log(socket);
    const joinMessage = formatMessage(userName, 'info', `${userName} joined`);

    socket.emit('chat join room', { roomName: roomName, message: joinMessage, userName: userName }, error => {
      if (error) {
        console.log(error);
      }
    });

    socket.on('chat user join', ({ roomName, users }) => {
      console.log(roomName);
      console.log(users);
    });
  };

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

  const handleSendNewMessage = event => {
    event.preventDefault();

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

  // to refactor for react
  // const autoScroll = () => {
  //   // New message
  //   const newMessage = $messages.lastElementChild;

  //   // Height of the new message
  //   const newMessageStyles = getComputedStyle(newMessage);
  //   const newMessageMargin = parseInt(newMessageStyles.marginBottom);
  //   const newMessageHeight = newMessage.offsetHeight + newMessageMargin;

  //   // VisibleHeight

  //   const visibleHeight = $messages.offsetHeight;

  //   // Height of messages container
  //   const containerHeight = $messages.scrollHeight;

  //   // How far have i scrolled
  //   const scrollOffset = $messages.scrollTop + visibleHeight;

  //   if (containerHeight - newMessageHeight <= scrollOffset) {
  //     $messages.scrollTop = $messages.scrollHeight;
  //   }
  // };

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
          <div className="chat__sidebar">
            <span />
          </div>
          <div className="chat__main">
            <div className="chat__messages">
              {messages.map((message, index) => (
                <span key={index} className="message">
                  <span className="message__header">
                    {message.userName} - {dayjs(message.createdAt).format('HH:mm')}
                  </span>
                  <span className="message__body">{message.text}</span>
                </span>
              ))}
            </div>
            <div className="chat__composition">
              <form className="composition__form" onSubmit={handleSendNewMessage}>
                <div className="control">
                  <input className="control__input m-bd-xt m-mg-xt-r m-pd-xt-l" ref={messageRef} autoComplete="off" />
                </div>
                <ToggleContent
                  toggle={show => (
                    <button className="m-primary m-pd-xt m-mg-xt-r m-fx-c-c" type="button" onClick={show}>
                      <span role="img" aria-label="">
                        🙂
                      </span>
                    </button>
                  )}
                  content={hide => (
                    <Modal>
                      <EmojiList clickHandler={e => handlerSelectEmoji(e, hide)} />
                    </Modal>
                  )}
                />
                <button className="m-primary m-pd-xt" type="submit" disabled={isSendButtonDisabled}>
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
