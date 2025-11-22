
import React from 'react';
import { View } from '../types';

interface FooterProps {
  onNavigate: (view: View) => void;
}

const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="bg-slate-900 text-slate-400 mt-auto border-t border-slate-800">
      <div className="container mx-auto px-6 py-8 flex flex-col items-center">
        <div className="flex flex-wrap justify-center gap-8 mb-4">
            <button onClick={() => onNavigate(View.About)} className="hover:text-white transition-colors duration-200 font-medium text-base">
                من نحن
            </button>
            <button onClick={() => onNavigate(View.Services)} className="hover:text-white transition-colors duration-200 font-medium text-base">
                الخدمات
            </button>
            <button onClick={() => onNavigate(View.Contact)} className="hover:text-white transition-colors duration-200 font-medium text-base">
                اتصل بنا
            </button>
            <button onClick={() => onNavigate(View.PrivacyPolicy)} className="hover:text-white transition-colors duration-200 font-medium text-base">
                سياسة الخصوصية
            </button>
        </div>
        <p className="text-sm text-slate-600">&copy; {currentYear} جميع الحقوق محفوظة.</p>
      </div>
    </footer>
  );
};

export default Footer;
