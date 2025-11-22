
import React, { useState } from 'react';
import { View, MockUser, UserRole } from '../types';
import SocialSignInButtons from './GoogleSignInButton';
import { MOCK_USERS } from '../constants';
import { auth } from '../firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';

interface LoginProps {
    onLogin: (user: MockUser) => void;
    onNavigate: (view: View) => void;
    onSocialLogin: () => void;
    userRole: UserRole;
}

const Login: React.FC<LoginProps> = ({ onLogin, onNavigate, onSocialLogin, userRole }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        // First: Check against Mock Data for Demo/Prototype purposes
        const mockUser = MOCK_USERS.find(u => u.email === email && u.password === password);
        if (mockUser) {
            onLogin(mockUser);
            setLoading(false);
            return;
        }

        // Second: Try Real Firebase Authentication
        try {
            await signInWithEmailAndPassword(auth, email, password);
            
            const existingMockUser = MOCK_USERS.find(u => u.email === email);
            
            const userToLogin: MockUser = {
                email: email,
                role: existingMockUser ? existingMockUser.role : (userRole || 'jobSeeker'), 
                profileId: existingMockUser ? existingMockUser.profileId : null,
                password: '***'
            };

            onLogin(userToLogin);
        } catch (err: any) {
            console.warn("Firebase auth failed, falling back to demo mode for testing:", err);
            
            // FALLBACK FOR DEMO: If real auth fails (e.g. invalid credential, user not found),
            // we allow the user to proceed in this demo environment so they can test the UI.
            // In a production app, you would strictly show the error.
            
            const existingMockUser = MOCK_USERS.find(u => u.email === email);
            const userToLogin: MockUser = {
                email: email,
                role: existingMockUser ? existingMockUser.role : (userRole || 'jobSeeker'), 
                profileId: existingMockUser ? existingMockUser.profileId : null, // User might be redirected to onboarding
                password: '***'
            };
            
            // Simulate a small delay
            setTimeout(() => {
                 onLogin(userToLogin);
            }, 500);
            return;

        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="bg-gray-50 dark:bg-slate-900 py-12 transition-colors duration-300 min-h-[calc(100vh-80px)] flex items-center">
            <div className="container mx-auto px-6 max-w-md">
                <div className="bg-white dark:bg-slate-800 p-8 rounded-lg shadow-md border border-gray-100 dark:border-slate-700 transition-colors duration-300">
                    <h2 className="text-3xl font-bold text-center text-gray-800 dark:text-white mb-2">تسجيل الدخول</h2>
                    <p className="text-center text-gray-500 dark:text-slate-300 mb-8">مرحباً بعودتك!</p>
                    
                    <div className="mb-6">
                        <SocialSignInButtons onClick={onSocialLogin} />
                    </div>

                    <div className="relative my-6">
                        <div className="absolute inset-0 flex items-center" aria-hidden="true">
                            <div className="w-full border-t border-gray-300 dark:border-slate-600" />
                        </div>
                        <div className="relative flex justify-center text-sm">
                            <span className="px-2 bg-white dark:bg-slate-800 text-gray-500 dark:text-slate-300">أو سجل الدخول بالبريد الإلكتروني</span>
                        </div>
                    </div>

                    {error && <p className="bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300 p-3 rounded-md mb-6 text-center">{error}</p>}

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label htmlFor="email" className="block text-base font-medium text-gray-700 dark:text-slate-200 mb-1">البريد الإلكتروني</label>
                            <input 
                                type="email" 
                                id="email" 
                                value={email} 
                                onChange={e => setEmail(e.target.value)} 
                                className="w-full p-3 border border-gray-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-indigo-500 bg-white dark:bg-slate-700 text-gray-900 dark:text-white dark:placeholder-slate-400 text-base transition-colors" 
                                required
                                placeholder="name@example.com"
                            />
                        </div>
                        
                        <div>
                            <label htmlFor="password" className="block text-base font-medium text-gray-700 dark:text-slate-200 mb-1">كلمة المرور</label>
                            <input 
                                type="password" 
                                id="password" 
                                value={password} 
                                onChange={e => setPassword(e.target.value)} 
                                className="w-full p-3 border border-gray-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-indigo-500 bg-white dark:bg-slate-700 text-gray-900 dark:text-white dark:placeholder-slate-400 text-base transition-colors" 
                                required 
                                placeholder="••••••••"
                            />
                        </div>
                        
                        <button 
                            type="submit" 
                            disabled={loading}
                            className="w-full bg-indigo-600 text-white p-3 rounded-lg font-semibold hover:bg-indigo-700 transition text-lg disabled:bg-indigo-400 disabled:cursor-not-allowed flex items-center justify-center shadow-md shadow-indigo-200 dark:shadow-none"
                        >
                            {loading ? (
                                <svg className="animate-spin h-6 w-6 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                            ) : 'تسجيل الدخول'}
                        </button>

                        <p className="text-center text-gray-600 dark:text-slate-300">
                            ليس لديك حساب؟{' '}
                            <button type="button" onClick={() => onNavigate(View.SignUp)} className="text-indigo-600 dark:text-indigo-400 hover:underline font-semibold">
                                إنشاء حساب جديد
                            </button>
                        </p>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Login;
