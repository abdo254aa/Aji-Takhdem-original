

import React, { useState } from 'react';
import type { ConcoursArticle, UserRole } from '../types';

interface ConcoursPageProps {
    concours: ConcoursArticle[];
    userRole: UserRole;
    onAddConcours: (article: Omit<ConcoursArticle, 'id' | 'publishDate'>) => void;
}

// Comment Interface
interface Comment {
    id: number;
    user: string;
    text: string;
    date: string;
}

// Mock Images for variety in the sidebar
const SIDEBAR_IMAGES = [
    "https://images.unsplash.com/photo-1497215728101-856f4ea42174?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80", // Office
    "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80", // Meeting
    "https://images.unsplash.com/photo-1568992687947-868a62a9f521?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80", // Desk
    "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80", // Building
    "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80", // Papers
    "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80", // Handshake
    "https://images.unsplash.com/photo-1526304640152-d4619684e484?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80", // Calculator/Money
    "https://images.unsplash.com/photo-1577962917302-cd874c4e31d2?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80", // Abstract
];

const getRandomImage = (id: number) => SIDEBAR_IMAGES[id % SIDEBAR_IMAGES.length];

const PlusIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
    </svg>
);

const CalendarIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
    </svg>
);

const BuildingLibraryIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0v-4m0 4h5m0 0v-4m0 4H5m9 0v-4m0 4h5m0-12h.01M12 12h.01M12 9h.01M9 12h.01M9 9h.01" />
    </svg>
);

const SearchIcon: React.FC<{className?: string}> = ({className}) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className || "h-5 w-5"} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
    </svg>
);

const BackArrowIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
    </svg>
);

const EmailIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
    </svg>
);

const UserIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
);

const SendIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
        <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
    </svg>
);

