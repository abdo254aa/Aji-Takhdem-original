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
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
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
            <div className="hidden md:flex flex-grow flex-col items-center justify-center h-full bg-gray-50 text-center">
                 <svg xmlns="http://www.w3.org/2000/svg" className="h-20 w-20 mx-auto text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
                <h2 className="text-xl font-bold text-gray-700 mt-4">ابدأ محادثة</h2>
                <p className="text-gray-500 mt-1">اختر محادثة من القائمة لعرض الرسائل.</p>
            </div>
        );
    }
    
    const myLastSentMessageId = [...conversation.messages].reverse().find(m => m.sender === 'me')?.id;

    return (
        <>
            {/* Header */}
            <div className="flex items-center p-4 border-b bg-white flex-shrink-0">
                <button 
                    onClick={onBack} 
                    className="md:hidden text-gray-500 hover:text-gray-800 ml-3"
                    aria-label="العودة إلى قائمة الرسائل"
                >
                    <BackArrowIcon />
                </button>
                <img src={conversation.avatarUrl} alt={conversation.name} className="h-11 w-11 rounded-full object-cover"/>
                <div className="mr-3">
                    <h2 
                        onClick={() => onViewProfile(conversation.participantId, conversation.participantType)}
                        className="text-lg font-bold text-gray-800 cursor-pointer hover:underline"
                    >
                        {conversation.name}
                    </h2>
                    {conversation.onlineStatus === 'online' ? (
                        <p className="text-xs text-green-600 font-semibold">نشط الآن</p>
                    ) : (
                        <p className="text-xs text-gray-500">غير متصل</p>
                    )}
                </div>
            </div>

            {/* Messages */}
            <div className="flex-grow p-4 sm:p-6 overflow-y-auto bg-gray-50">
                <div className="space-y-1">
                    {conversation.messages.map(msg => {
                        const isReadReceiptVisible = msg.id === myLastSentMessageId && conversation.lastReadMessageId && msg.id <= conversation.lastReadMessageId;
                        return (
                            <div key={msg.id} className="flex flex-col">
                                <div className={`flex items-end ${msg.sender === 'me' ? 'justify-end' : 'justify-start'}`}>
                                    <div className={`max-w-xs lg:max-w-md px-4 py-2 rounded-xl shadow-sm ${msg.sender === 'me' ? 'bg-indigo-600 text-white' : 'bg-white text-gray-800 border'}`}>
                                        <p className="text-base">{msg.text}</p>
                                        <p className={`text-xs mt-1 ${msg.sender === 'me' ? 'text-indigo-200' : 'text-gray-500'} text-left`}>{msg.timestamp}</p>
                                    </div>
                                </div>
                                {isReadReceiptVisible && (
                                    <div className="flex justify-end mt-1 pr-2">
                                         <img src={conversation.avatarUrl} alt="Read by" className="h-4 w-4 rounded-full object-cover" title={`شوهدت من طرف ${conversation.name}`} />
                                    </div>
                                )}
                            </div>
                        )
                    })}
                    <div ref={messagesEndRef} />
                </div>
            </div>

            {/* Input */}
            <div className="p-4 bg-white border-t flex-shrink-0">
                <form onSubmit={handleSend} className="flex items-center space-x-reverse space-x-2">
                    <div className="relative" ref={attachmentRef}>
                        <button
                            type="button"
                            onClick={() => setShowAttachmentOptions(!showAttachmentOptions)}
                            className="p-3 text-gray-500 hover:text-indigo-600 rounded-full hover:bg-gray-100 transition"
                            aria-label="إرفاق ملف"
                        >
                            <PlusIcon className="h-6 w-6" />
                        </button>
                        {showAttachmentOptions && (
                             <div className="absolute bottom-full right-0 mb-2 w-48 bg-white rounded-md shadow-lg border z-10 py-1">
                                <button type="button" onClick={() => {alert('إرسال صورة'); setShowAttachmentOptions(false);}} className="w-full text-right px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center transition-colors">
                                    <ImageIcon />
                                    <span>إرسال صورة</span>
                                </button>
                                <button type="button" onClick={() => {alert('إرسال مستند'); setShowAttachmentOptions(false);}} className="w-full text-right px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center transition-colors">
                                    <DocumentIcon />
                                    <span>إرسال مستند</span>
                                </button>
                             </div>
                        )}
                    </div>
                    <input
                        type="text"
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        placeholder="اكتب رسالتك هنا..."
                        className="w-full p-3 border border-gray-300 rounded-full focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-base"
                        autoComplete="off"
                    />
                    <button
                        type="submit"
                        className="bg-indigo-600 text-white rounded-full p-3 hover:bg-indigo-700 transition duration-200 flex-shrink-0 disabled:bg-indigo-300 disabled:cursor-not-allowed"
                        disabled={!newMessage.trim()}
                        aria-label="إرسال الرسالة"
                    >
                        <SendIcon />
                    </button>
                </form>
            </div>
        </>
    );
};

export default ChatPanel;