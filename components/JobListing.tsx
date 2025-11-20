import React, { useMemo, useState, useEffect } from 'react';
import type { Job, Filters } from '../types';
import JobCard from './JobCard';
import { MOROCCAN_CITIES } from '../constants';

const SearchIcon: React.FC<{className?: string}> = ({className}) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className || "h-5 w-5 text-gray-400"} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
    </svg>
);

const LocationIcon: React.FC<{className?: string}> = ({className}) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className || "h-5 w-5 text-rose-500"} viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
    </svg>
);

const BellIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto text-indigo-200" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
    </svg>
);

const FilterIcon: React.FC<{className?: string}> = ({className}) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className || "h-5 w-5"} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293.707L3.293 7.293A1 1 0 013 6.586V4z" />
    </svg>
);

interface JobListingProps {
  jobs: Job[];
  initialCities: string[] | null;
  initialSearchTerm: string;
  onSearch: (searchTerm: string, city: string | null) => void;
  onViewDetails: (job: Job) => void;
  onOpenFilterModal: () => void;
  filters: Filters;
  onOpenReportModal: (job: Job) => void;
  blockedCompanies: string[];
}

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

const JobListing: React.FC<JobListingProps> = ({ jobs, initialCities, initialSearchTerm, onSearch, onViewDetails, onOpenFilterModal, filters, onOpenReportModal, blockedCompanies }) => {
    const [searchTerm, setSearchTerm] = useState(initialSearchTerm);
    const [city, setCity] = useState<string>(initialCities?.length === 1 ? initialCities[0] : 'all');

    useEffect(() => {
        setSearchTerm(initialSearchTerm);
        setCity(initialCities?.length === 1 ? initialCities[0] : 'all');
    }, [initialSearchTerm, initialCities]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSearch(searchTerm.trim(), city === 'all' ? null : city);
    }
    
    const activeFilterCount = useMemo(() => {
        return filters.education.length + filters.languages.length;
    }, [filters]);

    const filteredJobs = useMemo(() => {
        const lowercasedSearchTerm = initialSearchTerm.toLowerCase().trim();
        return jobs
            .filter(job => !blockedCompanies.includes(job.company))
            .filter(job => !initialCities || initialCities.length === 0 || initialCities.includes(job.city))
            .filter(job => 
                !lowercasedSearchTerm ||
                job.title.toLowerCase().includes(lowercasedSearchTerm) || 
                job.company.toLowerCase().includes(lowercasedSearchTerm) ||
                job.description.toLowerCase().includes(lowercasedSearchTerm)
            )
            .filter(job =>
                filters.education.length === 0 ||
                (job.educationLevel && filters.education.includes(job.educationLevel)) ||
                (filters.education.includes("بدون مستوى دراسي") && !job.educationLevel)
            )
            .filter(job =>
                filters.languages.length === 0 ||
                (job.languages && job.languages.some(lang => filters.languages.includes(lang)))
            );
    }, [jobs, initialCities, initialSearchTerm, filters, blockedCompanies]);

    const resultsTitle = useMemo(() => {
        const getCityText = () => {
            if (!initialCities || initialCities.length === 0) return "كل المدن";
            if (initialCities.length === 1) return <span className="text-indigo-600">{initialCities[0]}</span>;
            if (initialCities.length <= 3) return <span className="text-indigo-600">{initialCities.join('، ')}</span>;
            return <span className="text-indigo-600">{`${initialCities.length} مدن مختارة`}</span>;
        };
        
        const cityText = getCityText();

        if (initialSearchTerm && initialCities && initialCities.length > 0) {
            return <>نتائج البحث عن <span className="text-gray-800 font-bold">"{initialSearchTerm}"</span> في {cityText}</>;
        }
        if (initialSearchTerm) {
            return <>نتائج البحث عن <span className="text-gray-800 font-bold">"{initialSearchTerm}"</span> في كل المدن</>;
        }
        if (initialCities && initialCities.length > 0) {
            return <>الوظائف المتاحة في {cityText}</>;
        }
        return "أحدث الوظائف الشاغرة";
    }, [initialCities, initialSearchTerm]);
    
    const noResultsMessage = useMemo(() => {
        return 'عذراً، لم نجد نتائج مطابقة لك في الوقت الحالي.';
    }, []);

    const suggestedJobs = useMemo(() => {
        if (filteredJobs.length > 0 || jobs.length === 0) {
            return [];
        }
        // Simple suggestion logic (fallback)
        const availableJobs = jobs.filter(job => !blockedCompanies.includes(job.company));
        return availableJobs.slice(0, 3);
    }, [jobs, filteredJobs.length, blockedCompanies]);
    
    return (
        <div className="bg-gray-50 min-h-screen">
            <div className="bg-white border-b border-gray-200 py-8 shadow-sm sticky top-[60px] z-30">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <form onSubmit={handleSubmit} className="flex flex-col md:flex-row items-center gap-3 max-w-5xl mx-auto">
                        <div className="relative w-full md:flex-1 group">
                             <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none transition-colors group-focus-within:text-indigo-600">
                                <SearchIcon />
                            </div>
                            <input
                                type="text"
                                placeholder="عنوان الوظيفة، شركة..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full h-12 p-3 pr-11 text-base bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200 outline-none"
                                aria-label="البحث عن وظيفة"
                            />
                        </div>
                        <div className="relative w-full md:w-auto md:min-w-[220px] group">
                            <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none transition-colors group-focus-within:text-rose-500">
                                <LocationIcon />
                            </div>
                            <select
                                value={city}
                                onChange={(e) => setCity(e.target.value)}
                                className="w-full h-12 py-3 pl-10 pr-11 text-base font-semibold text-gray-700 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200 outline-none appearance-none cursor-pointer"
                                aria-label="اختر مدينة"
                            >
                                <option value="all">كل المدن</option>
                                {MOROCCAN_CITIES.map((c) => (
                                    <option key={c} value={c}>{c}</option>
                                ))}
                            </select>
                        </div>
                        <div className="flex w-full md:w-auto gap-2">
                             <button
                                type="button"
                                onClick={onOpenFilterModal}
                                className="flex-1 md:w-auto h-12 px-4 rounded-xl font-semibold text-base bg-gray-50 border border-gray-200 text-gray-600 hover:bg-gray-100 hover:text-indigo-600 transition duration-300 flex items-center justify-center relative"
                            >
                                <FilterIcon className="h-5 w-5 ml-2"/>
                                <span>تصفية</span>
                                {activeFilterCount > 0 && (
                                    <span className="absolute -top-2 -left-2 bg-indigo-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-bold border-2 border-white">
                                        {activeFilterCount}
                                    </span>
                                )}
                            </button>
                            <button
                                type="submit"
                                className="flex-1 md:w-auto md:px-8 h-12 rounded-xl font-bold text-base bg-indigo-600 text-white hover:bg-indigo-700 shadow-md hover:shadow-lg transition-all duration-200"
                            >
                                بحث
                            </button>
                        </div>
                    </form>
                </div>
            </div>

            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="mb-8 flex flex-col sm:flex-row justify-between items-baseline border-b border-gray-200 pb-4">
                    <h2 className="text-xl md:text-2xl font-bold text-gray-800">{resultsTitle}</h2>
                    <span className="text-sm font-medium bg-indigo-50 text-indigo-700 px-3 py-1 rounded-full mt-2 sm:mt-0">{filteredJobs.length} وظيفة</span>
                </div>

                {filteredJobs.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {filteredJobs.map(job => (
                            <JobCard key={job.id} job={job} onViewDetails={onViewDetails} onOpenReportModal={onOpenReportModal} />
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-20 px-6 bg-white rounded-2xl shadow-sm border border-gray-100 max-w-2xl mx-auto">
                        <BellIcon />
                        <h3 className="mt-6 text-xl font-bold text-gray-800">{noResultsMessage}</h3>
                        <p className="mt-2 text-gray-500 max-w-md mx-auto">جرب استخدام كلمات مفتاحية مختلفة أو إزالة بعض الفلاتر لتوسيع نطاق بحثك.</p>
                        
                        {suggestedJobs.length > 0 && (
                            <div className="mt-12 text-right">
                                <h4 className="text-lg font-bold text-gray-800 mb-4 border-b pb-2">وظائف قد تهمك</h4>
                                <div className="grid grid-cols-1 gap-4">
                                    {suggestedJobs.map(job => (
                                        <JobCard key={job.id} job={job} onViewDetails={onViewDetails} onOpenReportModal={onOpenReportModal} />
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default JobListing;