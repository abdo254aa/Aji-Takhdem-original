import React, { useState } from 'react';
import { View, UserRole } from '../types';

interface HeaderProps {
  currentView: View;
  onNavigate: (view: View) => void;
  userRole: UserRole;
  isAuthenticated: boolean;
  hasJobSeekerProfile: boolean;
  isProfileComplete: boolean;
  unreadMessagesCount: number;
  onLogout: () => void;
}

const NavLink: React.FC<{
  view: View;
  currentView: View;
  onNavigate: (view: View) => void;
  children: React.ReactNode;
  isSpecial?: boolean;
}> = ({ view, currentView, onNavigate, children, isSpecial = false }) => {
  const isActive = view === currentView;
  const baseClasses = 'py-2 px-4 rounded-full transition-all duration-200 text-base font-bold';
  
  let activeClasses = 'text-white bg-slate-800';
  let inactiveClasses = 'text-slate-300 hover:text-white hover:bg-slate-800';

  if (isSpecial) {
    activeClasses = 'text-white bg-slate-800';
    inactiveClasses = 'text-slate-300 hover:text-white hover:bg-slate-800';
  }

  return (
    <button
      onClick={() => onNavigate(view)}
      className={`${baseClasses} ${isActive ? activeClasses : inactiveClasses}`}
    >
      {children}
    </button>
  );
};

const MobileNavLink: React.FC<{
  view: View;
  currentView: View;
  onNavigate: () => void;
  children: React.ReactNode;
}> = ({ view, currentView, onNavigate, children }) => {
  const isActive = view === currentView;
  const baseClasses = 'block text-right w-full py-3 px-4 rounded-xl text-lg transition-colors duration-200 font-bold';
  const activeClasses = 'text-white bg-slate-800';
  const inactiveClasses = 'text-slate-300 hover:text-white hover:bg-slate-800';

  return (
    <button
      onClick={onNavigate}
      className={`${baseClasses} ${isActive ? activeClasses : inactiveClasses}`}
    >
      {children}
    </button>
  );
};


const PlusIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
    </svg>
);

const UserCircleIcon: React.FC<{ className?: string }> = ({ className = "h-6 w-6" }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
);

const LogoutIcon: React.FC<{ className?: string }> = ({ className = "h-6 w-6" }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
    </svg>
);

const HomeIcon: React.FC<{ className?: string }> = ({ className = "h-5 w-5" }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 20 20" fill="currentColor">
        <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
    </svg>
);

const BriefcaseIcon: React.FC<{ className?: string }> = ({ className = "h-5 w-5" }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M10 2a2 2 0 00-2 2v1H6a2 2 0 00-2 2v8a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2V4a2 2 0 00-2-2zm-1 2v1h2V4a1 1 0 00-2 0z" clipRule="evenodd" />
    </svg>
);

const MessageIcon: React.FC<{ className?: string }> = ({ className = "h-5 w-5" }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
    </svg>
);

const MenuIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
    </svg>
);
const CloseIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
    </svg>
);


