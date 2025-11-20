import React, { useState } from 'react';
import { View, UserRole } from '../types';
import SocialSignInButtons from './GoogleSignInButton';

interface SignUpProps {
    onSignUp: (credentials: { email: string, role: UserRole }) => void;
    onNavigate: (view: View) => void;
    userRole: UserRole;
    onSocialLogin: () => void;
}

const SignUp: React.FC<SignUpProps> = ({ onSignUp, onNavigate, userRole, onSocialLogin }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!userRole) {
            setError('حدث خطأ. يرجى تحديد دورك (باحث عن عمل أو صاحب عمل) أولاً.');
            return;
        }
        if (password !== confirmPassword) {
            setError('كلمتا المرور غير متطابقتين.');
            return;
        }
        if (password.length < 8) {
            setError('يجب أن تتكون كلمة المرور من 8 أحرف على الأقل.');
            return;
        }
        setError('');
        
        onSignUp({ email, role: userRole });
    };

    return (
        <div className="bg-gray-50 py-12">
            <div className="container mx-auto px-6 max-w-md">
                <div className="bg-white p-8 rounded-lg shadow-md">
                    <h2 className="text-3xl font-bold text-center text-gray-800 mb-2">إنشاء حساب جديد</h2>
                    <p className="text-center text-gray-500 mb-8">انضم إلينا وابدأ رحلتك المهنية اليوم.</p>
                    
                    <div className="mb-6">
                        <SocialSignInButtons onClick={onSocialLogin} />
                    </div>

                    <div className="relative my-6">
                        <div className="absolute inset-0 flex items-center" aria-hidden="true">
                            <div className="w-full border-t border-gray-300" />
                        </div>
                        <div className="relative flex justify-center text-sm">
                            <span className="px-2 bg-white text-gray-500">أو أنشئ حساباً بالبريد الإلكتروني</span>
                        </div>
                    </div>

                    {error && <p className="bg-red-100 text-red-700 p-3 rounded-md mb-6 text-center">{error}</p>}

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label htmlFor="email-signup" className="block text-base font-medium text-gray-700 mb-1">البريد الإلكتروني</label>
                            <input 
                                type="email" 
                                id="email-signup" 
                                value={email} 
                                onChange={e => setEmail(e.target.value)} 
                                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 text-base" 
                                required 
                            />
                        </div>
                        
                        <div>
                            <label htmlFor="password-signup" className="block text-base font-medium text-gray-700 mb-1">كلمة المرور</label>
                            <input 
                                type="password" 
                                id="password-signup" 
                                value={password} 
                                onChange={e => setPassword(e.target.value)} 
                                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 text-base" 
                                required 
                            />
                        </div>

                         <div>
                            <label htmlFor="confirm-password-signup" className="block text-base font-medium text-gray-700 mb-1">تأكيد كلمة المرور</label>
                            <input 
                                type="password" 
                                id="confirm-password-signup" 
                                value={confirmPassword} 
                                onChange={e => setConfirmPassword(e.target.value)} 
                                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 text-base" 
                                required 
                            />
                        </div>

                        <button type="submit" className="w-full bg-indigo-600 text-white p-3 rounded-lg font-semibold hover:bg-indigo-700 transition text-lg">
                            إنشاء حساب
                        </button>

                         <p className="text-center text-gray-600">
                            لديك حساب بالفعل؟{' '}
                            <button type="button" onClick={() => onNavigate(View.Login)} className="text-indigo-600 hover:underline font-semibold">
                                تسجيل الدخول
                            </button>
                        </p>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default SignUp;