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
import type { Job, City, Filters, UserProfile, UserRole, CompanyProfile, Conversation, Message, MockUser, MockGoogleAccount } from './types';
import { INITIAL_JOBS, MOCK_FULL_CONVERSATIONS, MOCK_COMPANY_PROFILES, MOCK_USER_PROFILES, MOCK_USERS, MOCK_GOOGLE_ACCOUNTS } from './constants';
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
import GoogleAccountSelectorModal from './components/GoogleAccountSelectorModal';

const decodeJwtResponse = (token: string) => {
    try {
        const base64Url = token.split('.')[1];
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        const jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function(c) {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        }).join(''));
        return JSON.parse(jsonPayload);
    } catch (e) {
        console.error("Error decoding JWT", e);
        return null;
    }
};

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
  const [isGoogleModalOpen, setIsGoogleModalOpen] = useState(false);
  const [filters, setFilters] = useState<Filters>({ education: [], languages: [] });
  const [userProfiles, setUserProfiles] = useState<UserProfile[]>(MOCK_USER_PROFILES);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [companyProfiles, setCompanyProfiles] = useState<CompanyProfile[]>(MOCK_COMPANY_PROFILES);
  const [companyProfile, setCompanyProfile] = useState<CompanyProfile | null>(null);
  const [blockedCompanies, setBlockedCompanies] = useState<string[]>([]);
  const [toast, setToast] = useState<{ message: string; type: 'success' } | null>(null);
  const [conversations, setConversations] = useState<Conversation[]>(MOCK_FULL_CONVERSATIONS);
  const [selectedConversationId, setSelectedConversationId] = useState<number | null>(null);
  const [viewingProfileId, setViewingProfileId] = useState<{type: 'user' | 'company', id: number} | null>(null);


  const isProfileComplete = (userRole === 'jobSeeker' && !!userProfile) || (userRole === 'employer' && !!companyProfile);

  const handleGoogleAccountSelected = (account: MockGoogleAccount) => {
    setIsGoogleModalOpen(false);
    if (!userRole) return; 

    const existingUser = MOCK_USERS.find(u => u.email === account.email);

    if (existingUser) {
        if (existingUser.role !== userRole) {
            setToast({ message: `هذا الحساب مسجل كـ ${existingUser.role === 'jobSeeker' ? 'باحث عن عمل' : 'صاحب عمل'}. يرجى تسجيل الدخول من الخيار الصحيح.`, type: 'success'});
            setUserRole(null);
            setCurrentView(View.Home);
            return;
        }
        handleLogin(existingUser);
        setToast({ message: `تم تسجيل الدخول بنجاح كـ ${account.name}!`, type: 'success' });
    } else {
        handleSignUp({ email: account.email, role: userRole });
        setToast({ message: `مرحباً بك ${account.name}! يرجى إكمال ملفك الشخصي للبدء.`, type: 'success' });
    }
  };

  useEffect(() => {
    const handleGoogleSignIn = (event: CustomEvent) => {
        const response = event.detail;
        if (response.credential && userRole) {
            const userObject = decodeJwtResponse(response.credential);
            if (userObject) {
                const account: MockGoogleAccount = {
                    name: userObject.name,
                    email: userObject.email,
                    avatarUrl: userObject.picture,
                };
                handleGoogleAccountSelected(account);
            }
        } else if (!userRole) {
            // Handle case where user tries to sign in without selecting a role first
            setToast({ message: 'الرجاء اختيار دورك (باحث عن عمل أو صاحب عمل) أولاً.', type: 'success' });
            setCurrentView(View.Home);
        }
    };

    window.addEventListener('google-signin-success', handleGoogleSignIn as EventListener);

    return () => {
        window.removeEventListener('google-signin-success', handleGoogleSignIn as EventListener);
    };
  }, [userRole]); // Rerun if userRole changes to capture the correct role

  const onNavigate = (view: View) => {
    // Prevent access to protected views if not authenticated
    const protectedViews = [View.JobBoard, View.Profile, View.Messages, View.PostJobForm];
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

    // Reset role if navigating to AuthChoice while not authenticated
    if (view === View.AuthChoice && !isAuthenticated) {
        setUserRole(null);
    }

    setCurrentView(view);
  };
  
  const handleRoleSelection = (role: 'jobSeeker' | 'employer') => {
    setUserRole(role);
    setCurrentView(View.AuthChoice);
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
    }
  };

  const handleSignUp = (credentials: { email: string, role: UserRole }) => {
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

  const handleSocialLogin = () => {
      // This will now only be used for non-Google social logins like FB, GitHub
      setIsGoogleModalOpen(true);
  };


  const handleLogout = () => {
      setIsAuthenticated(false);
      setUserRole(null);
      setUserProfile(null); 
      setCompanyProfile(null); 
      setCurrentView(View.Home);
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

    const fullReport = {
        jobId: reportingJob.id,
        jobTitle: reportingJob.title,
        companyName: reportingJob.company,
        reason: reportData.reason,
        details: reportData.details || 'لا يوجد',
        timestamp: new Date().toISOString(),
        blockCompany: reportData.blockCompany,
    };

    console.log("--- NEW JOB REPORT SUBMITTED ---");
    console.log(JSON.stringify(fullReport, null, 2));
    
    if (reportData.blockCompany) {
        setBlockedCompanies(prev => {
            if (prev.includes(reportingJob.company)) return prev;
            return [...prev, reportingJob.company];
        });
        setToast({
             message: `تم الإبلاغ عن الإعلان بنجاح. لن يتم عرض أي وظائف من شركة "${reportingJob.company}" مجددًا لك.`,
             type: 'success',
         });
    } else {
        setToast({
            message: "شكرًا لك، تم استلام بلاغك بنجاح.",
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
                setTimeout(() => {
                    setConversations(prev => prev.map(c => {
                        if (c.id === conversationId) {
                            const replyMessage: Message = {
                                id: newMessage.id + 1,
                                text: 'شكراً لرسالتك، سنقوم بالرد في أقرب وقت ممكن.',
                                sender: 'other',
                                timestamp: 'الآن'
                            };
                            return { ...c, messages: [...c.messages, replyMessage] };
                        }
                        return c;
                    }));
                }, 1500);

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

  const renderContent = () => {
    switch (currentView) {
      case View.Home: return <HomePage onSelectRole={handleRoleSelection} />;
      case View.Onboarding: return <Onboarding onOnboardingComplete={handleOnboardingComplete} />;
      case View.CompanyProfileSetup: return <CompanyProfileSetup onProfileComplete={handleCompanyProfileComplete} />;
      case View.PostJobForm: return <PostJobForm onAddJob={handleAddJob} companyProfile={companyProfile} />;
      case View.Services: return <ServicesPage />;
      case View.About: return <AboutPage />;
      case View.Contact: return <ContactPage />;
      case View.AuthChoice: return <AuthChoice onNavigate={onNavigate} userRole={userRole} onSelectRole={setUserRole} onSocialLogin={handleSocialLogin} />;
      case View.Login: return <Login onLogin={handleLogin} onNavigate={onNavigate} onSocialLogin={handleSocialLogin} />;
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
    <div className="bg-gray-50 min-h-screen flex flex-col">
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
      <GoogleAccountSelectorModal
        isOpen={isGoogleModalOpen}
        onClose={() => setIsGoogleModalOpen(false)}
        accounts={MOCK_GOOGLE_ACCOUNTS}
        onSelectAccount={handleGoogleAccountSelected}
      />
    </div>
  );
};

export default App;