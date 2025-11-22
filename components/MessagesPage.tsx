import React, { useState, useMemo } from 'react';
import type { Conversation } from '../types';
import ConversationList from './ConversationList';
import ChatPanel from './ChatPanel';

const SearchIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className || "h-5 w-5 text-gray-400"} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
    </svg>
);

interface MessagesPageProps {
    conversations: Conversation[];
    selectedConversationId: number | null;
    onSelectConversation: (id: number | null) => void;
    onSendMessage: (conversationId: number, messageText: string) => void;
    onViewProfile: (id: number, type: 'user' | 'company') => void;
}

const MessagesPage: React.FC<MessagesPageProps> = ({ conversations, selectedConversationId, onSelectConversation, onSendMessage, onViewProfile }) => {
    const [searchTerm, setSearchTerm] = useState('');

    const handleBackToList = () => {
        onSelectConversation(null);
    };

    const filteredConversations = useMemo(() => {
        return conversations
            .filter(c => c.name.toLowerCase().includes(searchTerm.toLowerCase()))
            .sort((a, b) => {
                if (a.unread > 0 && b.unread === 0) return -1;
                if (a.unread === 0 && b.unread > 0) return 1;
                return 0;
            });
    }, [conversations, searchTerm]);

    const selectedConversation = useMemo(() => 
        conversations.find(c => c.id === selectedConversationId) || null
    , [conversations, selectedConversationId]);

    return (
        <div className="bg-gray-50 dark:bg-slate-900 h-[calc(100vh-64px)] flex flex-col md:flex-row overflow-hidden transition-colors duration-300">
            {/* Sidebar / List View */}
            <div className={`w-full md:w-1/3 lg:w-1/4 bg-white dark:bg-slate-800 border-l border-gray-200 dark:border-slate-700 flex flex-col h-full ${selectedConversationId ? 'hidden md:flex' : 'flex'}`}>
                 <div className="p-4 border-b border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-800">
                    <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">الرسائل</h2>
                    <div className="relative">
                        <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                            <SearchIcon />
                        </div>
                        <input
                            type="text"
                            placeholder="بحث في المحادثات..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full p-2.5 pr-10 bg-gray-50 dark:bg-slate-900 border border-gray-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all text-gray-900 dark:text-white"
                        />
                    </div>
                </div>
                
                <ConversationList 
                    conversations={filteredConversations}
                    selectedConversationId={selectedConversationId}
                    onSelectConversation={onSelectConversation}
                />
            </div>

            {/* Main Chat Area */}
            <div className={`w-full md:w-2/3 lg:w-3/4 bg-gray-50 dark:bg-slate-900 h-full flex flex-col ${!selectedConversationId ? 'hidden md:flex' : 'flex'}`}>
                {selectedConversation ? (
                    <ChatPanel 
                        conversation={selectedConversation}
                        onSendMessage={onSendMessage}
                        onBack={handleBackToList}
                        onViewProfile={onViewProfile}
                    />
                ) : (
                    <div className="hidden md:flex flex-col items-center justify-center h-full text-gray-400 dark:text-slate-500">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-24 w-24 mb-4 opacity-50" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                        </svg>
                        <p className="text-xl font-medium">اختر محادثة للبدء</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default MessagesPage;