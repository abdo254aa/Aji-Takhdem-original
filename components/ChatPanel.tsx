
import React, { useState, useEffect, useRef } from 'react';
import type { Conversation, Message } from '../types';

const SendIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
    </svg>
);

const BackArrowIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
    </svg>
);

const PlusIcon: React.FC<{className?: string}> = ({className}) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className || "h-6 w-6"} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
    </svg>
);

const ImageIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2 text-gray-500" viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
    </svg>
);

const DocumentIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2 text-gray-500" viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z" clipRule="evenodd" />
    </svg>
);

interface ChatPanelProps {
    conversation: Conversation | null;
    onSendMessage: (conversationId: number, messageText: string) => void;
    onBack: () => void;
    onViewProfile: (id: number, type: 'user' | 'company') => void;
}

const ChatPanel: React.FC<ChatPanelProps> = ({ conversation, onSendMessage, onBack, onViewProfile }) => {
    const [newMessage, setNewMessage] = useState('');
    const [showAttachmentOptions, setShowAttachmentOptions] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const attachmentRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "auto" });
    }

    useEffect(() => {
        scrollToBottom();
    }, [conversation?.messages]);

     useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (attachmentRef.current && !attachmentRef.current.contains(event.target as Node)) {
                setShowAttachmentOptions(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [attachmentRef]);


    const handleSend = (e: React.FormEvent) => {
        e.preventDefault();
        if (newMessage.trim() && conversation) {
            onSendMessage(conversation.id, newMessage.trim());
            setNewMessage('');
        }
    };
    
    if (!conversation) {
        return (
            <div className="hidden md:flex flex-grow flex-col items-center justify-center h-full bg-gray-50 dark:bg-slate-900 text-center transition-colors duration-300">
                 <svg xmlns="http://www.w3.org/2000/svg" className="h-24 w-24 mx-auto text-gray-300 dark:text-slate-700 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
                <h2 className="text-2xl font-bold text-gray-700 dark:text-slate-200">ابدأ محادثة</h2>
                <p className="text-gray-500 dark:text-slate-400 mt-2">اختر محادثة من القائمة لعرض الرسائل.</p>
            </div>
        );
    }
    
    const myLastSentMessageId = [...conversation.messages].reverse().find(m => m.sender === 'me')?.id;

    return (
        <div className="flex flex-col h-full relative bg-[#efeae2] dark:bg-slate-900 transition-colors duration-300">
            {/* Background Pattern Overlay (Light Mode Only) */}
            <div className="absolute inset-0 opacity-5 pointer-events-none dark:hidden" style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
            }}></div>

            {/* Header */}
            <div className="flex items-center px-4 py-3 border-b dark:border-slate-700 bg-white dark:bg-slate-800 shadow-sm z-10 flex-shrink-0 h-16 transition-colors duration-300">
                <button 
                    onClick={onBack} 
                    className="md:hidden text-gray-500 dark:text-slate-300 hover:text-gray-800 dark:hover:text-white ml-2 p-1 rounded-full hover:bg-gray-100 dark:hover:bg-slate-700"
                    aria-label="العودة إلى قائمة الرسائل"
                >
                    <BackArrowIcon />
                </button>
                <div className="flex items-center cursor-pointer hover:bg-gray-50 dark:hover:bg-slate-700 p-1 rounded-lg transition" onClick={() => onViewProfile(conversation.participantId, conversation.participantType)}>
                    <img src={conversation.avatarUrl} alt={conversation.name} className="h-10 w-10 rounded-full object-cover border border-gray-200 dark:border-slate-600"/>
                    <div className="mr-3">
                        <h2 className="text-base font-bold text-gray-900 dark:text-white leading-none">
                            {conversation.name}
                        </h2>
                        {conversation.onlineStatus === 'online' ? (
                            <p className="text-xs text-green-600 dark:text-green-400 font-semibold mt-1">نشط الآن</p>
                        ) : (
                            <p className="text-xs text-gray-500 dark:text-slate-400 mt-1">غير متصل</p>
                        )}
                    </div>
                </div>
            </div>

            {/* Messages Area */}
            <div className="flex-grow p-4 overflow-y-auto z-0 custom-scrollbar scroll-smooth">
                <div className="space-y-2 pb-2">
                    {conversation.messages.map(msg => {
                        const isReadReceiptVisible = msg.id === myLastSentMessageId && conversation.lastReadMessageId && msg.id <= conversation.lastReadMessageId;
                        const isMe = msg.sender === 'me';
                        return (
                            <div key={msg.id} className={`flex flex-col ${isMe ? 'items-end' : 'items-start'}`}>
                                <div 
                                    className={`max-w-[80%] lg:max-w-[70%] px-4 py-2 rounded-2xl shadow-sm relative text-base leading-relaxed
                                    ${isMe 
                                        ? 'bg-indigo-600 text-white rounded-br-none' 
                                        : 'bg-white dark:bg-slate-700 text-gray-800 dark:text-white rounded-bl-none border border-gray-100 dark:border-slate-600'}`}
                                >
                                    <p>{msg.text}</p>
                                    <div className={`text-[10px] mt-1 flex items-center justify-end ${isMe ? 'text-indigo-200' : 'text-gray-400 dark:text-slate-300'}`}>
                                        {msg.timestamp}
                                    </div>
                                </div>
                                {isReadReceiptVisible && (
                                    <div className="flex justify-end mt-1 pr-1 animate-fade-in">
                                         <img src={conversation.avatarUrl} alt="Read" className="h-3.5 w-3.5 rounded-full object-cover border border-white" title={`شوهدت`} />
                                    </div>
                                )}
                            </div>
                        )
                    })}
                    <div ref={messagesEndRef} />
                </div>
            </div>

            {/* Sticky Input Area */}
            <div className="p-3 bg-white dark:bg-slate-800 border-t dark:border-slate-700 flex-shrink-0 z-10 transition-colors duration-300">
                <form onSubmit={handleSend} className="flex items-end space-x-reverse space-x-2 max-w-4xl mx-auto">
                    <div className="relative pb-1" ref={attachmentRef}>
                        <button
                            type="button"
                            onClick={() => setShowAttachmentOptions(!showAttachmentOptions)}
                            className="p-2 text-gray-500 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 rounded-full hover:bg-gray-100 dark:hover:bg-slate-700 transition"
                            aria-label="إرفاق ملف"
                        >
                            <PlusIcon className="h-6 w-6" />
                        </button>
                        {showAttachmentOptions && (
                             <div className="absolute bottom-full right-0 mb-3 w-48 bg-white dark:bg-slate-700 rounded-xl shadow-xl border border-gray-100 dark:border-slate-600 z-20 py-2 overflow-hidden animate-fade-in-up">
                                <button type="button" onClick={() => {alert('إرسال صورة'); setShowAttachmentOptions(false);}} className="w-full text-right px-4 py-2.5 text-sm text-gray-700 dark:text-white hover:bg-gray-50 dark:hover:bg-slate-600 flex items-center transition-colors">
                                    <ImageIcon />
                                    <span>إرسال صورة</span>
                                </button>
                                <button type="button" onClick={() => {alert('إرسال مستند'); setShowAttachmentOptions(false);}} className="w-full text-right px-4 py-2.5 text-sm text-gray-700 dark:text-white hover:bg-gray-50 dark:hover:bg-slate-600 flex items-center transition-colors">
                                    <DocumentIcon />
                                    <span>إرسال مستند</span>
                                </button>
                             </div>
                        )}
                    </div>
                    <div className="flex-grow bg-gray-100 dark:bg-slate-700 rounded-2xl flex items-center px-4 py-2 border border-transparent focus-within:border-indigo-300 dark:focus-within:border-indigo-500 focus-within:bg-white dark:focus-within:bg-slate-900 transition-colors">
                        <textarea
                            value={newMessage}
                            onChange={(e) => setNewMessage(e.target.value)}
                            onKeyDown={(e) => {
                                if (e.key === 'Enter' && !e.shiftKey) {
                                    e.preventDefault();
                                    handleSend(e);
                                }
                            }}
                            placeholder="اكتب رسالتك هنا..."
                            className="w-full bg-transparent border-none focus:ring-0 text-base resize-none max-h-32 py-1 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-slate-400"
                            rows={1}
                            style={{minHeight: '24px'}}
                        />
                    </div>
                    <button
                        type="submit"
                        className="bg-indigo-600 text-white rounded-full p-3 hover:bg-indigo-700 transition duration-200 flex-shrink-0 shadow-md transform active:scale-95 disabled:bg-indigo-300 disabled:cursor-not-allowed disabled:shadow-none"
                        disabled={!newMessage.trim()}
                        aria-label="إرسال الرسالة"
                    >
                        <SendIcon />
                    </button>
                </form>
            </div>
             <style>{`
                .custom-scrollbar::-webkit-scrollbar {
                    width: 5px;
                }
                .custom-scrollbar::-webkit-scrollbar-track {
                    background: transparent;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb {
                    background-color: #cbd5e1;
                    border-radius: 20px;
                }
                .dark .custom-scrollbar::-webkit-scrollbar-thumb {
                    background-color: #475569;
                }
                @keyframes fadeInUp {
                    from { opacity: 0; transform: translateY(10px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                .animate-fade-in-up {
                    animation: fadeInUp 0.2s ease-out forwards;
                }
            `}</style>
        </div>
    );
};

export default ChatPanel;
