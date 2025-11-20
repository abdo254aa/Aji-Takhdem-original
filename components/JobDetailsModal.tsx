import React, { useState, useEffect } from 'react';
import type { Job } from '../types';

const LocationIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-1" viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
    </svg>
);

const EducationIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.436 60.436 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.905 59.905 0 0112 3.493a59.902 59.902 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0l-2.072-1.037a3.22 3.22 0 01-1.02-3.832c.381-1.002 1.282-1.745 2.457-1.745h16.208c1.176 0 2.076.743 2.457 1.745a3.22 3.22 0 01-1.02 3.832l-2.072 1.037m-15.482 0A49.98 49.98 0 0112 13.489a49.98 49.98 0 017.74-3.342M6.75 15a.75.75 0 100-1.5.75.75 0 000 1.5z" />
    </svg>
);

const ExperienceIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 14.15v4.075c0 1.313-.964 2.443-2.25 2.65-1.37.215-2.653-.33-3.418-1.41a4.5 4.5 0 00-6.164 0c-.765 1.08-2.048 1.625-3.418 1.41-1.286-.207-2.25-1.337-2.25-2.65V14.15m17.5 0l-2.5-2.5m0 0l-2.5 2.5m2.5-2.5v-2.5c0-.966-.784-1.75-1.75-1.75h-8.5c-.966 0-1.75.784-1.75 1.75v2.5m12.5 0l-2.5-2.5" />
    </svg>
);

const LanguageIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 5h12M9 3v2m0 14V5m0 0a2 2 0 11-4 0 2 2 0 014 0zm11 0a2 2 0 100 4m0-4a2 2 0 110 4m0 0v7.5a2.5 2.5 0 01-5 0V12a2.5 2.5 0 015 0z" />
    </svg>
);

const WhatsAppIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
        <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.371-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.5-.669-.51-.173-.008-.371-.008-.57-.008-.198 0-.522.074-.795.371-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.203 5.076 4.487.709.306 1.262.489 1.694.626.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/>
    </svg>
);

const SendMessageIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
        <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
    </svg>
);


interface JobDetailsModalProps {
  job: Job | null;
  onClose: () => void;
  onOpenReportModal: (job: Job) => void;
  onSendMessage: (job: Job) => void;
  onViewCompanyProfile: (companyId: number) => void;
}

const JobDetailsModal: React.FC<JobDetailsModalProps> = ({ job, onClose, onOpenReportModal, onSendMessage, onViewCompanyProfile }) => {
  const [showPhoneNumber, setShowPhoneNumber] = useState(false);

  useEffect(() => {
    // Reset phone number visibility when modal opens with a new job
    setShowPhoneNumber(false);
  }, [job]);

  if (!job) return null;

  const handleReport = () => {
    if (job) {
        onOpenReportModal(job);
    }
  };

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 p-4"
      onClick={onClose}
    >
      <div 
        className="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-6 border-b flex-shrink-0">
          <div className="flex justify-between items-start">
            <div>
                <h2 className="text-2xl font-bold text-gray-900">{job.title}</h2>
                <button 
                  onClick={() => onViewCompanyProfile(job.companyId)}
                  className="text-lg text-gray-600 mt-1 hover:text-indigo-600 hover:underline transition"
                >
                  {job.company}
                </button>
                <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-base mt-2">
                    <span className="flex items-center text-rose-600 font-medium"><LocationIcon /> {job.city}</span>
                    {job.experience && (
                        <span className="flex items-center text-teal-700"><ExperienceIcon /> {job.experience}</span>
                    )}
                    {job.educationLevel && (
                        <span className="flex items-center text-sky-700"><EducationIcon /> {job.educationLevel}</span>
                    )}
                    {job.languages && job.languages.length > 0 && (
                        <span className="flex items-center text-purple-700"><LanguageIcon /> {job.languages.join('، ')}</span>
                    )}
                </div>
            </div>
            <button onClick={onClose} className="text-gray-400 hover:text-gray-600 text-2xl">&times;</button>
          </div>
        </div>
        <div className="p-6 overflow-y-auto flex-grow">
          <h3 className="text-lg font-semibold text-gray-800 mb-3">الوصف الوظيفي</h3>
          <div className="text-base text-gray-700 whitespace-pre-wrap leading-relaxed">
            {job.description}
          </div>
        </div>
        <div className="p-6 bg-gray-50 border-t rounded-b-lg flex flex-col sm:flex-row sm:justify-between items-center gap-4">
            <button
                onClick={handleReport}
                className="text-red-600 hover:underline transition text-sm font-medium order-last sm:order-first"
            >
                الإبلاغ عن هذا الإعلان
            </button>
            <div className="flex items-center gap-3 w-full sm:w-auto justify-center">
                 {job.phoneNumber && (
                    !showPhoneNumber ? (
                        <button
                            onClick={() => setShowPhoneNumber(true)}
                            className="bg-green-500 text-white px-5 py-2.5 rounded-md hover:bg-green-600 transition text-base font-semibold flex items-center gap-2"
                        >
                            <WhatsAppIcon />
                            <span>واتساب</span>
                        </button>
                    ) : (
                        <div className="flex items-center gap-2 bg-green-50 border border-green-200 p-2 rounded-md">
                            <span className="font-bold text-green-800 text-lg tracking-wider" dir="ltr">{job.phoneNumber}</span>
                             <a
                                href={`https://wa.me/${job.phoneNumber.replace('+', '')}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="bg-green-500 text-white px-3 py-1.5 rounded-md hover:bg-green-600 transition text-sm font-semibold"
                            >
                                افتح واتساب
                            </a>
                        </div>
                    )
                )}
                <button
                    onClick={() => onSendMessage(job)}
                    className="bg-indigo-600 text-white px-5 py-2.5 rounded-md hover:bg-indigo-700 transition text-base font-semibold flex items-center gap-2"
                >
                    <SendMessageIcon />
                    <span>أرسل رسالة</span>
                </button>
            </div>
        </div>
      </div>
    </div>
  );
};

export default JobDetailsModal;