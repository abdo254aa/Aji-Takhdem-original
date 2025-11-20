import React, { useState, useRef, useEffect } from 'react';
import type { Job } from '../types';

interface JobCardProps {
  job: Job;
  onViewDetails: (job: Job) => void;
  onOpenReportModal: (job: Job) => void;
}

const KebabMenuIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
    </svg>
);

const FlagIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M3 6a3 3 0 013-3h10a1 1 0 01.8 1.6L14.25 8l2.55 3.4A1 1 0 0116 13H6a1 1 0 00-1 1v3a1 1 0 11-2 0V6z" clipRule="evenodd" />
    </svg>
);


const LocationIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
    </svg>
);

const CompanyIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M4 4a2 2 0 012-2h8a2 2 0 012 2v12a1 1 0 110 2h-3a1 1 0 01-1-1v-2a1 1 0 00-1-1H9a1 1 0 00-1 1v2a1 1 0 01-1 1H4a1 1 0 110-2V4zm3 1h2v2H7V5zm2 4H7v2h2V9zm2-4h2v2h-2V5zm2 4h-2v2h2V9z" clipRule="evenodd" />
    </svg>
);

const EducationIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.436 60.436 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.905 59.905 0 0112 3.493a59.902 59.902 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0l-2.072-1.037a3.22 3.22 0 01-1.02-3.832c.381-1.002 1.282-1.745 2.457-1.745h16.208c1.176 0 2.076.743 2.457 1.745a3.22 3.22 0 01-1.02 3.832l-2.072 1.037m-15.482 0A49.98 49.98 0 0112 13.489a49.98 49.98 0 017.74-3.342M6.75 15a.75.75 0 100-1.5.75.75 0 000 1.5z" />
    </svg>
);

const ExperienceIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 14.15v4.075c0 1.313-.964 2.443-2.25 2.65-1.37.215-2.653-.33-3.418-1.41a4.5 4.5 0 00-6.164 0c-.765 1.08-2.048 1.625-3.418 1.41-1.286-.207-2.25-1.337-2.25-2.65V14.15m17.5 0l-2.5-2.5m0 0l-2.5 2.5m2.5-2.5v-2.5c0-.966-.784-1.75-1.75-1.75h-8.5c-.966 0-1.75.784-1.75 1.75v2.5m12.5 0l-2.5-2.5" />
    </svg>
);

const LanguageIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 5h12M9 3v2m0 14V5m0 0a2 2 0 11-4 0 2 2 0 014 0zm11 0a2 2 0 100 4m0-4a2 2 0 110 4m0 0v7.5a2.5 2.5 0 01-5 0V12a2.5 2.5 0 015 0z" />
    </svg>
);


const getImportanceLevel = (job: Job): 'high' | 'medium' | 'normal' => {
    const postedDate = new Date(job.postedDate);
    const today = new Date();
    postedDate.setHours(0, 0, 0, 0);
    today.setHours(0, 0, 0, 0);

    const daysSincePosted = (today.getTime() - postedDate.getTime()) / (1000 * 3600 * 24);

    const isHighExperience = job.experience === '5+ سنوات';
    const isMediumExperience = job.experience === '3-5 سنوات';

    if (isHighExperience && daysSincePosted <= 5) {
        return 'high';
    }
    
    if (daysSincePosted <= 7 || isHighExperience || isMediumExperience) {
        return 'medium';
    }

    return 'normal';
};

const JobCard: React.FC<JobCardProps> = ({ job, onViewDetails, onOpenReportModal }) => {
  const importance = getImportanceLevel(job);
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
        if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
            setMenuOpen(false);
        }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
        document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [menuRef]);


  const cardClasses = {
      high: 'border-amber-200 bg-amber-50/40',
      medium: 'border-gray-100 bg-white',
      normal: 'border-gray-100 bg-white',
  };

  const isNew = new Date(job.postedDate) > new Date(new Date().setDate(new Date().getDate() - 7));

  return (
    <div className={`p-6 rounded-2xl shadow-sm hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 border flex flex-col justify-between relative ${cardClasses[importance]}`}>
      {importance === 'high' && (
         <div className="absolute top-4 left-12">
             <span className="bg-amber-100 text-amber-700 text-xs font-bold px-2 py-1 rounded-md">مميزة</span>
        </div>
      )}
      
      <div ref={menuRef} className="absolute top-4 left-4">
            <button 
                onClick={(e) => { e.stopPropagation(); setMenuOpen(!menuOpen); }}
                className="text-gray-400 hover:text-gray-600 p-1 rounded-full focus:outline-none transition-colors"
                aria-label="خيارات الوظيفة"
            >
                <KebabMenuIcon />
            </button>
            {menuOpen && (
                <div className="absolute left-0 mt-2 w-48 bg-white rounded-xl shadow-lg z-10 border border-gray-100 overflow-hidden">
                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            onOpenReportModal(job);
                            setMenuOpen(false);
                        }}
                        className="w-full text-right px-4 py-3 text-sm text-red-600 hover:bg-red-50 flex items-center transition-colors"
                    >
                        <FlagIcon />
                        <span>الإبلاغ عن الإعلان</span>
                    </button>
                </div>
            )}
        </div>

      <div className="mb-4">
        <div className="flex justify-between items-start mb-3">
             <div className="flex items-center gap-2">
                <h3 className="text-xl font-extrabold text-gray-800 line-clamp-1" title={job.title}>{job.title}</h3>
                 {isNew && (
                    <span className="bg-blue-100 text-blue-600 text-[10px] font-bold px-2 py-0.5 rounded-full">جديد</span>
                )}
             </div>
        </div>
        
        <div className="flex items-center text-gray-600 mb-4">
             <div className="bg-indigo-50 p-1.5 rounded-lg text-indigo-600 ml-3">
                <CompanyIcon />
             </div>
            <span className="font-bold text-sm">{job.company}</span>
        </div>

        <div className="flex flex-wrap gap-2 mb-4">
            <div className="flex items-center bg-gray-50 text-gray-600 px-3 py-1 rounded-full text-xs font-medium border border-gray-100">
                <LocationIcon />
                <span>{job.city}</span>
            </div>
            {job.experience && (
                <div className="flex items-center bg-teal-50 text-teal-700 px-3 py-1 rounded-full text-xs font-medium border border-teal-100">
                    <ExperienceIcon />
                    <span>{job.experience}</span>
                </div>
            )}
             {job.educationLevel && (
                <div className="flex items-center bg-sky-50 text-sky-700 px-3 py-1 rounded-full text-xs font-medium border border-sky-100">
                    <EducationIcon />
                    <span>{job.educationLevel}</span>
                </div>
            )}
        </div>

        <p className="text-gray-500 text-sm line-clamp-2 leading-relaxed">{job.description}</p>
      </div>
      
      <div className="mt-auto pt-4 border-t border-gray-50 flex justify-between items-center">
         <span className="text-xs text-gray-400">{job.postedDate}</span>
        <button 
            onClick={() => onViewDetails(job)}
            className="text-indigo-600 hover:text-indigo-800 font-bold text-sm flex items-center gap-1 transition-colors group"
        >
            <span>عرض التفاصيل</span>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 transform group-hover:-translate-x-1 transition-transform" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
        </button>
      </div>
    </div>
  );
};

export default JobCard;