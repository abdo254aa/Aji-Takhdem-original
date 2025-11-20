import React from 'react';
import { View } from '../types';

interface HomePageProps {
  setCurrentView: (view: View) => void;
}

const UserIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mb-4 text-indigo-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
    </svg>
);

const BuildingIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mb-4 text-indigo-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0v-4m0 4h5m0 0v-4m0 4H5m9 0v-4m0 4h5m0-12h.01M12 12h.01M12 9h.01M9 12h.01M9 9h.01" />
    </svg>
);

const HomePage: React.FC<HomePageProps> = ({ setCurrentView }) => {
  return (
    <div className="flex flex-col items-center justify-center py-20 bg-gray-50 min-h-[calc(100vh-140px)]">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-800 mb-2">
          مرحباً بك في <span className="text-amber-500">أجي</span> تخدم
        </h1>
        <p className="text-lg text-gray-600">
          بوابتك الأولى لفرص العمل والتوظيف في المغرب.
        </p>
      </div>
      <div className="w-full max-w-4xl px-4 grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Card for Job Seekers */}
        <div className="bg-white p-8 rounded-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 ease-in-out flex flex-col items-center text-center">
            <UserIcon />
            <h2 className="text-2xl font-bold text-gray-800 mb-3">باحث عن عمل؟</h2>
            <p className="text-gray-600 mb-6 flex-grow">
                أنشئ ملفك الشخصي في خطوات بسيطة واحصل على توصيات وظائف مخصصة لك.
            </p>
            <button
                onClick={() => setCurrentView(View.Onboarding)}
                className="w-full bg-indigo-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-indigo-700 transition-colors duration-300"
            >
                ابدأ الآن
            </button>
        </div>
        
        {/* Card for Employers */}
        <div className="bg-white p-8 rounded-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 ease-in-out flex flex-col items-center text-center">
            <BuildingIcon />
            <h2 className="text-2xl font-bold text-gray-800 mb-3">صاحب عمل؟</h2>
            <p className="text-gray-600 mb-6 flex-grow">
                انشر وظائفك بكل سهولة وجذّب أفضل الكفاءات والمواهب في المغرب.
            </p>
            <button
                onClick={() => setCurrentView(View.PostJobForm)}
                className="w-full bg-gray-700 text-white py-3 px-6 rounded-lg font-semibold hover:bg-gray-800 transition-colors duration-300"
            >
                أضف وظيفة
            </button>
        </div>
      </div>
    </div>
  );
};

export default HomePage;