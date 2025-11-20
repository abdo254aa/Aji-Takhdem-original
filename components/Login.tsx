import React, { useState } from 'react';
import { View, MockUser, UserRole } from '../types';
import SocialSignInButtons from './GoogleSignInButton';
import { MOCK_USERS } from '../constants';


interface LoginProps {
    onLogin: (user: MockUser) => void;
    onNavigate: (view: View) => void;
    onSocialLogin: () => void;
}

const Login: React.FC<LoginProps> = ({ onLogin, onNavigate, onSocialLogin }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const user = MOCK_USERS.find(u => u.email === email && u.password === password);
        
        if (user) {
            setError('');
            onLogin(user);
        } else {
            setError('البريد الإلكتروني أو كلمة المرور غير صحيحة.');
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
                                placeholder="google-seeker@test.com"
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
                                placeholder="password123"
                            />
                        </div>
                        
                        <p className="text-sm text-center text-gray-500">
                           حسابات تجريبية: <br />
                           <span className="font-mono">google-seeker@test.com</span> <br/>
                           <span className="font-mono">google-company@test.com</span> <br/>
                           (كلمة المرور: <span className="font-mono">password123</span>)
                        </p>

                        <button type="submit" className="w-full bg-indigo-600 text-white p-3 rounded-lg font-semibold hover:bg-indigo-700 transition text-lg">
                            تسجيل الدخول
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