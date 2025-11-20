import React from 'react';
import { View, UserRole } from '../types';

interface HomePageProps {
  onSelectRole: (role: Exclude<UserRole, null>) => void;
}

const UserIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mb-4 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
    </svg>
);

const BuildingIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mb-4 text-amber-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0v-4m0 4h5m0 0v-4m0 4H5m9 0v-4m0 4h5m0-12h.01M12 12h.01M12 9h.01M9 12h.01M9 9h.01" />
    </svg>
);

const HomePage: React.FC<HomePageProps> = ({ onSelectRole }) => {
  return (
    <div className="flex flex-col items-center justify-center py-20 bg-gradient-to-b from-indigo-50 to-white min-h-[calc(100vh-140px)]">
      <div className="text-center mb-16 px-4 max-w-3xl">
        <h1 className="text-5xl font-extrabold text-gray-900 mb-6 leading-tight">
          مرحباً بك في <span className="text-indigo-600">أجي</span> <span className="text-amber-500">تخدم</span>
        </h1>
        <p className="text-xl text-gray-600 leading-relaxed">
          بوابتك الأولى والأكثر ذكاءً لفرص العمل والتوظيف في المغرب. نربط الكفاءات بأفضل الشركات.
        </p>
      </div>
      
      <div className="w-full max-w-5xl px-6 grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Card for Job Seekers */}
        <div 
            onClick={() => onSelectRole('jobSeeker')}
            className="group bg-white p-10 rounded-3xl shadow-md hover:shadow-2xl border border-gray-100 transform hover:-translate-y-2 transition-all duration-300 cursor-pointer flex flex-col items-center text-center relative overflow-hidden"
        >
            <div className="absolute top-0 left-0 w-full h-2 bg-indigo-500 transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></div>
            <div className="bg-indigo-50 p-4 rounded-full mb-6 group-hover:bg-indigo-100 transition-colors">
                 <UserIcon />
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-4 group-hover:text-indigo-700 transition-colors">باحث عن عمل؟</h2>
            <p className="text-gray-600 mb-8 flex-grow text-lg leading-relaxed">
                أنشئ ملفك الشخصي في دقائق، واحصل على توصيات ذكية لوظائف تناسب مهاراتك وطموحك.
            </p>
            <button
                className="w-full bg-indigo-600 text-white py-4 px-8 rounded-xl font-bold text-lg shadow-lg shadow-indigo-200 group-hover:bg-indigo-700 transition-all duration-300"
            >
                ابحث عن وظيفة الآن
            </button>
        </div>
        
        {/* Card for Employers */}
        <div 
            onClick={() => onSelectRole('employer')}
            className="group bg-white p-10 rounded-3xl shadow-md hover:shadow-2xl border border-gray-100 transform hover:-translate-y-2 transition-all duration-300 cursor-pointer flex flex-col items-center text-center relative overflow-hidden"
        >
             <div className="absolute top-0 left-0 w-full h-2 bg-amber-500 transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></div>
             <div className="bg-amber-50 p-4 rounded-full mb-6 group-hover:bg-amber-100 transition-colors">
                <BuildingIcon />
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-4 group-hover:text-amber-700 transition-colors">صاحب عمل؟</h2>
            <p className="text-gray-600 mb-8 flex-grow text-lg leading-relaxed">
                انشر إعلاناتك الوظيفية بكل سهولة، ووصل إلى آلاف المواهب المغربية المؤهلة لتنمية فريقك.
            </p>
            <button
                className="w-full bg-amber-500 text-white py-4 px-8 rounded-xl font-bold text-lg shadow-lg shadow-amber-200 group-hover:bg-amber-600 transition-all duration-300"
            >
                أضف وظيفة جديدة
            </button>
        </div>
      </div>
    </div>
  );
};

export default HomePage;