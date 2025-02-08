'use client';

import { useState } from 'react';
import ConversationList from '@/components/ConversationList';
import ConversationView from '@/components/ConversationView';
import { mockConversations } from '@/data/mockData';
import { Match, Message } from '@/types';

// Simulated responses for different message types
const SIMULATED_RESPONSES = {
  date: [
    {
      content: "That sounds great! Looking forward to it 😊",
      insights: ["Enthusiastic response to date suggestion - strong positive signal!"]
    },
    {
      content: "Yes, that works perfectly for me!",
      insights: ["Direct confirmation - proceed with specific plans"]
    }
  ],
  question: [
    {
      content: "I love trying new restaurants! Thai and Italian are my favorites",
      insights: ["Sharing personal preferences - good opportunity to suggest a related date"]
    },
    {
      content: "Mostly on weekends, but I'm free some evenings too",
      insights: ["Offering schedule flexibility - consider suggesting a specific day"]
    }
  ],
  general: [
    {
      content: "Haha that's so true! 😄",
      insights: ["Positive emotional response - maintain this energy"]
    },
    {
      content: "Oh interesting! Tell me more about that",
      insights: ["Showing curiosity - great sign of engagement"]
    }
  ]
};

// Generate new suggestions based on the latest message
function generateNewSuggestions(lastMessage: string) {
  if (lastMessage.toLowerCase().includes('weekend') || lastMessage.toLowerCase().includes('free')) {
    return [
      {
        id: `s${Date.now()}-1`,
        content: "How about we grab dinner this Saturday? I know a great Thai place!",
        reasoning: "Converting schedule discussion into concrete plans"
      },
      {
        id: `s${Date.now()}-2`,
        content: "Would you prefer an evening meetup or are afternoons better for you?",
        reasoning: "Narrowing down timing preferences"
      }
    ];
  }
  
  return [
    {
      id: `s${Date.now()}-1`,
      content: "That's awesome! What kind of adventures are you looking for these days?",
      reasoning: "Keeping conversation engaging and learning more"
    },
    {
      id: `s${Date.now()}-2`,
      content: "Sounds fun! Would you be interested in exploring that together sometime?",
      reasoning: "Natural transition to date suggestion"
    }
  ];
}

export default function Home() {
  const [conversations, setConversations] = useState<Match[]>(mockConversations);
  const [activeConversationId, setActiveConversationId] = useState<string | null>(null);
  const [pendingResponses, setPendingResponses] = useState<Set<string>>(new Set());

  const activeConversation = conversations.find(c => c.id === activeConversationId);

  // Simulate response after suggestion selection
  const simulateResponse = (conversationId: string, message: Message) => {
    setPendingResponses(prev => new Set(prev).add(conversationId));
    
    // Random response delay between 2-4 seconds
    const delay = 2000 + Math.random() * 2000;

    setTimeout(() => {
      setConversations(currentConversations => 
        currentConversations.map(conv => {
          if (conv.id !== conversationId) return conv;

          // Pick a random response based on message content
          const responseType = message.content.toLowerCase().includes('saturday') || 
                             message.content.toLowerCase().includes('weekend') ? 'date' : 
                             message.content.includes('?') ? 'question' : 'general';
          
          const possibleResponses = SIMULATED_RESPONSES[responseType];
          const response = possibleResponses[Math.floor(Math.random() * possibleResponses.length)];

          const newMessage = {
            id: `m${Date.now()}`,
            content: response.content,
            timestamp: new Date().toISOString(),
            status: 'received' as const,
            insights: response.insights
          };

          return {
            ...conv,
            lastMessage: response.content,
            messages: [...conv.messages, newMessage],
            suggestions: generateNewSuggestions(response.content)
          };
        })
      );

      setPendingResponses(prev => {
        const next = new Set(prev);
        next.delete(conversationId);
        return next;
      });
    }, delay);
  };

  const handleSuggestionSelect = (suggestionId: string) => {
    if (!activeConversationId) return;

    setConversations(currentConversations => 
      currentConversations.map(conv => {
        if (conv.id !== activeConversationId) return conv;

        const selectedSuggestion = conv.suggestions.find(s => s.id === suggestionId);
        if (!selectedSuggestion) return conv;

        const newMessage = {
          id: `m${Date.now()}`,
          content: selectedSuggestion.content,
          timestamp: new Date().toISOString(),
          status: 'sent' as const
        };

        return {
          ...conv,
          lastMessage: selectedSuggestion.content,
          messages: [...conv.messages, newMessage],
          suggestions: [] // Clear suggestions after selection
        };
      })
    );

    // Trigger response simulation
    simulateResponse(activeConversationId, {
      id: `m${Date.now()}`,
      content: conversations.find(c => c.id === activeConversationId)?.suggestions.find(s => s.id === suggestionId)?.content || '',
      timestamp: new Date().toISOString(),
      status: 'sent'
    });
  };

  const handleConversationSelect = (id: string) => {
    setActiveConversationId(id);
  };

  return (
    <div className="h-screen flex bg-gray-50">
      {/* Desktop sidebar - hidden on mobile unless conversation is not selected */}
      <div className={`
        ${!activeConversationId ? 'w-full' : 'hidden'} 
        lg:block lg:w-80 lg:border-r lg:border-gray-200
      `}>
        <ConversationList 
          conversations={conversations}
          activeConversationId={activeConversationId}
          onConversationSelect={handleConversationSelect}
        />
      </div>

      {/* Main content area - full width on mobile when conversation selected */}
      <div className={`
        ${activeConversationId ? 'w-full' : 'hidden lg:block'} 
        lg:flex-1
      `}>
        {activeConversation ? (
          <ConversationView 
            key={activeConversation.id}
            match={activeConversation}
            onSuggestionSelect={handleSuggestionSelect}
            onBackClick={() => setActiveConversationId(null)}
            isWaitingForResponse={pendingResponses.has(activeConversationId)}
          />
        ) : (
          <div className="hidden lg:flex h-full items-center justify-center p-4 text-center text-gray-500">
            <p>Select a conversation to start</p>
          </div>
        )}
      </div>
    </div>
  );
}
