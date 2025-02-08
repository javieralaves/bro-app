import { create } from 'zustand';
import { mockConversations } from '@/data/mockData';
import { Match } from '@/types';

interface ConversationStore {
  conversations: Match[];
  activeConversationId: string | null;
  setActiveConversation: (id: string) => void;
  selectSuggestion: (conversationId: string, suggestionId: string) => void;
}

export const useConversationStore = create<ConversationStore>((set) => ({
  conversations: mockConversations,
  activeConversationId: null,
  setActiveConversation: (id) => set({ activeConversationId: id }),
  selectSuggestion: (conversationId, suggestionId) => {
    set((state) => ({
      conversations: state.conversations.map((conv) => {
        if (conv.id === conversationId) {
          return {
            ...conv,
            messages: [
              ...conv.messages,
              {
                id: `m${Date.now()}`,
                content: conv.suggestions.find(s => s.id === suggestionId)?.content || '',
                timestamp: new Date().toISOString(),
                status: 'sent'
              }
            ]
          };
        }
        return conv;
      })
    }));
  }
})); 