import React from 'react';
import type { Conversation } from '../types';

interface ConversationListProps {
    conversations: Conversation[];
    selectedConversationId: number | null;
    onSelectConversation: (id: number) => void;
}

const ConversationList: React.FC<ConversationListProps> = ({ conversations, selectedConversationId, onSelectConversation }) => {
    
    const getLastMessage = (conv: Conversation) => {
        if (conv.messages.length === 0) return { text: 'لا توجد رسائل بعد', time: ''};
        const lastMsg = conv.messages[conv.messages.length - 1];
        return { text: lastMsg.text, time: lastMsg.timestamp };
    }
    
    return (
        <div className="flex-grow overflow-y-auto">
            {conversations.length > 0 ? (
                <ul>
                    {conversations.map(conv => {
                        const lastMessage = getLastMessage(conv);
                        const isSelected = conv.id === selectedConversationId;
                        return (
                            <li
                                key={conv.id}
                                onClick={() => onSelectConversation(conv.id)}
                                className={`flex items-start p-3 cursor-pointer border-b transition-colors duration-150 ${isSelected ? 'bg-indigo-50' : 'hover:bg-gray-50'}`}
                                aria-current={isSelected}
                            >
                                <div className="relative flex-shrink-0">
                                    <img src={conv.avatarUrl} alt={conv.name} className="h-12 w-12 rounded-full object-cover" />
                                    {conv.onlineStatus === 'online' && (
                                        <span className="absolute bottom-0 right-0 block h-3 w-3 rounded-full bg-green-500 ring-2 ring-white" title="متصل الآن"></span>
                                    )}
                                </div>

                                <div className="flex-grow mr-3 overflow-hidden">
                                    <div className="flex justify-between items-center">
                                        <h3 className={`text-base font-semibold ${conv.unread > 0 ? 'text-gray-900' : 'text-gray-700'}`}>{conv.name}</h3>
                                        <span className={`text-xs flex-shrink-0 ${conv.unread > 0 ? 'text-indigo-600 font-bold' : 'text-gray-500'}`}>{lastMessage.time}</span>
                                    </div>
                                    <p className={`text-sm truncate ${conv.unread > 0 ? 'text-gray-700 font-medium' : 'text-gray-500'}`}>{lastMessage.text}</p>
                                </div>
                                {conv.unread > 0 && (
                                    <div className="flex-shrink-0 h-5 w-5 bg-indigo-600 text-white text-xs rounded-full flex items-center justify-center self-center ml-2 font-semibold">
                                        {conv.unread}
                                    </div>
                                )}
                            </li>
                        )
                    })}
                </ul>
            ) : (
                <div className="text-center py-10 px-4 flex flex-col items-center justify-center h-full">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                    <p className="text-gray-500 mt-3">لم يتم العثور على محادثات.</p>
                </div>
            )}
        </div>
    );
};

export default ConversationList;
