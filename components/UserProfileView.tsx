import React from 'react';
import type { UserProfile } from '../types';

const BackArrowIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
    </svg>
);

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

const ProfileDetailRow: React.FC<{
    icon: React.ReactNode;
    label: string;
    value: React.ReactNode;
    iconBgColor: string;
    iconTextColor: string;
}> = ({ icon, label, value, iconBgColor, iconTextColor }) => (
    <div className="flex items-start p-4 bg-gray-50/70 rounded-lg border border-gray-200">
        <div className={`flex-shrink-0 h-12 w-12 flex items-center justify-center rounded-full ${iconBgColor} ${iconTextColor}`}>
            {icon}
        </div>
        <div className="mr-4 flex-1">
            <p className="text-sm font-medium text-gray-500">{label}</p>
            <div className="mt-1">{value}</div>
        </div>
    </div>
);


interface UserProfileViewProps {
    profile: UserProfile | null;
    onBack: () => void;
}

const UserProfileView: React.FC<UserProfileViewProps> = ({ profile, onBack }) => {
    if (!profile) {
        return (
            <div className="flex flex-col items-center justify-center py-20 bg-gray-50 min-h-[calc(100vh-140px)]">
                <h2 className="text-2xl font-bold text-gray-700">لم يتم العثور على الملف الشخصي.</h2>
            </div>
        );
    }
    
    const { name, profilePicture, residentCity, education, experienceLevel, languages, cities, skills } = profile;
    const placeholderImageUrl = `https://picsum.photos/seed/${encodeURIComponent(name)}/128/128`;

    return (
        <div className="bg-gray-50 py-12">
            <div className="container mx-auto px-6 max-w-4xl">
                 <button onClick={onBack} className="flex items-center text-indigo-600 font-semibold mb-6 hover:underline">
                    <BackArrowIcon />
                    <span className="mr-2">العودة</span>
                </button>
                <div className="bg-white p-4 md:p-8 rounded-lg shadow-md">
                    <div className="flex flex-col md:flex-row items-center md:items-start text-center md:text-right">
                        <div className="flex-shrink-0 mb-4 md:mb-0 md:ml-8">
                            <div className="h-24 w-24 md:h-32 md:w-32 rounded-full bg-gray-100 flex items-center justify-center border-4 border-white shadow-md overflow-hidden">
                                <img src={profilePicture || placeholderImageUrl} alt={name} className="h-full w-full object-cover" />
                            </div>
                        </div>

                        <div className="flex-grow">
                            <h1 className="text-3xl md:text-4xl font-extrabold text-gray-800">{name}</h1>
                            <div className="flex items-center justify-center md:justify-start text-lg text-gray-500 mt-2">
                                <LocationIcon />
                                <span>يقيم في <strong>{residentCity}</strong></span>
                            </div>
                        </div>
                    </div>

                    <div className="mt-8 pt-8 border-t">
                        <h2 className="text-2xl font-bold text-gray-800 mb-6">ملخص الملف الشخصي</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                            <ProfileDetailRow 
                                icon={<EducationIcon />} 
                                label="المستوى التعليمي" 
                                value={<p className="text-base font-semibold text-gray-800">{education}</p>} 
                                iconBgColor="bg-sky-100" 
                                iconTextColor="text-sky-600" 
                            />
                            <ProfileDetailRow 
                                icon={<ExperienceIcon />} 
                                label="مستوى الخبرة" 
                                value={<p className="text-base font-semibold text-gray-800">{experienceLevel}</p>} 
                                iconBgColor="bg-teal-100" 
                                iconTextColor="text-teal-600" 
                            />
                            <ProfileDetailRow 
                                icon={<LanguageIcon />} 
                                label="اللغات" 
                                value={<p className="text-base font-semibold text-gray-800">{languages.length > 0 ? languages.join('، ') : 'لم تحدد'}</p>} 
                                iconBgColor="bg-purple-100" 
                                iconTextColor="text-purple-600" 
                            />
                            <ProfileDetailRow 
                                icon={<GlobeIcon />} 
                                label="مدن العمل المفضلة" 
                                value={
                                    cities && cities.length > 0 ? (
                                        <div className="flex flex-wrap gap-2 justify-center md:justify-start">
                                            {cities.map(city => (
                                                <span key={city} className="bg-rose-100 text-rose-800 text-sm font-medium px-2.5 py-1 rounded-full">
                                                    {city}
                                                </span>
                                            ))}
                                        </div>
                                    ) : (
                                        <p className="text-base font-semibold text-gray-800">كل المدن</p>
                                    )
                                } 
                                iconBgColor="bg-rose-100" 
                                iconTextColor="text-rose-600" 
                            />
                        </div>
                    </div>

                    <div className="mt-8 pt-8 border-t">
                        <h2 className="text-2xl font-bold text-gray-800 mb-6">المهارات</h2>
                        {skills && skills.length > 0 ? (
                            <div className="flex flex-wrap gap-2 justify-center md:justify-start">
                                {skills.map((skill, index) => (
                                    <span key={index} className="bg-indigo-100 text-indigo-800 text-base font-medium ml-2 mb-2 px-4 py-1.5 rounded-full">
                                        {skill}
                                    </span>
                                ))}
                            </div>
                        ) : (
                            <div className="text-center py-8 px-4 bg-gray-50 rounded-lg">
                                <p className="text-gray-600">لم يقم المستخدم بإضافة أي مهارات بعد.</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserProfileView;
