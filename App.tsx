
import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import JobListing from './components/JobListing';
import PostJobForm from './components/PostJobForm';
import JobDetailsModal from './components/JobDetailsModal';
import FilterModal from './components/FilterModal';
import ReportModal from './components/ReportModal';
import Onboarding from './components/Onboarding';
import { View } from './types';
import type { Job, City, Filters, UserProfile, UserRole, CompanyProfile, Conversation, Message, MockUser, MockGoogleAccount, ConcoursArticle } from './types';
import { INITIAL_JOBS, MOCK_FULL_CONVERSATIONS, MOCK_COMPANY_PROFILES, MOCK_USER_PROFILES, MOCK_USERS, MOCK_GOOGLE_ACCOUNTS, MOCK_CONCOURS } from './constants';
import HomePage from './components/HomePage';
import ServicesPage from './components/ServicesPage';
import AboutPage from './components/AboutPage';
import ContactPage from './components/ContactPage';
import CompanyProfileSetup from './components/CompanyProfileSetup';
import AuthChoice from './components/AuthChoice';
import Login from './components/Login';
import SignUp from './components/SignUp';
import ProfilePage from './components/ProfilePage';
import MessagesPage from './components/MessagesPage';
import Toast from './components/Toast';
import CompanyProfilePage from './components/CompanyProfilePage';
import UserProfileView from './components/UserProfileView';
import PrivacyPolicyPage from './components/PrivacyPolicyPage';
import MessagingWidget from './components/MessagingWidget';
import NotificationsWidget from './components/NotificationsWidget';
import ConcoursPage from './components/ConcoursPage'; // Import ConcoursPage
import { auth, googleProvider } from './firebase';
import { signInWithPopup, signOut, onAuthStateChanged } from 'firebase/auth';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<View>(View.Home);
  const [previousView, setPreviousView] = useState<View>(View.JobBoard);
  const [userRole, setUserRole] = useState<UserRole>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [selectedCities, setSelectedCities] = useState<City[] | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [jobs, setJobs] = useState<Job[]>(INITIAL_JOBS);
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [reportingJob, setReportingJob] = useState<Job | null>(null);
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
  const [filters, setFilters] = useState<Filters>({ education: [], languages: [] });
  const [userProfiles, setUserProfiles] = useState<UserProfile[]>(MOCK_USER_PROFILES);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [companyProfiles, setCompanyProfiles] = useState<CompanyProfile[]>(MOCK_COMPANY_PROFILES);
  const [companyProfile, setCompanyProfile] = useState<CompanyProfile | null>(null);
  const [blockedCompanies, setBlockedCompanies] = useState<string[]>([]);
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);
  const [conversations, setConversations] = useState<Conversation[]>(MOCK_FULL_CONVERSATIONS);
  const [selectedConversationId, setSelectedConversationId] = useState<number | null>(null);
  const [viewingProfileId, setViewingProfileId] = useState<{type: 'user' | 'company', id: number} | null>(null);
  const [concours, setConcours] = useState<ConcoursArticle[]>(MOCK_CONCOURS); // Concours State
  
  // Dark Mode State
  const [isDarkMode, setIsDarkMode] = useState(() => {
    if (typeof window !== 'undefined') {
        const saved = localStorage.getItem('darkMode');
        return saved === 'true' || (!saved && window.matchMedia('(prefers-color-scheme: dark)').matches);
    }
    return false;
  });

  const toggleDarkMode = () => {
      setIsDarkMode(prev => !prev);
  };

  // Apply Dark Mode
  useEffect(() => {
    if (isDarkMode) {
        document.documentElement.classList.add('dark');
        localStorage.setItem('darkMode', 'true');
    } else {
        document.documentElement.classList.remove('dark');
        localStorage.setItem('darkMode', 'false');
    }
  }, [isDarkMode]);

  const isProfileComplete = (userRole === 'jobSeeker' && !!userProfile) || (userRole === 'employer' && !!companyProfile) || (userRole === 'admin');

  // Listen for Firebase Auth state changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsAuthenticated(true);
        if (!userRole) {
             const mockUser = MOCK_USERS.find(u => u.email === user.email);
             if (mockUser) {
                 setUserRole(mockUser.role);
                 handleLogin(mockUser);
             }
        }
      } else {
        setIsAuthenticated(false);
        setUserRole(null);
        setUserProfile(null);
        setCompanyProfile(null);
      }
    });
    return () => unsubscribe();
  }, []);


  const onNavigate = (view: View) => {
    if (view === View.AuthChoice && !isAuthenticated) {
        setUserRole(null);
    }

    // Protected views
    const protectedViews = [View.JobBoard, View.Profile, View.Messages, View.PostJobForm];
    // Admin can access job board but shouldn't be forced to create profile
    if (protectedViews.includes(view) && !isAuthenticated) {
        setUserRole(null);
        setCurrentView(View.AuthChoice);
        return;
    }

    if (view === View.JobBoard && currentView !== View.JobBoard) {
        setSearchTerm('');
        setSelectedCities(null);
        setFilters({ education: [], languages: [] });
    }
    
     if (view === View.Messages) {
        const isMobile = window.matchMedia('(max-width: 767px)').matches;

        if (isMobile) {
            setSelectedConversationId(null);
        } else {
            const currentSelectedConvExists = conversations.some(c => c.id === selectedConversationId);
            if ((!selectedConversationId || !currentSelectedConvExists) && conversations.length > 0) {
                 handleSelectConversation(conversations[0].id);
            }
        }
    }

    setCurrentView(view);
  };
  
  const handleRoleSelection = (role: UserRole) => {
    if(role) {
        setUserRole(role);
        setCurrentView(View.AuthChoice);
    }
  };

  const handleAddJob = (newJobData: Omit<Job, 'id' | 'postedDate' | 'companyId'>) => {
    if (!companyProfile) return;
    const newJob: Job = {
        ...newJobData,
        id: jobs.length + 1,
        postedDate: new Date().toISOString().split('T')[0],
        companyId: companyProfile.id,
    };
    setJobs(prevJobs => [newJob, ...prevJobs]);
    setSelectedCities([newJob.city]);
    setCurrentView(View.JobBoard);
  };
  
  const handleViewDetails = (job: Job) => {
    setSelectedJob(job);
  };
  
  const handleCloseModal = () => {
    setSelectedJob(null);
  };

  const handleSearch = (term: string, city: City | null) => {
    setSearchTerm(term);
    setSelectedCities(city ? [city] : null);
    setCurrentView(View.JobBoard);
  };

  const handleApplyFilters = (newFilters: Filters) => {
    setFilters(newFilters);
    setIsFilterModalOpen(false);
  };

  const handleOnboardingComplete = (profileData: Omit<UserProfile, 'id'>) => {
    const newProfile: UserProfile = { ...profileData, id: userProfiles.length + 1 };
    setUserProfiles(prev => [...prev, newProfile]);
    setUserProfile(newProfile);
    setCurrentView(View.JobBoard);
  };

  const handleCompanyProfileComplete = (profileData: Omit<CompanyProfile, 'id'>) => {
    const newProfile: CompanyProfile = { ...profileData, id: companyProfiles.length + 1 };
    setCompanyProfiles(prev => [...prev, newProfile]);
    setCompanyProfile(newProfile);
    setCurrentView(View.PostJobForm);
  };

  const handleLogin = (user: MockUser) => {
    setIsAuthenticated(true);
    setUserRole(user.role);

    if (user.role === 'jobSeeker') {
        const profile = userProfiles.find(p => p.id === user.profileId) || null;
        setUserProfile(profile);
        setCurrentView(profile ? View.JobBoard : View.Onboarding);
    } else if (user.role === 'employer') {
        const profile = companyProfiles.find(p => p.id === user.profileId) || null;
        setCompanyProfile(profile);
        setCurrentView(profile ? View.PostJobForm : View.CompanyProfileSetup);
    } else if (user.role === 'admin') {
        setCurrentView(View.Concours);
        setToast({ message: 'مرحباً بك أيها المدير!', type: 'success' });
    }
  };

  const handleSignUp = (credentials: { email: string, role: UserRole }) => {
      if(!credentials.role) return;
      setIsAuthenticated(true);
      setUserRole(credentials.role);
      setUserProfile(null);
      setCompanyProfile(null);
      if (credentials.role === 'jobSeeker') {
          setCurrentView(View.Onboarding);
      } else if (credentials.role === 'employer') {
          setCurrentView(View.CompanyProfileSetup);
      }
  };

  const handleSocialLogin = async () => {
      if (!userRole) {
        setToast({ message: 'الرجاء اختيار دورك أولاً.', type: 'error' });
        return;
      }

      try {
        const result = await signInWithPopup(auth, googleProvider);
        const user = result.user;
        
        const existingUser = MOCK_USERS.find(u => u.email === user.email);

        if (existingUser) {
             if (existingUser.role !== userRole && userRole !== 'admin') {
                setToast({ message: `حساب مسجل كـ ${existingUser.role}. يرجى تسجيل الدخول من الخيار الصحيح.`, type: 'error'});
                await signOut(auth);
                return;
            }
            handleLogin(existingUser);
            setToast({ message: `تم تسجيل الدخول بنجاح!`, type: 'success' });
        } else {
             handleSignUp({ email: user.email || '', role: userRole });
             setToast({ message: `مرحباً بك!`, type: 'success' });
        }
      } catch (error: any) {
        console.error("Social login error:", error);
        if (error.code === 'auth/popup-closed-by-user') return;
        setToast({ message: 'حدث خطأ أثناء تسجيل الدخول.', type: 'error' });
      }
  };

  const handleLogout = async () => {
      try {
        await signOut(auth);
        setIsAuthenticated(false);
        setUserRole(null);
        setUserProfile(null); 
        setCompanyProfile(null); 
        setCurrentView(View.Home);
        setToast({ message: 'تم تسجيل الخروج بنجاح.', type: 'success' });
      } catch (error) {
        console.error("Logout error:", error);
      }
  };

  const handleProfileUpdate = (updatedProfile: UserProfile) => {
    setUserProfile(updatedProfile);
  };

  const handleOpenReportModal = (job: Job) => {
    setSelectedJob(null);
    setReportingJob(job);
  };

  const handleCloseReportModal = () => {
    setReportingJob(null);
  };
  
  const handleSubmitReport = (reportData: { reason: string; details?: string; blockCompany: boolean; }) => {
    if (!reportingJob) return;

    if (reportData.blockCompany) {
        setBlockedCompanies(prev => [...prev, reportingJob.company]);
        setToast({
             message: `تم الإبلاغ وحظر شركة "${reportingJob.company}".`,
             type: 'success',
         });
    } else {
        setToast({
            message: "شكرًا لك، تم استلام بلاغك.",
            type: 'success'
        });
    }
    setReportingJob(null);
  };

  const handleSendMessage = (job: Job) => {
    const existingConversation = conversations.find(c => c.participantId === job.companyId && c.participantType === 'company');
    
    if (existingConversation) {
        handleSelectConversation(existingConversation.id);
    } else {
        const newId = conversations.length > 0 ? Math.max(...conversations.map(c => c.id)) + 1 : 1;
        const newConversation: Conversation = {
            id: newId,
            participantId: job.companyId,
            participantType: 'company',
            name: job.company,
            avatarChar: job.company.charAt(0),
            avatarUrl: companyProfiles.find(p => p.id === job.companyId)?.logo || `https://picsum.photos/seed/${encodeURIComponent(job.company)}/100/100`,
            onlineStatus: 'offline',
            messages: [{
                id: 1,
                text: `مرحباً، أنا مهتم بوظيفة "${job.title}".`,
                sender: 'me',
                timestamp: 'الآن',
            }],
            unread: 0,
        };
        setConversations(prev => [newConversation, ...prev]);
        handleSelectConversation(newId);
    }
    
    setSelectedJob(null);
    setCurrentView(View.Messages);
  };
  
  const handleSelectConversation = (id: number | null) => {
    setSelectedConversationId(id);
    if (id !== null) {
        setConversations(prevConvs =>
            prevConvs.map(conv =>
                conv.id === id ? { ...conv, unread: 0 } : conv
            )
        );
    }
  };

  const handleAddNewMessage = (conversationId: number, messageText: string) => {
    setConversations(prevConvs => 
        prevConvs.map(conv => {
            if (conv.id === conversationId) {
                const newMessage: Message = {
                    id: conv.messages.length > 0 ? Math.max(...conv.messages.map(m => m.id)) + 1 : 1,
                    text: messageText,
                    sender: 'me',
                    timestamp: 'الآن'
                };
                return { ...conv, messages: [...conv.messages, newMessage] };
            }
            return conv;
        })
    );
  };

  const handleViewProfile = (id: number, type: 'user' | 'company') => {
    setViewingProfileId({ id, type });
    setPreviousView(currentView);
    setCurrentView(type === 'company' ? View.CompanyProfilePage : View.UserProfilePage);
  };

  const handleAddConcours = (article: Omit<ConcoursArticle, 'id' | 'publishDate'>) => {
      const newArticle: ConcoursArticle = {
          ...article,
          id: concours.length + 1,
          publishDate: new Date().toISOString().split('T')[0]
      };
      setConcours(prev => [newArticle, ...prev]);
      setToast({ message: 'تم نشر المباراة بنجاح!', type: 'success' });
  };

  const renderContent = () => {
    switch (currentView) {
      case View.Home: return <HomePage onSelectRole={(role) => handleRoleSelection(role)} />;
      case View.Onboarding: return <Onboarding onOnboardingComplete={handleOnboardingComplete} />;
      case View.CompanyProfileSetup: return <CompanyProfileSetup onProfileComplete={handleCompanyProfileComplete} />;
      case View.PostJobForm: return <PostJobForm onAddJob={handleAddJob} companyProfile={companyProfile} />;
      case View.Services: return <ServicesPage />;
      case View.About: return <AboutPage />;
      case View.Contact: return <ContactPage />;
      case View.PrivacyPolicy: return <PrivacyPolicyPage />;
      case View.AuthChoice: return <AuthChoice onNavigate={onNavigate} userRole={userRole} onSelectRole={setUserRole} onSocialLogin={handleSocialLogin} />;
      case View.Login: return <Login onLogin={handleLogin} onNavigate={onNavigate} onSocialLogin={handleSocialLogin} userRole={userRole} />;
      case View.SignUp: return <SignUp onSignUp={(creds) => handleSignUp(creds)} onNavigate={onNavigate} userRole={userRole} onSocialLogin={handleSocialLogin} />;
      case View.Profile: return userProfile ? <ProfilePage userProfile={userProfile} onUpdateProfile={handleProfileUpdate} /> : <Onboarding onOnboardingComplete={handleOnboardingComplete} />;
      case View.Messages: return <MessagesPage 
                                    conversations={conversations} 
                                    selectedConversationId={selectedConversationId}
                                    onSelectConversation={handleSelectConversation}
                                    onSendMessage={handleAddNewMessage}
                                    onViewProfile={handleViewProfile}
                                  />;
      case View.CompanyProfilePage:
        const company = companyProfiles.find(p => p.id === viewingProfileId?.id) || null;
        return <CompanyProfilePage 
                    company={company} 
                    jobs={jobs.filter(j => j.companyId === company?.id)}
                    onBack={() => onNavigate(previousView)}
                    onViewDetails={handleViewDetails}
                />;
      case View.UserProfilePage:
        const user = userProfiles.find(p => p.id === viewingProfileId?.id) || null;
        return <UserProfileView
                    profile={user}
                    onBack={() => onNavigate(previousView)}
                />;
      case View.Concours: // New Case
        return <ConcoursPage 
                    concours={concours} 
                    userRole={userRole} 
                    onAddConcours={handleAddConcours} 
                />;
      case View.JobBoard:
      default:
        return <JobListing 
            jobs={jobs} 
            initialCities={selectedCities} 
            initialSearchTerm={searchTerm}
            onSearch={handleSearch}
            onViewDetails={handleViewDetails}
            onOpenFilterModal={() => setIsFilterModalOpen(true)}
            filters={filters}
            onOpenReportModal={handleOpenReportModal}
            blockedCompanies={blockedCompanies}
          />;
    }
  };

  const unreadMessagesCount = conversations.reduce((sum, conv) => sum + conv.unread, 0);

  return (
    <div className="bg-gray-50 dark:bg-slate-900 min-h-screen flex flex-col transition-colors duration-300">
      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
      <Header 
        currentView={currentView} 
        onNavigate={onNavigate} 
        userRole={userRole} 
        isAuthenticated={isAuthenticated}
        hasJobSeekerProfile={!!userProfile}
        isProfileComplete={isProfileComplete}
        unreadMessagesCount={unreadMessagesCount}
        onLogout={handleLogout}
        isDarkMode={isDarkMode}
        toggleDarkMode={toggleDarkMode}
        conversations={conversations}
        onSelectConversation={handleSelectConversation}
      />
      <main className="flex-grow">
        {renderContent()}
      </main>
      <Footer onNavigate={onNavigate} />
      <JobDetailsModal 
        job={selectedJob} 
        onClose={handleCloseModal} 
        onOpenReportModal={handleOpenReportModal}
        onSendMessage={handleSendMessage}
        onViewCompanyProfile={(companyId) => handleViewProfile(companyId, 'company')}
       />
      <ReportModal 
        job={reportingJob}
        onClose={handleCloseReportModal}
        onSubmit={handleSubmitReport}
      />
      <FilterModal 
        isOpen={isFilterModalOpen}
        onClose={() => setIsFilterModalOpen(false)}
        onApply={handleApplyFilters}
        currentFilters={filters}
      />
      
      {/* Floating Widgets - Only show when authenticated and not Admin */}
      {isAuthenticated && isProfileComplete && userRole !== 'admin' && (
        <>
             {currentView !== View.Messages && (
                <MessagingWidget />
             )}
             <NotificationsWidget />
        </>
      )}
    </div>
  );
};

export default App;
