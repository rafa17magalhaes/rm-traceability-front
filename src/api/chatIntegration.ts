import api from './api';
import { ChatDTO, ChatResponseDTO } from 'types/chat';

export const sendMessageToChatIntegration = async (
  dto: ChatDTO,
): Promise<ChatResponseDTO> => {
  const response = await api.post('/chat-integration', dto);
  return response.data;
};
