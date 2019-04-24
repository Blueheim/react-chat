import React from 'react';
import ChatConversationState from './store/ChatConversationState';
import ChatConversation from './ChatConversation';

const ChatView = () => {
  return (
    <ChatConversationState>
      <ChatConversation />
    </ChatConversationState>
  );
};

export default ChatView;
