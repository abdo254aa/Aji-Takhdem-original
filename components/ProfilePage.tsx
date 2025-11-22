
import React, { useRef } from 'react';
import type { UserProfile } from '../types';

const LocationIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-1 text-rose-500" viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
    </svg>
);

const EducationIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.436 60.436 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.905 59.905 0 0112 3.493a59.902 59.902 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0l-2.072-1.037a3.22 3.22 0 01-1.02-3.832c.381-1.002 1.282-1.745 2.457-1.745h16.208c1.176 0 2.076.743 2.457 1.745a3.22 3.22 0 01-1.02 3.832l-2.072 1.037m-15.482 0A49.98 49.98 0 0112 13.489a49.98 49.98 0 017.74-3.342M6.75 15a.75.75 0 100-1.5.75.75 0 000 1.5z" />
    </svg>
);

const ExperienceIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 14.15v4.075c0 1.313-.964 2.443-2.25 2.65-1.37.215-2.653-.33-3.418-1.41a4.5 4.5 0 00-6.164 0c-.765 1.08-2.048 1.625-3.418 1.41-1.286-.207-2.25-1.337-2.25-2.65V14.15m17.5 0l-2.5-2.5m0 0l-2.5 2.5m2.5-2.5v-2.5c0-.966-.784-1.75-1.75-1.75h-8.5c-.966 0-1.75.784-1.75 1.75v2.5m12.5 0l-2.5-2.5" />
    </svg>
);

const LanguageIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 5h12M9 3v2m0 14V5m0 0a2 2 0 11-4 0 2 2 0 014 0zm11 0a2 2 0 100 4m0-4a2 2 0 110 4m0 0v7.5a2.5 2.5 0 01-5 0V12a2.5 2.5 0 015 0z" />
    </svg>
);

const GlobeIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2h10a2 2 0 002-2v-1a2 2 0 012-2h1.945M7.75 4.093l.368.052a11.953 11.953 0 011.63 4.965m-2.13-1.61c.42-.234.87-.433 1.343-.603m2.636 1.137a11.953 11.953 0 011.63-4.965l.368-.052M12 21a9 9 0 100-18 9 9 0 000 18z" />
    </svg>
);

const EditIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
        <path d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z" />
        <path fillRule="evenodd" d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" clipRule="evenodd" />
    </svg>
);

const UploadIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM6.293 6.707a1 1 0 010-1.414l3-3a1 1 0 011.414 0l3 3a1 1 0 01-1.414 1.414L11 5.414V13a1 1 0 11-2 0V5.414L7.707 6.707a1 1 0 01-1.414 0z" clipRule="evenodd" />
    </svg>
);

const SparkleIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
    </svg>
);

const CameraIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
);

const ProfileDetailRow: React.FC<{
    icon: React.ReactNode;
    label: string;
    value: React.ReactNode;
    iconBgColor: string;
    iconTextColor: string;
}> = ({ icon, label, value, iconBgColor, iconTextColor }) => (
    <div className="flex items-start p-4 bg-gray-50/70 dark:bg-slate-700/50 rounded-lg border border-gray-200 dark:border-slate-600">
        <div className={`flex-shrink-0 h-12 w-12 flex items-center justify-center rounded-full ${iconBgColor} ${iconTextColor}`}>
            {icon}
        </div>
        <div className="mr-4 flex-1">
            <p className="text-sm font-medium text-gray-500 dark:text-slate-300">{label}</p>
            <div className="mt-1">{value}</div>
        </div>
    </div>
);


interface ProfilePageProps {
    userProfile: UserProfile | null;
    onUpdateProfile: (profile: UserProfile) => void;
}

