import React from 'react';
import ChatUI from '../components/ChatUI';
import { BsStars } from 'react-icons/bs';
import { AiPageContainer, ChatArea, ChatHeader } from '../styles/chatStyles';

const AiPage: React.FC = () => {
  return (
    <AiPageContainer>
      <ChatArea>
        <ChatHeader>
          <BsStars style={{ marginRight: '0.5rem' }} size={24} />
          Assistente IA
        </ChatHeader>
        <ChatUI />
      </ChatArea>
    </AiPageContainer>
  );
};

export default AiPage;
