import React from 'react';
import type { MockGoogleAccount } from '../types';

interface GoogleAccountSelectorModalProps {
    isOpen: boolean;
    onClose: () => void;
    accounts: MockGoogleAccount[];
    onSelectAccount: (account: MockGoogleAccount) => void;
}

const GoogleIcon: React.FC = () => (
    <svg viewBox="0 0 48 48" className="w-6 h-6">
        <path fill="#FFC107" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12 s5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24 s8.955,20,20,20s20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"></path>
        <path fill="#FF3D00" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657 C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"></path>
        <path fill="#4CAF50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36 c-5.222,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"></path>
        <path fill="#1976D2" d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.574 c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"></path>
    </svg>
);

const GoogleAccountSelectorModal: React.FC<GoogleAccountSelectorModalProps> = ({ isOpen, onClose, accounts, onSelectAccount }) => {
    if (!isOpen) return null;

    return (
        <div 
            className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-50 p-4"
            onClick={onClose}
            aria-modal="true"
            role="dialog"
        >
            <div 
                className="bg-white rounded-lg shadow-xl w-full max-w-sm"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="p-6 text-center border-b">
                    <GoogleIcon />
                    <h2 className="text-xl font-bold text-gray-800 mt-2">اختر حسابًا</h2>
                    <p className="text-gray-500 text-sm">للمتابعة إلى أجي تخدم</p>
                </div>

                <div className="py-2">
                    <ul>
                        {accounts.map(account => (
                            <li key={account.email}>
                                <button 
                                    onClick={() => onSelectAccount(account)}
                                    className="w-full flex items-center text-right p-4 hover:bg-gray-50 transition-colors"
                                >
                                    <img 
                                        src={account.avatarUrl} 
                                        alt={account.name} 
                                        className="w-10 h-10 rounded-full" 
                                    />
                                    <div className="mr-3">
                                        <p className="font-semibold text-gray-800">{account.name}</p>
                                        <p className="text-sm text-gray-500">{account.email}</p>
                                    </div>
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>

                <div className="p-4 border-t text-center">
                     <button onClick={onClose} className="text-indigo-600 font-semibold hover:underline text-sm">
                        إغلاق
                    </button>
                </div>
            </div>
        </div>
    );
};

export default GoogleAccountSelectorModal;
