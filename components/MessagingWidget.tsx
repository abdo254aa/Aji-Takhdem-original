
import React, { useState } from 'react';
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

    const getLastMessageInfo = (conv: Conversation) => {
        if (!conv.messages || conv.messages.length === 0) {
            return { text: 'لا توجد رسائل بعد', time: '' };
        }
        const lastMsg = conv.messages[conv.messages.length - 1];
        return { text: lastMsg.text, time: lastMsg.timestamp };
    };

    return (
        <div className="md:hidden">
            {/* Positioned higher to allow Notification Widget at the bottom */}
            <div className="fixed bottom-24 right-6 z-50">
                <button
                    onClick={togglePanel}
                    className="bg-indigo-600 hover:bg-indigo-700 text-white w-14 h-14 rounded-full shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex items-center justify-center relative focus:outline-none focus:ring-4 focus:ring-indigo-300 dark:focus:ring-indigo-900"
                    aria-label={isOpen ? "إغلاق الرسائل" : "فتح الرسائل"}
                >
                    <MessageIcon isOpen={isOpen} />
                    {totalUnread > 0 && !isOpen && (
                         <span className="absolute -top-1 -right-1 bg-rose-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center border-2 border-white dark:border-slate-900 font-bold shadow-sm animate-bounce">
                            {totalUnread}
                        </span>
                    )}
                </button>
            </div>
            
            <div 
                className={`fixed bottom-40 right-6 w-[340px] sm:w-[360px] h-[480px] bg-white dark:bg-slate-800 rounded-2xl shadow-2xl border border-gray-100 dark:border-slate-700 z-50 flex flex-col transition-all duration-300 ease-in-out transform origin-bottom-right ${isOpen ? 'opacity-100 scale-100 translate-y-0' : 'opacity-0 scale-90 translate-y-8 pointer-events-none'}`}
                aria-hidden={!isOpen}
            >
                {/* Header */}
                <div className="flex justify-between items-center p-4 border-b border-gray-100 dark:border-slate-700 bg-indigo-600 rounded-t-2xl text-white">
                    <h2 className="text-lg font-bold flex items-center gap-2">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                        </svg>
                        الرسائل
                    </h2>
                    <button onClick={togglePanel} className="text-white/80 hover:text-white bg-white/10 hover:bg-white/20 p-1 rounded-full transition" aria-label="إغلاق الرسائل">
                        <CloseIcon />
                    </button>
                </div>
                
                {/* Search */}
                <div className="p-3 border-b border-gray-100 dark:border-slate-700 bg-gray-50 dark:bg-slate-800">
                    <div className="relative">
                        <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                            <SearchIcon className="h-5 w-5 text-gray-400" />
                        </div>
                        <input
                            type="text"
                            placeholder="البحث في الرسائل..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full p-2 pr-10 border border-gray-200 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-sm bg-white dark:bg-slate-700 dark:text-white dark:placeholder-slate-400 outline-none"
                        />
                    </div>
                </div>

                {/* Conversations List */}
                <div className="flex-grow overflow-y-auto custom-scrollbar">
                    {filteredConversations.length > 0 ? (
                        <ul className="divide-y divide-gray-50 dark:divide-slate-700">
                            {filteredConversations.map(conv => {
                                const lastMessageInfo = getLastMessageInfo(conv);
                                return (
                                <li key={conv.id} className="flex items-center p-3 hover:bg-gray-50 dark:hover:bg-slate-700 cursor-pointer transition-colors duration-150">
                                    <div className="relative flex-shrink-0">
                                         <div className="h-12 w-12 flex items-center justify-center bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 rounded-full font-bold text-xl border-2 border-white dark:border-slate-700 shadow-sm">
                                            {conv.avatarChar}
                                        </div>
                                        {conv.onlineStatus === 'online' && (
                                            <span className="absolute bottom-0 right-0 h-3 w-3 bg-green-500 border-2 border-white dark:border-slate-800 rounded-full"></span>
                                        )}
                                    </div>
                                   
                                    <div className="flex-grow mr-3 overflow-hidden">
                                        <div className="flex justify-between items-center mb-1">
                                            <h3 className={`text-sm font-bold truncate ${conv.unread > 0 ? 'text-gray-900 dark:text-white' : 'text-gray-700 dark:text-slate-200'}`}>{conv.name}</h3>
                                            <span className={`text-[10px] flex-shrink-0 ${conv.unread > 0 ? 'text-indigo-600 dark:text-indigo-400 font-bold' : 'text-gray-400 dark:text-slate-500'}`}>{lastMessageInfo.time}</span>
                                        </div>
                                        <p className={`text-xs truncate ${conv.unread > 0 ? 'text-gray-800 dark:text-slate-300 font-medium' : 'text-gray-500 dark:text-slate-400'}`}>{lastMessageInfo.text}</p>
                                    </div>
                                    {conv.unread > 0 && (
                                        <div className="flex-shrink-0 h-5 w-5 bg-indigo-600 text-white text-[10px] rounded-full flex items-center justify-center self-center ml-2 font-bold shadow-sm">
                                            {conv.unread}
                                        </div>
                                    )}
                                </li>
                            )})}
                        </ul>
                    ) : (
                        <div className="text-center py-10 px-4 flex flex-col items-center justify-center h-full">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-gray-200 dark:text-slate-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
                              <path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                            </svg>
                            <p className="text-gray-400 dark:text-slate-500 mt-3 text-sm">لا توجد رسائل لعرضها.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default MessagingWidget;
