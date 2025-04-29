import React from 'react';
import ChatUI from '../components/ChatUI';
import { AnimatedIcon, AiPageContainer, ChatArea, ChatHeader } from '../styles/chatStyles';

const AiPage: React.FC = () => (
  <AiPageContainer>
    <ChatArea>
      <ChatHeader>
        <AnimatedIcon size={24} />
        Assistente RM Traceability
      </ChatHeader>
      <ChatUI />
    </ChatArea>
  </AiPageContainer>
);

export default AiPage;
