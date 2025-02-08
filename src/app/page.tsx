'use client';

import { useState, useEffect } from 'react';
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
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
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

    setIsSidebarOpen(false);
  };

  const handleConversationSelect = (id: string) => {
    setActiveConversationId(id);
    // Close sidebar on mobile after selecting a conversation
    setIsSidebarOpen(false);
  };

  return (
    <div className="h-screen relative flex bg-gray-50">
      {/* Overlay for mobile */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-20 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div 
        className={`
          fixed lg:static inset-y-0 left-0 z-30
          w-80 bg-white border-r border-gray-200
          transform transition-transform duration-200 ease-in-out
          ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        `}
      >
        <ConversationList 
          conversations={conversations}
          activeConversationId={activeConversationId}
          onConversationSelect={handleConversationSelect}
        />
      </div>
      
      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        {!activeConversation ? (
          <div className="h-full flex flex-col items-center justify-center p-4 text-center text-gray-500">
            {/* Mobile menu button */}
            <button
              onClick={() => setIsSidebarOpen(true)}
              className="absolute top-4 left-4 p-2 lg:hidden"
            >
              <MenuIcon />
            </button>
            <p>Select a conversation to start</p>
          </div>
        ) : (
          <ConversationView 
            key={activeConversation.id}
            match={activeConversation}
            onSuggestionSelect={handleSuggestionSelect}
            onMenuClick={() => setIsSidebarOpen(true)}
            isWaitingForResponse={pendingResponses.has(activeConversation.id)}
          />
        )}
      </div>
    </div>
  );
}

function MenuIcon() {
  return (
    <svg 
      className="w-6 h-6" 
      fill="none" 
      stroke="currentColor" 
      viewBox="0 0 24 24"
    >
      <path 
        strokeLinecap="round" 
        strokeLinejoin="round" 
        strokeWidth={2} 
        d="M4 6h16M4 12h16M4 18h16" 
      />
    </svg>
  );
}
