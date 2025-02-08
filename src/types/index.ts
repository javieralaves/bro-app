export type MessageStatus = 'sent' | 'received';

export type ConversationStatus = 
  | 'High engagement' 
  | 'Needs follow-up' 
  | 'Missed opportunity' 
  | 'New match';

export interface Message {
  id: string;
  content: string;
  timestamp: string;
  status: MessageStatus;
  insights?: string[];
}

export interface Suggestion {
  id: string;
  content: string;
  reasoning: string;
}

export interface Match {
  id: string;
  name: string;
  profilePicture: string;
  status: ConversationStatus;
  lastMessage?: string;
  messages: Message[];
  suggestions: Suggestion[];
} 