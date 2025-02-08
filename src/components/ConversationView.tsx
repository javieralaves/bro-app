'use client';

import { Match, Message } from '@/types';
import { useState } from 'react';

interface ConversationViewProps {
  match: Match;
  onSuggestionSelect: (suggestionId: string) => void;
  onMenuClick: () => void;
  isWaitingForResponse: boolean;
}

function ConversationView({ 
  match, 
  onSuggestionSelect, 
  onMenuClick,
  isWaitingForResponse 
}: ConversationViewProps) {
  const [selectedSuggestion, setSelectedSuggestion] = useState<string | null>(null);

  const handleSuggestionClick = (suggestionId: string) => {
    setSelectedSuggestion(suggestionId);
    onSuggestionSelect(suggestionId);
  };

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="p-4 border-b border-gray-200 bg-white">
        <div className="flex items-center gap-3">
          <button
            onClick={onMenuClick}
            className="p-2 -ml-2 lg:hidden"
          >
            <MenuIcon />
          </button>
          <img
            src={match.profilePicture}
            alt={match.name}
            className="w-10 h-10 rounded-full object-cover"
          />
          <div className="min-w-0 flex-1">
            <h2 className="font-semibold truncate">{match.name}</h2>
            <StatusBadge status={match.status} />
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {match.messages.map((message) => (
          <MessageItem key={message.id} message={message} />
        ))}
        {isWaitingForResponse && (
          <div className="flex gap-2 p-2">
            <div className="animate-bounce w-2 h-2 bg-gray-400 rounded-full" />
            <div className="animate-bounce w-2 h-2 bg-gray-400 rounded-full" style={{ animationDelay: '0.2s' }} />
            <div className="animate-bounce w-2 h-2 bg-gray-400 rounded-full" style={{ animationDelay: '0.4s' }} />
          </div>
        )}
      </div>

      {/* Suggestions */}
      {match.suggestions.length > 0 && (
        <div className="border-t border-gray-200 bg-white p-4">
          <h3 className="text-sm font-medium text-gray-500 mb-3">Suggested Responses</h3>
          <div className="space-y-2">
            {match.suggestions.map((suggestion) => (
              <button
                key={suggestion.id}
                onClick={() => handleSuggestionClick(suggestion.id)}
                disabled={selectedSuggestion !== null}
                className={`
                  w-full p-3 text-left rounded-lg border transition-all
                  ${selectedSuggestion === suggestion.id
                    ? 'border-blue-500 bg-blue-50'
                    : selectedSuggestion !== null
                    ? 'border-gray-200 opacity-50 cursor-not-allowed'
                    : 'border-gray-200 hover:border-blue-500 hover:bg-blue-50'
                  }
                `}
              >
                <p className="text-sm">{suggestion.content}</p>
                <p className="text-xs text-gray-500 mt-1">{suggestion.reasoning}</p>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function MessageItem({ message }: { message: Message }) {
  const isReceived = message.status === 'received';

  return (
    <div className={`space-y-2 ${isReceived ? '' : 'ml-auto'}`}>
      <div
        className={`
          max-w-[80%] rounded-2xl px-4 py-2
          ${isReceived 
            ? 'bg-gray-100 rounded-tl-none' 
            : 'bg-blue-500 text-white rounded-tr-none ml-auto'
          }
        `}
      >
        <p>{message.content}</p>
      </div>

      {/* Insights */}
      {isReceived && message.insights && message.insights.length > 0 && (
        <div className="space-y-1">
          {message.insights.map((insight, index) => (
            <div
              key={index}
              className="ml-4 p-2 bg-green-50 border-l-2 border-green-500 text-sm text-green-700"
            >
              {insight}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function StatusBadge({ status }: { status: Match['status'] }) {
  const colors = {
    'High engagement': 'bg-green-100 text-green-800',
    'Needs follow-up': 'bg-yellow-100 text-yellow-800',
    'Missed opportunity': 'bg-red-100 text-red-800',
    'New match': 'bg-blue-100 text-blue-800',
  };

  return (
    <span className={`
      px-2 py-1 text-xs rounded-full
      ${colors[status]}
    `}>
      {status}
    </span>
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

export default ConversationView; 