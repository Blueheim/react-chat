import React, { useState } from 'react';
import { ChatConversationContext } from './chat-context';
import { clone } from 'ramda';

const ChatConversationState = ({ children }) => {
  const [socket, setSocket] = useState();
  const [isSendButtonDisabled, setButtonDisabled] = useState(false);
  const [messages, setMessages] = useState([]);
  const [userName, setUserName] = useState('');
  const [roomName, setRoomName] = useState('');
  const [userStatus, setUserStatus] = useState('');
  const [roomsInfos, setRoomsInfos] = useState([]);

  // Socket
  const initSocket = newSocket => {
    setSocket(newSocket);
  };

  // Send button
  const disableSendButton = () => {
    setButtonDisabled(true);
  };

  const enableSendButton = () => {
    setButtonDisabled(false);
  };

  // Messages
  const addMessage = message => {
    // github issues 15041
    // Because function components like useEffect capture the state that belongs to the render
    // The socket handling is the one created in first render when messages is empty
    // We Need to use set state in the "updater form"
    setMessages(messages => [...messages, message]);
  };

  // Username
  const updateUserName = name => {
    setUserName(name);
  };

  // Roomname
  const updateRoomName = name => {
    setRoomName(name);
  };

  // Status
  const updateUserStatus = status => {
    setUserStatus(status);
  };

  // Rooms infos
  const updateRoomsInfos = (roomName, users) => {
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
  };

  return (
    <ChatConversationContext.Provider
      value={{
        userName,
        updateUserName,
        roomName,
        updateRoomName,
        isSendButtonDisabled,
        disableSendButton,
        enableSendButton,
        socket,
        initSocket,
        messages,
        addMessage,
        userStatus,
        updateUserStatus,
        roomsInfos,
        updateRoomsInfos,
      }}
    >
      {children}
    </ChatConversationContext.Provider>
  );
};

export default ChatConversationState;
