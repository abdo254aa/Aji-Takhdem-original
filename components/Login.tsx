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

        try {
            await signInWithEmailAndPassword(auth, email, password);
            
            // For prototype compatibility, try to find if this user exists in mock data to attach profileId
            const existingMockUser = MOCK_USERS.find(u => u.email === email);
            
            const userToLogin: MockUser = {
                email: email,
                role: existingMockUser ? existingMockUser.role : (userRole || 'jobSeeker'), // Fallback to selected role or jobSeeker
                profileId: existingMockUser ? existingMockUser.profileId : null,
                password: '***' // Password hidden
            };

            onLogin(userToLogin);
        } catch (err: any) {
            console.error(err);
            if (err.code === 'auth/invalid-credential' || err.code === 'auth/user-not-found' || err.code === 'auth/wrong-password') {
                setError('البريد الإلكتروني أو كلمة المرور غير صحيحة.');
            } else {
                setError('حدث خطأ أثناء تسجيل الدخول.');
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="bg-gray-50 py-12">
            <div className="container mx-auto px-6 max-w-md">
                <div className="bg-white p-8 rounded-lg shadow-md">
                    <h2 className="text-3xl font-bold text-center text-gray-800 mb-2">تسجيل الدخول</h2>
                    <p className="text-center text-gray-500 mb-8">مرحباً بعودتك!</p>
                    
                    <div className="mb-6">
                        <SocialSignInButtons onClick={onSocialLogin} />
                    </div>

                    <div className="relative my-6">
                        <div className="absolute inset-0 flex items-center" aria-hidden="true">
                            <div className="w-full border-t border-gray-300" />
                        </div>
                        <div className="relative flex justify-center text-sm">
                            <span className="px-2 bg-white text-gray-500">أو سجل الدخول بالبريد الإلكتروني</span>
                        </div>
                    </div>

                    {error && <p className="bg-red-100 text-red-700 p-3 rounded-md mb-6 text-center">{error}</p>}

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label htmlFor="email" className="block text-base font-medium text-gray-700 mb-1">البريد الإلكتروني</label>
                            <input 
                                type="email" 
                                id="email" 
                                value={email} 
                                onChange={e => setEmail(e.target.value)} 
                                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 text-base" 
                                required
                                placeholder="name@example.com"
                            />
                        </div>
                        
                        <div>
                            <label htmlFor="password" className="block text-base font-medium text-gray-700 mb-1">كلمة المرور</label>
                            <input 
                                type="password" 
                                id="password" 
                                value={password} 
                                onChange={e => setPassword(e.target.value)} 
                                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 text-base" 
                                required 
                                placeholder="••••••••"
                            />
                        </div>
                        
                        <button 
                            type="submit" 
                            disabled={loading}
                            className="w-full bg-indigo-600 text-white p-3 rounded-lg font-semibold hover:bg-indigo-700 transition text-lg disabled:bg-indigo-400 disabled:cursor-not-allowed flex items-center justify-center"
                        >
                            {loading ? (
                                <svg className="animate-spin h-6 w-6 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                            ) : 'تسجيل الدخول'}
                        </button>

                        <p className="text-center text-gray-600">
                            ليس لديك حساب؟{' '}
                            <button type="button" onClick={() => onNavigate(View.SignUp)} className="text-indigo-600 hover:underline font-semibold">
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
