import React from 'react';
import { View, UserRole } from '../types';
import SocialSignInButtons from './GoogleSignInButton';

interface AuthChoiceProps {
  onNavigate: (view: View) => void;
  userRole: UserRole;
  onSelectRole: (role: 'jobSeeker' | 'employer') => void;
  onSocialLogin: (role: UserRole) => void;
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

const AuthChoice: React.FC<AuthChoiceProps> = ({ onNavigate, userRole, onSelectRole, onSocialLogin }) => {
    
    if (!userRole) {
        return (
            <div className="flex flex-col items-center justify-center py-20 bg-gray-50 min-h-[calc(100vh-140px)]">
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-bold text-gray-800 mb-2">من أنت؟</h1>
                    <p className="text-lg text-gray-600">اختر دورك للمتابعة.</p>
                </div>
                <div className="w-full max-w-4xl px-4 grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div onClick={() => onSelectRole('jobSeeker')} className="bg-white p-8 rounded-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 ease-in-out flex flex-col items-center text-center cursor-pointer">
                        <UserIcon />
                        <h2 className="text-2xl font-bold text-gray-800">أنا باحث عن عمل</h2>
                    </div>
                    <div onClick={() => onSelectRole('employer')} className="bg-white p-8 rounded-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 ease-in-out flex flex-col items-center text-center cursor-pointer">
                        <BuildingIcon />
                        <h2 className="text-2xl font-bold text-gray-800">أنا صاحب عمل</h2>
                    </div>
                </div>
            </div>
        );
    }

    const isJobSeeker = userRole === 'jobSeeker';
    const title = isJobSeeker ? 'حساب الباحث عن عمل' : 'حساب صاحب العمل';
    const subtitle = isJobSeeker 
        ? 'أنشئ حساباً أو سجل دخولك لتكتشف آلاف الفرص.'
        : 'أنشئ حساباً أو سجل دخولك لنشر الوظائف والوصول للكفاءات.';

    return (
        <div className="bg-gray-50 py-12">
            <div className="container mx-auto px-6 max-w-md">
                <div className="bg-white p-8 rounded-lg shadow-md text-center">
                    <h2 className="text-3xl font-bold text-gray-800 mb-2">{title}</h2>
                    <p className="text-gray-500 mb-8">{subtitle}</p>
                    
                    <div className="space-y-4">
                       <SocialSignInButtons onClick={() => onSocialLogin(userRole)} />
                    </div>

                    <div className="relative my-6">
                        <div className="absolute inset-0 flex items-center" aria-hidden="true">
                            <div className="w-full border-t border-gray-300" />
                        </div>
                        <div className="relative flex justify-center text-sm">
                            <span className="px-2 bg-white text-gray-500">أو</span>
                        </div>
                    </div>

                    <div className="space-y-4">
                         <button
                            onClick={() => onNavigate(View.SignUp)}
                            className="w-full bg-indigo-600 text-white p-3 rounded-lg font-semibold hover:bg-indigo-700 transition text-lg"
                        >
                            المتابعة باستخدام البريد الإلكتروني
                        </button>
                        
                        <p className="text-center text-gray-600">
                            لديك حساب بالفعل؟{' '}
                            <button type="button" onClick={() => onNavigate(View.Login)} className="text-indigo-600 hover:underline font-semibold">
                                تسجيل الدخول
                            </button>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AuthChoice;