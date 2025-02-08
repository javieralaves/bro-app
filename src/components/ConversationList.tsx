'use client';

import { Match } from '@/types';

interface ConversationListProps {
  conversations: Match[];
  activeConversationId: string | null;
  onConversationSelect: (id: string) => void;
}

function ConversationList({ 
  conversations, 
  activeConversationId, 
  onConversationSelect 
}: ConversationListProps) {
  return (
    <div className="h-full flex flex-col bg-white">
      <div className="p-4 border-b border-gray-200">
        <h2 className="text-xl font-semibold">Messages</h2>
      </div>
      
      <div className="flex-1 overflow-y-auto">
        {conversations.map((match) => (
          <ConversationItem 
            key={match.id}
            match={match}
            isActive={match.id === activeConversationId}
            onClick={() => onConversationSelect(match.id)}
          />
        ))}
      </div>
    </div>
  );
}

function ConversationItem({ 
  match, 
  isActive, 
  onClick 
}: { 
  match: Match; 
  isActive: boolean; 
  onClick: () => void;
}) {
  return (
    <div
      onClick={onClick}
      className={`
        p-4 border-b border-gray-200 cursor-pointer transition-colors
        ${isActive ? 'bg-blue-50' : 'hover:bg-gray-50'}
      `}
    >
      <div className="flex items-center gap-3">
        <img
          src={match.profilePicture}
          alt={match.name}
          className="w-12 h-12 rounded-full object-cover flex-shrink-0"
        />
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between gap-2">
            <h3 className="font-medium truncate">{match.name}</h3>
            <StatusBadge status={match.status} />
          </div>
          {match.lastMessage && (
            <p className="text-sm text-gray-500 truncate">
              {match.lastMessage}
            </p>
          )}
        </div>
      </div>
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

export default ConversationList; 