const ConcoursPage: React.FC<ConcoursPageProps> = ({ concours, userRole, onAddConcours }) => {
    const [selectedArticle, setSelectedArticle] = useState<ConcoursArticle | null>(null);
    const [isFormOpen, setIsFormOpen] = useState(false);
    
    // Form State
    const [title, setTitle] = useState('');
    const [department, setDepartment] = useState('');
    const [content, setContent] = useState('');
    const [imageUrl, setImageUrl] = useState('');
    
    // Search States
    const [searchTerm, setSearchTerm] = useState('');

    // Comments State
    const [comments, setComments] = useState<Comment[]>([
        { id: 1, user: "محمد أمين", text: "شكراً جزيلاً على هذه المعلومات القيمة. هل هناك سن محدد للترشيح؟", date: "منذ ساعة" },
        { id: 2, user: "سارة العلمي", text: "بالتوفيق للجميع ان شاء الله.", date: "منذ 3 ساعات" }
    ]);
    const [newComment, setNewComment] = useState('');

    const isAdmin = userRole === 'admin';

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onAddConcours({
            title,
            department,
            deadline: '', // Removed deadline from input
            content,
            image: imageUrl || 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/18/Emblem_of_Morocco.svg/800px-Emblem_of_Morocco.svg.png'
        });
        setIsFormOpen(false);
        setTitle('');
        setDepartment('');
        setContent('');
        setImageUrl('');
    };

    const handleArticleClick = (article: ConcoursArticle) => {
        setSelectedArticle(article);
        window.scrollTo(0, 0);
    };

    const handleBack = () => {
        setSelectedArticle(null);
        window.scrollTo(0, 0);
    };

    const handleAddComment = (e: React.FormEvent) => {
        e.preventDefault();
        if(!newComment.trim()) return;
        
        const comment: Comment = {
            id: Date.now(),
            user: "زائر", // In a real app, use logged-in user name
            text: newComment,
            date: "الآن"
        };
        
        setComments([...comments, comment]);
        setNewComment('');
    };

    // Filter Logic for Main List
    const filteredConcours = concours.filter(article => 
        searchTerm === '' || 
        article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        article.department.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Latest Updates (for Sidebar Main View)
    const latestUpdates = [...concours].sort((a, b) => new Date(b.publishDate).getTime() - new Date(a.publishDate).getTime()).slice(0, 5);

    // ---- DETAIL VIEW ----
    if (selectedArticle) {
        // Logic for Sidebar Lists in Detail View

        // 1. Latest Updates: Top 5 Recent (excluding current)
        const latestUpdatesList = concours
            .filter(c => c.id !== selectedArticle.id)
            .sort((a, b) => new Date(b.publishDate).getTime() - new Date(a.publishDate).getTime())
            .slice(0, 5);

        // 2. Featured Offers: Get next 6 items to ensure the count is exactly 6 as requested
        const featuredOffersList = concours
            .filter(c => c.id !== selectedArticle.id)
            .slice(5, 11); 

        return (
            <div className="bg-slate-50 dark:bg-slate-900 min-h-screen py-8 transition-colors duration-300">
                <div className="container mx-auto px-4 md:px-6 lg:px-8 max-w-6xl">
                    
                    {/* Header: Back Button & Title Card */}
                    <div className="mb-8">
                        <button 
                            onClick={handleBack} 
                            className="flex items-center text-indigo-600 dark:text-indigo-400 font-bold mb-3 hover:underline transition-all text-sm"
                        >
                            <BackArrowIcon />
                            <span className="mr-2">العودة للقائمة</span>
                        </button>
                        
                        <div className="relative w-full h-48 md:h-64 rounded-xl overflow-hidden shadow-md">
                            <img 
                                src={selectedArticle.image || 'https://via.placeholder.com/1200x400'} 
                                alt={selectedArticle.title} 
                                className="w-full h-full object-cover"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent flex flex-col justify-end p-6 md:p-8">
                                <span className="bg-indigo-600 text-white text-xs font-bold px-3 py-1 rounded-full w-fit mb-2 shadow-sm">
                                    {selectedArticle.department}
                                </span>
                                <h1 className="text-xl md:text-2xl lg:text-3xl font-bold text-white leading-tight mb-2">
                                    {selectedArticle.title}
                                </h1>
                                <div className="flex items-center text-slate-300 text-xs md:text-sm gap-4">
                                    <span className="flex items-center"><CalendarIcon /> نشر: {selectedArticle.publishDate}</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Main Layout Grid */}
                    <div className="flex flex-col lg:flex-row gap-8">
                        
                        {/* Sidebar (Right Side in RTL) */}
                        <div className="w-full lg:w-1/3 space-y-6 order-1">
                            
                            {/* 1. Latest Updates */}
                            <div className="bg-white dark:bg-slate-800 p-5 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700">
                                <h3 className="font-bold text-slate-800 dark:text-white mb-4 pb-2 border-b border-slate-100 dark:border-slate-700 flex items-center gap-2 text-base">
                                    <span className="w-1 h-4 bg-indigo-500 rounded-full"></span>
                                    آخر المستجدات
                                </h3>
                                <div className="space-y-4">
                                    {latestUpdatesList.map((job, idx) => (
                                        <div 
                                            key={job.id} 
                                            onClick={() => handleArticleClick(job)}
                                            className="group cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-700/50 p-2 rounded-lg transition-colors flex items-start gap-3"
                                        >
                                            {/* Mock Image thumbnail */}
                                            <div className="w-20 h-16 flex-shrink-0 bg-gray-100 rounded-md overflow-hidden relative shadow-sm border border-gray-100 dark:border-slate-600">
                                                <img 
                                                    src={getRandomImage(idx)} 
                                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" 
                                                    alt="" 
                                                />
                                            </div>
                                            
                                            <div className="flex-1 min-w-0">
                                                <h4 className="text-sm font-semibold text-slate-800 dark:text-white leading-snug group-hover:text-indigo-600 transition-colors line-clamp-2">
                                                    {job.title}
                                                </h4>
                                                <span className="text-[10px] text-slate-400 mt-1 block">{job.publishDate}</span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* 2. Newsletter */}
                            <div className="bg-gradient-to-br from-slate-800 to-indigo-900 p-5 rounded-xl text-white shadow-lg relative overflow-hidden">
                                <div className="relative z-10">
                                    <div className="flex items-center gap-2 mb-2">
                                        <EmailIcon />
                                        <h3 className="font-bold text-sm">النشرة البريدية</h3>
                                    </div>
                                    <p className="text-indigo-100 text-xs mb-3 leading-relaxed">توصل بآخر المباريات وعروض العمل الحكومية فور نشرها.</p>
                                    <div className="flex flex-col gap-2">
                                        <input 
                                            type="email" 
                                            placeholder="البريد الإلكتروني" 
                                            className="w-full p-2.5 rounded-lg text-slate-900 text-sm focus:ring-2 focus:ring-indigo-400 outline-none border-none"
                                        />
                                        <button className="w-full bg-emerald-500 hover:bg-emerald-600 text-white font-bold py-2 rounded-lg transition shadow-md text-sm">
                                            اشترك الآن
                                        </button>
                                    </div>
                                </div>
                            </div>

                            {/* 3. Featured Offers */}
                            <div className="bg-white dark:bg-slate-800 p-5 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700">
                                <h3 className="font-bold text-slate-800 dark:text-white mb-4 pb-2 border-b border-slate-100 dark:border-slate-700 flex items-center gap-2 text-base">
                                    <span className="w-1 h-4 bg-amber-500 rounded-full"></span>
                                    عروض مميزة
                                </h3>
                                <div className="space-y-4">
                                    {featuredOffersList.map((job, idx) => (
                                         <div 
                                            key={job.id} 
                                            onClick={() => handleArticleClick(job)}
                                            className="group cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-700/50 p-2 rounded-lg transition-colors flex items-start gap-3"
                                        >
                                            {/* Mock Image thumbnail */}
                                            <div className="w-20 h-16 flex-shrink-0 bg-gray-100 rounded-md overflow-hidden relative shadow-sm border border-gray-100 dark:border-slate-600">
                                                <img 
                                                    src={getRandomImage(idx + 5)} 
                                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" 
                                                    alt="" 
                                                />
                                            </div>
                                            
                                            <div className="flex-1 min-w-0">
                                                <h4 className="text-sm font-semibold text-slate-800 dark:text-white leading-snug group-hover:text-indigo-600 transition-colors line-clamp-2">
                                                    {job.title}
                                                </h4>
                                                <span className="text-[10px] text-slate-400 mt-1 block">{job.publishDate}</span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                        </div>

                        {/* Main Content (Left Side in RTL) */}
                        <div className="flex-1 space-y-6 order-2">
                            {/* Article Text */}
                            <div className="bg-white dark:bg-slate-800 p-6 md:p-8 rounded-xl shadow-sm border border-slate-100 dark:border-slate-700 text-slate-800 dark:text-slate-200">
                                <div className="flex justify-between items-start mb-6 pb-4 border-b border-slate-100 dark:border-slate-700">
                                    <div>
                                        <h3 className="text-xl md:text-2xl font-bold text-slate-900 dark:text-white mb-1">
                                            تفاصيل المباراة
                                        </h3>
                                        <span className="text-sm text-slate-500 dark:text-slate-400">جميع التفاصيل المتعلقة بهذا الإعلان</span>
                                    </div>
                                    <button 
                                        className="hidden sm:block text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-900/30 px-4 py-2 rounded-lg text-sm font-bold hover:bg-indigo-100 dark:hover:bg-indigo-900/50 transition"
                                        onClick={() => window.print()}
                                    >
                                        طباعة الإعلان
                                    </button>
                                </div>
                                
                                {/* Content */}
                                <div className="prose dark:prose-invert max-w-none leading-loose text-base whitespace-pre-line text-slate-700 dark:text-slate-300">
                                    {selectedArticle.content}
                                </div>
                                
                                <div className="mt-8 p-6 bg-slate-50 dark:bg-slate-700/30 rounded-lg border border-slate-200 dark:border-slate-600">
                                    <h4 className="font-bold text-lg mb-3 text-slate-900 dark:text-white flex items-center gap-2">
                                        <BuildingLibraryIcon />
                                        الوثائق المطلوبة للترشيح:
                                    </h4>
                                    <ul className="list-disc list-inside space-y-2 text-base text-slate-700 dark:text-slate-300">
                                        <li>طلب خطي يحمل اسم وعنوان وهاتف المترشح.</li>
                                        <li>نسخة مصادق عليها من بطاقة التعريف الوطنية.</li>
                                        <li>نسخة مصادق عليها من الدبلوم أو الشهادة المطلوبة.</li>
                                        <li>سيرة ذاتية (CV) حديثة ومفصلة.</li>
                                        <li>ظرفان متنبران يحملان اسم وعنوان المترشح.</li>
                                    </ul>
                                </div>
                            </div>

                            {/* Comments Section */}
                            <div className="bg-white dark:bg-slate-800 p-6 md:p-8 rounded-xl shadow-sm border border-slate-100 dark:border-slate-700">
                                <h3 className="text-xl font-bold text-slate-800 dark:text-white mb-6 flex items-center gap-3">
                                    التعليقات <span className="bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 text-sm px-3 py-0.5 rounded-full">{comments.length}</span>
                                </h3>
                                
                                <div className="space-y-6 mb-8">
                                    {comments.map(comment => (
                                        <div key={comment.id} className="flex gap-4">
                                            <div className="flex-shrink-0 w-10 h-10 bg-indigo-50 dark:bg-indigo-900/50 rounded-full flex items-center justify-center text-indigo-500">
                                                <UserIcon />
                                            </div>
                                            <div className="flex-grow bg-slate-50 dark:bg-slate-700/30 p-4 rounded-xl rounded-tr-none border border-slate-100 dark:border-slate-700/50">
                                                <div className="flex items-center justify-between mb-1">
                                                    <span className="font-bold text-slate-900 dark:text-white text-sm">{comment.user}</span>
                                                    <span className="text-[10px] text-slate-400">{comment.date}</span>
                                                </div>
                                                <p className="text-slate-700 dark:text-slate-200 text-sm leading-relaxed">{comment.text}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                <form onSubmit={handleAddComment} className="relative mt-6">
                                    <div className="flex gap-3">
                                        <div className="flex-shrink-0 w-10 h-10 bg-slate-200 dark:bg-slate-700 rounded-full flex items-center justify-center">
                                            <UserIcon />
                                        </div>
                                        <div className="flex-grow relative">
                                            <textarea
                                                value={newComment}
                                                onChange={(e) => setNewComment(e.target.value)}
                                                placeholder="أضف تعليقاً..."
                                                className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl p-3 min-h-[50px] focus:ring-2 focus:ring-indigo-500 outline-none transition-all resize-none text-slate-800 dark:text-white text-sm pr-12"
                                            ></textarea>
                                            <button 
                                                type="submit"
                                                disabled={!newComment.trim()}
                                                className="absolute bottom-3 left-3 text-indigo-600 hover:text-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed p-1.5 hover:bg-indigo-50 dark:hover:bg-indigo-900/30 rounded-full transition-colors"
                                            >
                                                <SendIcon />
                                            </button>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    // ---- LIST VIEW (DEFAULT) ----
    return (
        <div className="bg-slate-50 dark:bg-slate-900 min-h-screen py-10 transition-colors duration-300">
            <div className="container mx-auto px-4 md:px-6 lg:px-8 max-w-6xl">
                {/* Header Section */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
                    <div>
                        <h1 className="text-3xl md:text-4xl font-extrabold text-slate-800 dark:text-white tracking-tight">مباريات الدولة</h1>
                        <p className="text-base md:text-lg text-slate-600 dark:text-slate-300 mt-2 font-medium">بوابة الوظائف الحكومية والمباريات العمومية بالمغرب</p>
                    </div>
                    {isAdmin && (
                        <button
                            onClick={() => setIsFormOpen(!isFormOpen)}
                            className="bg-emerald-600 hover:bg-emerald-700 text-white px-5 py-2.5 rounded-xl font-bold shadow-md hover:shadow-lg transform hover:-translate-y-0.5 transition-all flex items-center gap-2 border border-emerald-500 text-sm"
                        >
                            <PlusIcon />
                            <span>نشر مباراة</span>
                        </button>
                    )}
                </div>

                <div className="flex flex-col lg:flex-row gap-8">
                    {/* Main Content (Articles List) */}
                    <div className="w-full lg:w-3/4">
                        {/* Search Bar */}
                        <div className="relative mb-6">
                             <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none text-slate-400">
                                <SearchIcon />
                            </div>
                            <input 
                                type="text" 
                                placeholder="ابحث عن مباراة، وزارة، أو قطاع..." 
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full h-12 pr-12 pl-4 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-800 dark:text-white font-medium focus:ring-2 focus:ring-indigo-100 dark:focus:ring-indigo-900/30 focus:border-indigo-500 outline-none transition-all shadow-sm"
                            />
                        </div>

                        {/* Admin Form */}
                        {isFormOpen && isAdmin && (
                             <div className="bg-white dark:bg-slate-800 p-8 rounded-2xl shadow-lg border border-emerald-100 dark:border-slate-700 mb-8 animate-fade-in ring-1 ring-emerald-50 dark:ring-0">
                                <h3 className="text-xl font-bold text-slate-800 dark:text-white mb-6 border-b pb-4">نشر مباراة جديدة</h3>
                                <form onSubmit={handleSubmit} className="space-y-5">
                                    <div>
                                        <label className="block text-base font-semibold text-slate-700 dark:text-slate-200 mb-2">عنوان المباراة</label>
                                        <input type="text" required value={title} onChange={e => setTitle(e.target.value)} className="w-full p-3 border border-slate-200 rounded-xl focus:border-emerald-500 outline-none dark:bg-slate-700 dark:border-slate-600 dark:text-white font-medium transition-colors" />
                                    </div>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                        <div>
                                            <label className="block text-base font-semibold text-slate-700 dark:text-slate-200 mb-2">الجهة / الوزارة</label>
                                            <input type="text" required value={department} onChange={e => setDepartment(e.target.value)} className="w-full p-3 border border-slate-200 rounded-xl focus:border-emerald-500 outline-none dark:bg-slate-700 dark:border-slate-600 dark:text-white font-medium transition-colors" />
                                        </div>
                                    </div>
                                    <div>
                                        <label className="block text-base font-semibold text-slate-700 dark:text-slate-200 mb-2">رابط الصورة (اختياري)</label>
                                        <input type="url" value={imageUrl} onChange={e => setImageUrl(e.target.value)} className="w-full p-3 border border-slate-200 rounded-xl focus:border-emerald-500 outline-none dark:bg-slate-700 dark:border-slate-600 dark:text-white font-medium transition-colors" placeholder="https://..." />
                                    </div>
                                    <div>
                                        <label className="block text-base font-semibold text-slate-700 dark:text-slate-200 mb-2">التفاصيل والشروط</label>
                                        <textarea required rows={5} value={content} onChange={e => setContent(e.target.value)} className="w-full p-3 border border-slate-200 rounded-xl focus:border-emerald-500 outline-none dark:bg-slate-700 dark:border-slate-600 dark:text-white font-medium transition-colors"></textarea>
                                    </div>
                                    <div className="flex justify-end gap-3 pt-4">
                                        <button type="button" onClick={() => setIsFormOpen(false)} className="px-6 py-2.5 text-slate-600 dark:text-slate-300 font-bold hover:bg-slate-100 dark:hover:bg-slate-700 rounded-xl transition-colors">إلغاء</button>
                                        <button type="submit" className="px-8 py-2.5 bg-emerald-600 text-white font-bold rounded-xl hover:bg-emerald-700 shadow-md hover:shadow-lg transition-all">نشر المباراة</button>
                                    </div>
                                </form>
                            </div>
                        )}

                        <div className="grid gap-4">
                            {filteredConcours.length > 0 ? (
                                filteredConcours.map(article => (
                                    <div 
                                        key={article.id} 
                                        onClick={() => handleArticleClick(article)}
                                        className="group bg-white dark:bg-slate-800 rounded-xl p-5 shadow-sm hover:shadow-md border border-slate-200 dark:border-slate-700 transition-all duration-300 cursor-pointer"
                                    >
                                        <div className="flex flex-col md:flex-row gap-5">
                                            {/* Image Section - Sized down */}
                                            <div className="w-full md:w-28 h-28 flex-shrink-0 bg-slate-50 dark:bg-slate-700/50 rounded-lg flex items-center justify-center p-2 border border-slate-100 dark:border-slate-600 overflow-hidden">
                                                <img src={article.image || 'https://via.placeholder.com/150'} alt={article.department} className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-500" />
                                            </div>
                                            
                                            {/* Content Section */}
                                            <div className="flex-grow flex flex-col">
                                                <div className="flex flex-wrap justify-between items-start gap-2 mb-1">
                                                    <div className="inline-flex items-center px-2.5 py-0.5 rounded-full bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-200 text-[10px] font-bold border border-slate-200 dark:border-slate-600">
                                                        <BuildingLibraryIcon />
                                                        <span className="mr-2">{article.department}</span>
                                                    </div>
                                                    <span className="text-[10px] text-slate-400 font-medium">{article.publishDate}</span>
                                                </div>
                                                
                                                <h2 className="text-lg font-bold text-slate-800 dark:text-white mb-2 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors leading-snug">
                                                    {article.title}
                                                </h2>
                                                
                                                <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed line-clamp-2 mb-3">
                                                    {article.content}
                                                </p>
                                                
                                                <div className="mt-auto flex items-center justify-end">
                                                    <span className="text-indigo-600 dark:text-indigo-400 text-xs font-bold group-hover:underline flex items-center gap-1">
                                                        عرض التفاصيل 
                                                        <svg className="w-3 h-3 transform rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path></svg>
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <div className="text-center py-20 bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700">
                                    <h3 className="text-xl font-bold text-slate-800 dark:text-white">لا توجد نتائج</h3>
                                    <p className="text-slate-500 dark:text-slate-400 mt-2">جرب تغيير كلمات البحث.</p>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Sidebar */}
                    <div className="w-full lg:w-1/4 space-y-6">
                        {/* 1. Latest Updates */}
                        <div className="bg-white dark:bg-slate-800 p-5 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700">
                            <h3 className="font-bold text-slate-800 dark:text-white mb-4 pb-2 border-b border-slate-100 dark:border-slate-700 text-base flex items-center gap-2">
                                <span className="w-1 h-4 bg-rose-500 rounded-full"></span>
                                آخر المستجدات
                            </h3>
                            <ul className="space-y-3">
                                {latestUpdates.map((update, idx) => (
                                    <li 
                                        key={update.id} 
                                        className="group cursor-pointer flex items-start gap-3" 
                                        onClick={() => handleArticleClick(update)}
                                    >
                                        <div className="w-16 h-12 flex-shrink-0 bg-gray-100 rounded-md overflow-hidden border border-gray-100 dark:border-slate-600">
                                            <img src={getRandomImage(idx)} className="w-full h-full object-cover" alt="" />
                                        </div>
                                        <div className="flex-1">
                                            <h4 className="text-xs font-bold text-slate-700 dark:text-slate-200 group-hover:text-indigo-600 transition-colors leading-snug line-clamp-2">
                                                {update.title}
                                            </h4>
                                            <span className="text-[10px] text-slate-400 mt-0.5 block">
                                                {update.publishDate}
                                            </span>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </div>

                         {/* 2. Categories */}
                        <div className="bg-white dark:bg-slate-800 p-5 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700">
                            <h3 className="font-bold text-slate-800 dark:text-white mb-4 pb-2 border-b border-slate-100 dark:border-slate-700 text-base">تصنيفات شائعة</h3>
                            <ul className="space-y-2">
                                {[
                                    { name: "قطاع التعليم", color: "bg-blue-500" },
                                    { name: "الأمن والشرطة", color: "bg-green-500" },
                                    { name: "وزارة الصحة", color: "bg-red-500" },
                                    { name: "الجماعات الترابية", color: "bg-amber-500" },
                                ].map((cat, idx) => (
                                    <li key={idx}>
                                        <a href="#" className="group flex items-center justify-between p-2 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors">
                                            <span className="text-slate-600 dark:text-slate-300 font-medium group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors text-sm">{cat.name}</span>
                                            <span className={`w-2 h-2 ${cat.color} rounded-full`}></span>
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ConcoursPage;
