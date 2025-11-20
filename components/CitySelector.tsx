import React, { useState } from 'react';
import type { City } from '../types';
import { MOROCCAN_CITIES } from '../constants';

interface JobSearchProps {
  onSearch: (searchTerm: string, city: City) => void;
}

const SearchIcon: React.FC<{className?: string}> = ({className}) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className || "h-5 w-5 text-gray-400"} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
    </svg>
);

const LocationIcon: React.FC<{className?: string}> = ({className}) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className || "h-5 w-5 text-gray-400"} viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
    </svg>
);


const JobSearch: React.FC<JobSearchProps> = ({ onSearch }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [city, setCity] = useState<City>(MOROCCAN_CITIES[0]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSearch(searchTerm, city);
    }

  return (
    <div className="flex flex-col items-center justify-center py-16 sm:py-24 bg-gray-50">
      <div className="text-center px-4">
        <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-800 mb-2">
            اكتشف فرصتك المهنية التالية
        </h1>
        <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
            ابحث في آلاف الوظائف الشاغرة في جميع أنحاء المغرب وابدأ مسيرتك الجديدة اليوم.
        </p>
      </div>
      <div className="w-full max-w-3xl px-4">
        <form 
            onSubmit={handleSubmit}
            className="bg-white p-4 sm:p-6 rounded-xl shadow-lg border border-gray-200 flex flex-col md:flex-row items-center gap-4 w-full"
        >
            <div className="relative flex-grow w-full">
                <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none">
                    <SearchIcon />
                </div>
                <input 
                    type="text"
                    placeholder="عنوان الوظيفة، شركة، أو كلمة مفتاحية"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full h-14 p-4 pr-12 text-lg border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
                    aria-label="البحث عن وظيفة"
                />
            </div>
            <div className="relative flex-grow w-full md:max-w-xs">
                 <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none">
                    <LocationIcon />
                </div>
                <select 
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="w-full h-14 p-4 pr-12 text-lg border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition bg-white appearance-none"
                    aria-label="اختر مدينة"
                >
                    {MOROCCAN_CITIES.map((c) => (
                        <option key={c} value={c}>{c}</option>
                    ))}
                </select>
            </div>
            <button
              type="submit"
              className="w-full md:w-auto flex-shrink-0 bg-indigo-600 text-white h-14 px-8 rounded-lg font-semibold text-lg hover:bg-indigo-700 transition duration-300 flex items-center justify-center"
            >
                <SearchIcon className="h-6 w-6 ml-2"/>
                <span>بحث</span>
            </button>
        </form>
      </div>
    </div>
  );
};

export default JobSearch;
