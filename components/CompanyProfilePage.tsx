import React from 'react';
import type { CompanyProfile, Job } from '../types';
import JobCard from './JobCard';

const BackArrowIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
    </svg>
);

const LinkIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-1" viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M12.586 4.586a2 2 0 112.828 2.828l-3 3a2 2 0 01-2.828 0 1 1 0 00-1.414 1.414 4 4 0 005.656 0l3-3a4 4 0 00-5.656-5.656l-1.5 1.5a1 1 0 101.414 1.414l1.5-1.5zm-5 5a2 2 0 012.828 0 1 1 0 101.414-1.414 4 4 0 00-5.656 0l-3 3a4 4 0 105.656 5.656l1.5-1.5a1 1 0 10-1.414-1.414l-1.5 1.5a2 2 0 11-2.828-2.828l3-3z" clipRule="evenodd" />
    </svg>
);

const LocationIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-1" viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
    </svg>
);


interface CompanyProfilePageProps {
    company: CompanyProfile | null;
    jobs: Job[];
    onBack: () => void;
    onViewDetails: (job: Job) => void;
}

const CompanyProfilePage: React.FC<CompanyProfilePageProps> = ({ company, jobs, onBack, onViewDetails }) => {
    if (!company) {
        return (
            <div className="flex flex-col items-center justify-center py-20 bg-gray-50 min-h-[calc(100vh-140px)]">
                <h2 className="text-2xl font-bold text-gray-700">لم يتم العثور على ملف الشركة.</h2>
            </div>
        );
    }

    const placeholderLogo = `https://picsum.photos/seed/${encodeURIComponent(company.name)}/128/128`;

    return (
        <div className="bg-gray-50 py-12">
            <div className="container mx-auto px-6 max-w-5xl">
                <button onClick={onBack} className="flex items-center text-indigo-600 font-semibold mb-6 hover:underline">
                    <BackArrowIcon />
                    <span className="mr-2">العودة للوظائف</span>
                </button>
                <div className="bg-white p-8 rounded-lg shadow-md">
                    <div className="flex flex-col md:flex-row items-center md:items-start text-center md:text-right">
                        <div className="flex-shrink-0 mb-4 md:mb-0 md:ml-8">
                             <div className="h-24 w-24 md:h-32 md:w-32 rounded-lg bg-gray-100 flex items-center justify-center border-4 border-white shadow-md overflow-hidden">
                                <img src={company.logo || placeholderLogo} alt={`${company.name} logo`} className="h-full w-full object-contain" />
                            </div>
                        </div>
                        <div className="flex-grow">
                            <h1 className="text-3xl md:text-4xl font-extrabold text-gray-800">{company.name}</h1>
                             <div className="flex flex-wrap items-center justify-center md:justify-start gap-x-4 gap-y-2 text-base text-gray-500 mt-3">
                                <span className="flex items-center"><LocationIcon /> {company.city}</span>
                                {company.website && (
                                    <a href={company.website} target="_blank" rel="noopener noreferrer" className="flex items-center text-indigo-600 hover:underline">
                                        <LinkIcon />
                                        <span>الموقع الإلكتروني</span>
                                    </a>
                                )}
                            </div>
                            <p className="mt-4 text-gray-600 leading-relaxed">{company.description}</p>
                        </div>
                    </div>
                    <div className="mt-8 pt-8 border-t grid grid-cols-2 md:grid-cols-3 gap-4 text-center">
                        <div>
                            <p className="text-sm text-gray-500">المجال</p>
                            <p className="font-semibold text-gray-800">{company.industry}</p>
                        </div>
                         <div>
                            <p className="text-sm text-gray-500">حجم الشركة</p>
                            <p className="font-semibold text-gray-800">{company.size}</p>
                        </div>
                         <div className="col-span-2 md:col-span-1">
                            <p className="text-sm text-gray-500">المدينة</p>
                            <p className="font-semibold text-gray-800">{company.city}</p>
                        </div>
                    </div>
                </div>

                <div className="mt-12">
                    <h2 className="text-2xl font-bold text-gray-800 mb-6">الوظائف المتاحة ({jobs.length})</h2>
                    {jobs.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {jobs.map(job => (
                                <JobCard 
                                    key={job.id} 
                                    job={job} 
                                    onViewDetails={onViewDetails}
                                    onOpenReportModal={() => {}} // Not needed here, but prop is required
                                />
                            ))}
                        </div>
                    ) : (
                         <div className="text-center py-16 px-6 bg-white rounded-lg shadow-md border">
                            <h3 className="text-xl font-semibold text-gray-700">لا توجد وظائف متاحة حاليًا</h3>
                            <p className="mt-2 text-gray-500">يرجى التحقق مرة أخرى في وقت لاحق.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default CompanyProfilePage;