const Header: React.FC<HeaderProps> = ({ currentView, onNavigate, userRole, isAuthenticated, hasJobSeekerProfile, isProfileComplete, unreadMessagesCount, onLogout }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  const showPostJobButton = isAuthenticated && userRole === 'employer' && ![View.PostJobForm, View.CompanyProfileSetup].includes(currentView);
  
  const handleMobileNav = (view: View) => {
    onNavigate(view);
    setIsMobileMenuOpen(false);
  };

  const handleMobileLogout = () => {
    onLogout();
    setIsMobileMenuOpen(false);
  }

  return (
    <header className="bg-slate-900 shadow-sm sticky top-0 z-40 border-b border-slate-800">
      <nav className="container mx-auto px-4 py-3 flex justify-between items-center">
        <div 
            className="text-2xl sm:text-3xl font-extrabold cursor-pointer flex items-center gap-1"
            onClick={() => onNavigate(isAuthenticated && isProfileComplete ? View.JobBoard : View.Home)}
        >
          <span className="text-indigo-400">أجي</span>
          <span className="text-amber-400">تخدم</span>
        </div>
        
        {/* Desktop Nav */}
        <div className="hidden md:flex items-center space-x-reverse space-x-1">
            {!isProfileComplete && (
                <NavLink view={View.Home} currentView={currentView} onNavigate={onNavigate}>
                    الرئيسية
                </NavLink>
            )}
            {isAuthenticated && isProfileComplete && (
                <NavLink view={View.JobBoard} currentView={currentView} onNavigate={onNavigate}>
                    الوظائف
                </NavLink>
            )}
            <NavLink view={View.Services} currentView={currentView} onNavigate={onNavigate}>الخدمات</NavLink>
            {isAuthenticated && isProfileComplete && (
                <NavLink view={View.Messages} currentView={currentView} onNavigate={onNavigate} isSpecial={true}>
                    <span className="flex items-center gap-2 relative">
                        <MessageIcon />
                        <span>الرسائل</span>
                        {unreadMessagesCount > 0 && (
                            <span className="absolute -top-1.5 -right-2.5 bg-rose-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center border-2 border-white font-bold shadow-sm">
                                {unreadMessagesCount}
                            </span>
                        )}
                    </span>
                </NavLink>
            )}
        </div>
        
        {/* Desktop Action Buttons */}
        <div className="hidden md:flex items-center space-x-reverse space-x-3">
            {isAuthenticated ? (
                <>
                    {showPostJobButton && (
                        <button 
                            onClick={() => onNavigate(View.PostJobForm)}
                            className="bg-amber-500 text-white px-5 py-2.5 rounded-full hover:bg-amber-600 transition duration-300 flex items-center gap-2 font-bold text-base shadow-md shadow-amber-900/20"
                            aria-label="أضف وظيفة"
                        >
                            <PlusIcon />
                            <span>أضف وظيفة</span>
                        </button>
                    )}
                    {userRole === 'jobSeeker' && hasJobSeekerProfile && (
                        <button
                            onClick={() => onNavigate(View.Profile)}
                            className="bg-slate-800 text-indigo-400 px-5 py-2.5 rounded-full hover:bg-slate-700 transition duration-300 flex items-center gap-2 font-bold text-base"
                             aria-label="ملفي الشخصي"
                        >
                            <UserCircleIcon />
                            <span>ملفي الشخصي</span>
                        </button>
                    )}
                     <button 
                        onClick={onLogout}
                        className="text-slate-400 hover:text-rose-500 transition duration-300 font-bold text-base px-3 py-2 flex items-center gap-2"
                        title="تسجيل الخروج"
                    >
                        <LogoutIcon />
                        <span>خروج</span>
                    </button>
                </>
            ) : (
                <>
                    <button 
                        onClick={() => onNavigate(View.AuthChoice)}
                        className="text-slate-300 hover:text-white transition duration-300 font-bold text-base px-4 py-2"
                    >
                        تسجيل الدخول
                    </button>
                    <button 
                        onClick={() => onNavigate(View.AuthChoice)}
                        className="bg-indigo-600 text-white px-6 py-2.5 rounded-full hover:bg-indigo-700 transition duration-300 font-bold text-base shadow-md shadow-indigo-900/30"
                    >
                        حساب جديد
                    </button>
                </>
            )}
        </div>
        
        {/* Mobile Icons */}
        <div className="md:hidden flex items-center gap-x-2">
            {isAuthenticated && isProfileComplete && (
                <>
                    <button
                        onClick={() => onNavigate(View.JobBoard)}
                        className="text-slate-300 hover:text-white p-2 rounded-md"
                        aria-label="الرئيسية"
                    >
                        <HomeIcon className="h-7 w-7" />
                    </button>
                    <button
                        onClick={() => onNavigate(View.Messages)}
                        className="text-slate-300 hover:text-white p-2 rounded-md relative"
                        aria-label={`الرسائل، ${unreadMessagesCount} رسالة غير مقروءة`}
                    >
                        <MessageIcon className="h-7 w-7" />
                        {unreadMessagesCount > 0 && (
                            <span className="absolute -top-1 -right-1.5 bg-rose-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center border-2 border-slate-900 font-bold">
                                {unreadMessagesCount}
                            </span>
                        )}
                    </button>
                    <button
                        onClick={() => onNavigate(View.Profile)}
                        className="text-slate-300 hover:text-white p-2 rounded-md"
                        aria-label="ملفي الشخصي"
                    >
                        <UserCircleIcon className="h-7 w-7" />
                    </button>
                </>
            )}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-slate-300 hover:text-white p-2 rounded-md"
              aria-controls="mobile-menu"
              aria-expanded={isMobileMenuOpen}
            >
              <span className="sr-only">Open main menu</span>
              {isMobileMenuOpen ? <CloseIcon /> : <MenuIcon />}
            </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-slate-900 border-t border-slate-800 shadow-lg absolute w-full left-0 top-full" id="mobile-menu">
            <div className="px-4 pt-4 pb-6 space-y-2">
                {!isAuthenticated && (
                    <MobileNavLink view={View.Home} currentView={currentView} onNavigate={() => handleMobileNav(View.Home)}>
                        <span className="flex items-center justify-end gap-2">
                            <span>الرئيسية</span>
                            <HomeIcon />
                        </span>
                    </MobileNavLink>
                )}
                {isAuthenticated && isProfileComplete && (
                     <MobileNavLink view={View.JobBoard} currentView={currentView} onNavigate={() => handleMobileNav(View.JobBoard)}>
                        <span className="flex items-center justify-end gap-2">
                            <span>الوظائف</span>
                            <BriefcaseIcon />
                        </span>
                    </MobileNavLink>
                )}
                <MobileNavLink view={View.Services} currentView={currentView} onNavigate={() => handleMobileNav(View.Services)}>الخدمات</MobileNavLink>
                
                <div className="!my-4 border-t border-slate-800"></div>

                <div className="space-y-3">
                    {isAuthenticated ? (
                        <>
                            {showPostJobButton && (
                                <button 
                                    onClick={() => handleMobileNav(View.PostJobForm)}
                                    className="w-full bg-amber-500 text-white px-4 py-3 rounded-xl hover:bg-amber-600 transition duration-300 flex items-center justify-center gap-2 font-bold text-base shadow-sm"
                                >
                                    <PlusIcon />
                                    <span>أضف وظيفة</span>
                                </button>
                            )}
                            {userRole === 'jobSeeker' && hasJobSeekerProfile && (
                                <button
                                    onClick={() => handleMobileNav(View.Profile)}
                                    className="w-full bg-slate-800 text-indigo-400 px-4 py-3 rounded-xl hover:bg-slate-700 transition duration-300 flex items-center justify-center gap-2 font-bold text-base"
                                >
                                    <UserCircleIcon />
                                    <span>ملفي الشخصي</span>
                                </button>
                            )}
                             <button 
                                onClick={handleMobileLogout}
                                className="w-full text-center text-rose-500 hover:text-rose-400 hover:bg-slate-800 rounded-xl transition duration-300 font-bold text-base px-4 py-3 flex items-center justify-center gap-2"
                            >
                                <LogoutIcon />
                                <span>تسجيل الخروج</span>
                            </button>
                        </>
                    ) : (
                        <div className="flex flex-col gap-3">
                            <button 
                                onClick={() => handleMobileNav(View.AuthChoice)}
                                className="w-full bg-indigo-600 text-white px-5 py-3 rounded-xl hover:bg-indigo-700 transition duration-300 font-bold text-base shadow-md shadow-indigo-900/20"
                            >
                                حساب جديد
                            </button>
                             <button 
                                onClick={() => handleMobileNav(View.AuthChoice)}
                                className="w-full text-center text-slate-300 hover:text-white transition duration-300 font-bold text-base px-4 py-2"
                            >
                                تسجيل الدخول
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
      )}
    </header>
  );
};

export default Header;