const ProfilePage: React.FC<ProfilePageProps> = ({ userProfile, onUpdateProfile }) => {
    const fileInputRef = useRef<HTMLInputElement>(null);

    if (!userProfile) {
        return (
            <div className="flex flex-col items-center justify-center py-20 bg-gray-50 dark:bg-slate-900 min-h-[calc(100vh-140px)]">
                <h2 className="text-2xl font-bold text-gray-700 dark:text-slate-300">لم يتم العثور على الملف الشخصي.</h2>
                <p className="text-gray-500 dark:text-slate-400 mt-2">قد تحتاج إلى تسجيل الدخول أو إكمال عملية الإعداد أولاً.</p>
            </div>
        );
    }
    
    const handleProfilePictureUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file && userProfile) {
            const reader = new FileReader();
            reader.onloadend = () => {
                onUpdateProfile({
                    ...userProfile,
                    profilePicture: reader.result as string,
                });
            };
            reader.readAsDataURL(file);
        }
    };

    const { name, profilePicture, residentCity, education, experienceLevel, languages, cities, skills } = userProfile;
    const placeholderImageUrl = `https://picsum.photos/seed/${encodeURIComponent(name)}/128/128`;

    return (
        <div className="bg-gray-50 dark:bg-slate-900 py-12 transition-colors duration-300">
            <div className="container mx-auto px-6 max-w-4xl">
                <div className="bg-white dark:bg-slate-800 p-4 md:p-8 rounded-lg shadow-md border border-gray-100 dark:border-slate-700 transition-colors duration-300">
                    <div className="flex flex-col md:flex-row items-center md:items-start text-center md:text-right">
                        <div className="flex-shrink-0 mb-4 md:mb-0 md:ml-8 flex flex-col items-center">
                            <input
                                id="profile-picture-upload"
                                type="file"
                                ref={fileInputRef}
                                onChange={handleProfilePictureUpload}
                                className="hidden"
                                accept="image/png, image/jpeg"
                            />
                            <div className="h-24 w-24 md:h-32 md:w-32 rounded-full bg-gray-100 dark:bg-slate-700 flex items-center justify-center border-4 border-white dark:border-slate-600 shadow-md overflow-hidden" aria-label="الصورة الشخصية الحالية">
                                <img src={profilePicture || placeholderImageUrl} alt={name} className="h-full w-full object-cover" />
                            </div>
                            <button
                                onClick={() => fileInputRef.current?.click()}
                                className="mt-4 flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-indigo-700 dark:text-indigo-300 bg-indigo-100 dark:bg-indigo-900/30 hover:bg-indigo-200 dark:hover:bg-indigo-900/50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                            >
                                <span>{profilePicture ? 'تغيير الصورة' : 'إضافة صورة'}</span>
                                <CameraIcon className="h-5 w-5 ml-2 -mr-1" />
                            </button>
                        </div>

                        <div className="flex-grow flex flex-col md:flex-row md:justify-between w-full items-center md:items-start">
                            <div>
                                <h1 className="text-3xl md:text-4xl font-extrabold text-gray-800 dark:text-white">{name}</h1>
                                <div className="flex items-center justify-center md:justify-start text-lg text-gray-500 dark:text-slate-400 mt-2">
                                    <LocationIcon />
                                    <span>يقيم في <strong>{residentCity}</strong></span>
                                </div>
                            </div>
                            <div className="mt-4 md:mt-0 flex-shrink-0">
                                <button 
                                    onClick={() => alert('ميزة تعديل الملف الشخصي قيد التطوير!')}
                                    className="bg-indigo-100 dark:bg-indigo-900/40 text-indigo-700 dark:text-indigo-300 px-5 py-2.5 rounded-lg hover:bg-indigo-200 dark:hover:bg-indigo-900/60 transition duration-300 font-bold text-base flex items-center"
                                >
                                    <EditIcon />
                                    <span>تعديل</span>
                                </button>
                            </div>
                        </div>
                    </div>

                    <div className="mt-8 pt-8 border-t border-gray-200 dark:border-slate-700">
                        <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">ملخص الملف الشخصي</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                            <ProfileDetailRow 
                                icon={<EducationIcon />} 
                                label="المستوى التعليمي" 
                                value={<p className="text-base font-semibold text-gray-800 dark:text-white">{education}</p>} 
                                iconBgColor="bg-sky-100 dark:bg-sky-900/30" 
                                iconTextColor="text-sky-600 dark:text-sky-400" 
                            />
                            <ProfileDetailRow 
                                icon={<ExperienceIcon />} 
                                label="مستوى الخبرة" 
                                value={<p className="text-base font-semibold text-gray-800 dark:text-white">{experienceLevel}</p>} 
                                iconBgColor="bg-teal-100 dark:bg-teal-900/30" 
                                iconTextColor="text-teal-600 dark:text-teal-400" 
                            />
                            <ProfileDetailRow 
                                icon={<LanguageIcon />} 
                                label="اللغات" 
                                value={<p className="text-base font-semibold text-gray-800 dark:text-white">{languages.length > 0 ? languages.join('، ') : 'لم تحدد'}</p>} 
                                iconBgColor="bg-purple-100 dark:bg-purple-900/30" 
                                iconTextColor="text-purple-600 dark:text-purple-400" 
                            />
                            <ProfileDetailRow 
                                icon={<GlobeIcon />} 
                                label="مدن العمل المفضلة" 
                                value={
                                    cities && cities.length > 0 ? (
                                        <div className="flex flex-wrap gap-2 justify-center md:justify-start">
                                            {cities.map(city => (
                                                <span key={city} className="bg-rose-100 dark:bg-rose-900/30 text-rose-800 dark:text-rose-300 text-sm font-medium px-2.5 py-1 rounded-full">
                                                    {city}
                                                </span>
                                            ))}
                                        </div>
                                    ) : (
                                        <p className="text-base font-semibold text-gray-800 dark:text-white">كل المدن</p>
                                    )
                                } 
                                iconBgColor="bg-rose-100 dark:bg-rose-900/30" 
                                iconTextColor="text-rose-600 dark:text-rose-400" 
                            />
                        </div>
                    </div>

                    <div className="mt-8 pt-8 border-t border-gray-200 dark:border-slate-700">
                        <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">المهارات</h2>
                        {skills && skills.length > 0 ? (
                            <div className="flex flex-wrap gap-2 justify-center md:justify-start">
                                {skills.map((skill, index) => (
                                    <span key={index} className="bg-indigo-100 dark:bg-indigo-900/40 text-indigo-800 dark:text-indigo-200 text-base font-medium ml-2 mb-2 px-4 py-1.5 rounded-full">
                                        {skill}
                                    </span>
                                ))}
                            </div>
                        ) : (
                            <div className="text-center py-8 px-4 bg-gray-50 dark:bg-slate-700/30 rounded-lg">
                                <p className="text-gray-600 dark:text-slate-400">لم تتم إضافة أي مهارات بعد.</p>
                            </div>
                        )}
                    </div>

                    <div className="mt-8 pt-8 border-t border-gray-200 dark:border-slate-700">
                        <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">السيرة الذاتية</h2>
                        <div className="bg-gray-50/70 dark:bg-slate-700/50 p-6 rounded-lg border border-gray-200 dark:border-slate-600 text-center">
                            <p className="text-gray-600 dark:text-slate-300 mb-6 max-w-xl mx-auto">
                                لديك خياران: يمكنك تحميل سيرتك الذاتية الجاهزة، أو دع الذكاء الاصطناعي يساعدك في إنشاء واحدة احترافية.
                            </p>
                            <div className="flex flex-col sm:flex-row justify-center gap-4">
                                <button 
                                    onClick={() => alert('ميزة تحميل السيرة الذاتية قيد التطوير!')}
                                    className="bg-white dark:bg-slate-800 border border-indigo-300 dark:border-indigo-700 text-indigo-700 dark:text-indigo-300 px-6 py-3 rounded-lg font-semibold hover:bg-indigo-50 dark:hover:bg-indigo-900/30 transition duration-300 flex items-center justify-center text-lg shadow-sm"
                                >
                                    <UploadIcon />
                                    <span>تحميل السيرة الذاتية</span>
                                </button>
                                <button
                                    onClick={() => alert('ميزة إنشاء السيرة الذاتية بالذكاء الاصطناعي قيد التطوير!')}
                                    className="bg-indigo-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-indigo-700 transition duration-300 flex items-center justify-center text-lg shadow-sm hover:shadow-md"
                                >
                                    <SparkleIcon />
                                    <span>إنشاء بالذكاء الاصطناعي</span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProfilePage;
