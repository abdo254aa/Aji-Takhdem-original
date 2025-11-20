import React, { useState, useMemo, useEffect } from 'react';
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
                if (b.unread > 0 && a.unread === 0) return 1;
                const lastMsgA = a.messages[a.messages.length - 1];
                const lastMsgB = b.messages[b.messages.length - 1];
                // A simple time sort fallback (not robust)
                if(lastMsgA && lastMsgB) return lastMsgB.id - lastMsgA.id;
                return 0;
            });
    }, [conversations, searchTerm]);

    const selectedConversation = useMemo(() => {
        if (!selectedConversationId) return null;
        return conversations.find(c => c.id === selectedConversationId) || null;
    }, [selectedConversationId, conversations]);

    // This effect ensures that on desktop, if the current selection is filtered out,
    // we select the first available conversation instead of showing an empty chat panel.
    useEffect(() => {
        const isDesktop = window.matchMedia('(min-width: 768px)').matches;
        if (isDesktop && selectedConversationId && !filteredConversations.some(c => c.id === selectedConversationId)) {
            if (filteredConversations.length > 0) {
                 onSelectConversation(filteredConversations[0].id);
            } else {
                 onSelectConversation(null);
            }
        }
    }, [filteredConversations, selectedConversationId, onSelectConversation]);


    return (
        <div className="bg-white">
            <div className="container mx-auto h-[calc(100vh-80px)] md:h-auto md:min-h-[calc(100vh-140px)] md:py-4">
                <div className="flex w-full h-full bg-white md:rounded-lg md:shadow-lg md:border overflow-hidden relative">
                    {/* Left Panel: Conversations List */}
                    <div className={`
                        ${selectedConversationId ? 'hidden' : 'flex'}
                        md:flex w-full md:w-1/3 md:border-l flex-col h-full absolute md:static inset-0 transition-transform duration-300 ease-in-out
                    `}>
                        <div className="p-4 border-b">
                            <h1 className="text-2xl font-bold text-gray-800">الرسائل</h1>
                            <div className="relative mt-4">
                                <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                                    <SearchIcon />
                                </div>
                                <input
                                    type="text"
                                    placeholder="بحث..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="w-full p-2 pr-10 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-base"
                                />
                            </div>
                        </div>
                        <ConversationList
                            conversations={filteredConversations}
                            selectedConversationId={selectedConversationId}
                            onSelectConversation={onSelectConversation}
                        />
                    </div>

                    {/* Right Panel: Chat */}
                    <div className={`
                        ${!selectedConversationId ? 'hidden' : 'flex'}
                        md:flex w-full md:w-2/3 flex-col h-full absolute md:static inset-0 transition-transform duration-300 ease-in-out
                    `}>
                        <ChatPanel
                            conversation={selectedConversation}
                            onSendMessage={onSendMessage}
                            onBack={handleBackToList}
                            onViewProfile={onViewProfile}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MessagesPage;