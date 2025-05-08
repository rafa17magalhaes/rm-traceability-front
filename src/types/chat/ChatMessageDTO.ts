export interface ChatMessage {
  from: 'user' | 'agent';
  text: string;
  timeMs?: number;
}
