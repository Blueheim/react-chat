import React from 'react';

const chatConversationContext = React.createContext({
  userName: '',
  updateUserName: () => {},
  roomName: '',
  updateRoomName: () => {},
  socket: null,
  initSocket: () => {},
  isSendButtonDisabled: false,
  disableSendButton: () => {},
  enableSendButton: () => {},
  messages: '',
  addMessage: () => {},
  userStatus: '',
  updateUserStatus: () => {},
  roomInfos: '',
  updateRoomsInfos: () => {},
});

export { chatConversationContext as ChatConversationContext };
