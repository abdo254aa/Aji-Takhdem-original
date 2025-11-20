import React, { useState } from 'react';
// Fix: Use the correctly named MOCK_FULL_CONVERSATIONS import and add Conversation type.
import { MOCK_FULL_CONVERSATIONS } from '../constants';
import type { Conversation } from '../types';

const MessageIcon: React.FC<{ isOpen: boolean }> = ({ isOpen }) => {
    if (isOpen) {
        return (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
            </svg>
        )
    }
    return (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
        </svg>
    )
};

const CloseIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
    </svg>
);


const SearchIcon: React.FC<{className?: string}> = ({className}) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className || "h-5 w-5 text-gray-400"} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
    </svg>
);

const MessagingWidget: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');

    const togglePanel = () => {
        setIsOpen(!isOpen);
    };

    const filteredConversations = MOCK_FULL_CONVERSATIONS.filter(c => 
        c.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    
    const totalUnread = MOCK_FULL_CONVERSATIONS.reduce((sum, conv) => sum + conv.unread, 0);

    // Fix: Add helper function to get last message details from the messages array to match the Conversation type.
    const getLastMessageInfo = (conv: Conversation) => {
        if (!conv.messages || conv.messages.length === 0) {
            return { text: 'لا توجد رسائل بعد', time: '' };
        }
        const lastMsg = conv.messages[conv.messages.length - 1];
        return { text: lastMsg.text, time: lastMsg.timestamp };
    };

    return (
        <>
            <div className="fixed bottom-5 right-5 z-50">
                <button
                    onClick={togglePanel}
                    className="bg-indigo-600 text-white w-16 h-16 rounded-full shadow-lg flex items-center justify-center hover:bg-indigo-700 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    aria-label={isOpen ? "إغلاق الرسائل" : "فتح الرسائل"}
                >
                    <MessageIcon isOpen={isOpen} />
                    {totalUnread > 0 && !isOpen && (
                         <span className="absolute -top-1 -right-1 bg-rose-500 text-white text-xs rounded-full h-6 w-6 flex items-center justify-center border-2 border-white font-bold">
                            {totalUnread}
                        </span>
                    )}
                </button>
            </div>
            
            <div 
                className={`fixed bottom-24 right-5 w-[360px] h-[480px] bg-white rounded-xl shadow-2xl border border-gray-200 z-50 flex flex-col transition-all duration-300 ease-in-out transform ${isOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10 pointer-events-none'}`}
                aria-hidden={!isOpen}
            >
                {/* Header */}
                <div className="flex justify-between items-center p-4 border-b bg-gray-50 rounded-t-xl">
                    <h2 className="text-xl font-bold text-gray-800">الرسائل</h2>
                    <button onClick={togglePanel} className="text-gray-500 hover:text-gray-800" aria-label="إغلاق الرسائل">
                        <CloseIcon />
                    </button>
                </div>
                
                {/* Search */}
                <div className="p-3 border-b">
                    <div className="relative">
                        <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                            <SearchIcon className="h-5 w-5 text-gray-400" />
                        </div>
                        <input
                            type="text"
                            placeholder="البحث في الرسائل..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full p-2 pr-10 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-base"
                        />
                    </div>
                </div>

                {/* Conversations List */}
                <div className="flex-grow overflow-y-auto">
                    {filteredConversations.length > 0 ? (
                        <ul>
                            {filteredConversations.map(conv => {
                                // Fix: Use the helper function to get last message details.
                                const lastMessageInfo = getLastMessageInfo(conv);
                                return (
                                <li key={conv.id} className="flex items-start p-3 hover:bg-gray-50 cursor-pointer border-b transition-colors duration-150">
                                    <div className="flex-shrink-0 h-12 w-12 flex items-center justify-center bg-indigo-100 text-indigo-600 rounded-full font-bold text-xl">
                                        {conv.avatarChar}
                                    </div>
                                    <div className="flex-grow mr-3 overflow-hidden">
                                        <div className="flex justify-between items-center">
                                            <h3 className={`text-base font-semibold ${conv.unread > 0 ? 'text-gray-900' : 'text-gray-700'}`}>{conv.name}</h3>
                                            {/* Fix: Use derived last message info instead of non-existent properties. */}
                                            <span className={`text-xs flex-shrink-0 ${conv.unread > 0 ? 'text-indigo-600 font-bold' : 'text-gray-500'}`}>{lastMessageInfo.time}</span>
                                        </div>
                                        <p className={`text-sm truncate ${conv.unread > 0 ? 'text-gray-700 font-medium' : 'text-gray-500'}`}>{lastMessageInfo.text}</p>
                                    </div>
                                    {conv.unread > 0 && (
                                        <div className="flex-shrink-0 h-5 w-5 bg-indigo-600 text-white text-xs rounded-full flex items-center justify-center self-center ml-2 font-semibold">
                                            {conv.unread}
                                        </div>
                                    )}
                                </li>
                            )})}
                        </ul>
                    ) : (
                        <div className="text-center py-10 px-4 flex flex-col items-center justify-center h-full">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
                              <path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                            </svg>
                            <p className="text-gray-500 mt-3">لا توجد رسائل لعرضها.</p>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
};

export default MessagingWidget;