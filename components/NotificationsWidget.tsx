
import React, { useState, useRef, useEffect } from 'react';

interface Notification {
    id: number;
    title: string;
    message: string;
    time: string;
    read: boolean;
    type: 'job' | 'system' | 'promo';
}

const MOCK_NOTIFICATIONS: Notification[] = [
    { id: 1, title: "وظيفة جديدة", message: "تم نشر وظيفة 'مطور React' تطابق مهاراتك.", time: "منذ 15 دقيقة", read: false, type: 'job' },
    { id: 2, title: "تحديث الملف الشخصي", message: "نوصي بإكمال نبذة عنك لزيادة فرصك.", time: "منذ ساعتين", read: false, type: 'system' },
    { id: 3, title: "شوهد ملفك", message: "قامت شركة 'تكنو ماروك' بمشاهدة ملفك الشخصي.", time: "أمس", read: true, type: 'system' },
];

const BellIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
    </svg>
);

const CheckIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
    </svg>
);

const NotificationsWidget: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [notifications, setNotifications] = useState<Notification[]>(MOCK_NOTIFICATIONS);
    const panelRef = useRef<HTMLDivElement>(null);

    const unreadCount = notifications.filter(n => !n.read).length;

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (panelRef.current && !panelRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [panelRef]);

    const markAsRead = (id: number) => {
        setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
    };

    const markAllAsRead = () => {
        setNotifications(prev => prev.map(n => ({ ...n, read: true })));
    };

    return (
        <div className="fixed bottom-6 right-6 z-40" ref={panelRef}>
            {/* Floating Button */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="bg-amber-500 hover:bg-amber-600 text-white w-14 h-14 rounded-full shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex items-center justify-center relative focus:outline-none focus:ring-4 focus:ring-amber-200 dark:focus:ring-amber-900"
                aria-label="الإشعارات"
            >
                <BellIcon />
                {unreadCount > 0 && (
                    <span className="absolute top-0 right-0 h-4 w-4 bg-red-500 border-2 border-white dark:border-slate-900 rounded-full animate-pulse"></span>
                )}
            </button>

            {/* Notifications Panel */}
            <div 
                className={`absolute bottom-full right-0 mb-4 w-80 sm:w-96 bg-white dark:bg-slate-800 rounded-2xl shadow-2xl border border-gray-100 dark:border-slate-700 overflow-hidden transition-all duration-300 origin-bottom-right transform ${isOpen ? 'opacity-100 scale-100 translate-y-0' : 'opacity-0 scale-95 translate-y-4 pointer-events-none'}`}
            >
                <div className="p-4 border-b border-gray-100 dark:border-slate-700 flex justify-between items-center bg-gray-50 dark:bg-slate-800/50">
                    <h3 className="font-bold text-gray-800 dark:text-white">الإشعارات</h3>
                    {unreadCount > 0 && (
                        <button 
                            onClick={markAllAsRead}
                            className="text-xs text-indigo-600 dark:text-indigo-400 hover:underline font-medium"
                        >
                            تحديد الكل كمقروء
                        </button>
                    )}
                </div>
                
                <div className="max-h-[350px] overflow-y-auto custom-scrollbar">
                    {notifications.length > 0 ? (
                        <ul className="divide-y divide-gray-100 dark:divide-slate-700">
                            {notifications.map(notification => (
                                <li 
                                    key={notification.id} 
                                    onClick={() => markAsRead(notification.id)}
                                    className={`p-4 hover:bg-gray-50 dark:hover:bg-slate-700/50 transition-colors cursor-pointer relative ${!notification.read ? 'bg-amber-50/50 dark:bg-amber-900/10' : ''}`}
                                >
                                    <div className="flex items-start gap-3">
                                        <div className={`mt-1 w-2 h-2 rounded-full flex-shrink-0 ${!notification.read ? 'bg-amber-500' : 'bg-transparent'}`}></div>
                                        <div className="flex-1">
                                            <p className={`text-sm font-bold mb-1 ${!notification.read ? 'text-gray-900 dark:text-white' : 'text-gray-600 dark:text-slate-400'}`}>
                                                {notification.title}
                                            </p>
                                            <p className="text-xs text-gray-500 dark:text-slate-400 mb-1 leading-relaxed">
                                                {notification.message}
                                            </p>
                                            <span className="text-[10px] text-gray-400 dark:text-slate-500 font-medium">
                                                {notification.time}
                                            </span>
                                        </div>
                                        {notification.read && <span className="text-green-500"><CheckIcon /></span>}
                                    </div>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <div className="p-8 text-center text-gray-500 dark:text-slate-400">
                            <p>لا توجد إشعارات جديدة</p>
                        </div>
                    )}
                </div>
                
                <div className="p-3 bg-gray-50 dark:bg-slate-800/50 border-t border-gray-100 dark:border-slate-700 text-center">
                    <button className="text-xs font-bold text-gray-600 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition">
                        عرض كل الإشعارات
                    </button>
                </div>
            </div>
        </div>
    );
};

export default NotificationsWidget;
