
import React, { useState, useEffect } from 'react';
import { MOROCCAN_CITIES, EDUCATION_LEVELS, EXPERIENCE_LEVELS, LANGUAGES } from '../constants';
import type { Job, CompanyProfile } from '../types';

interface PostJobFormProps {
    onAddJob: (job: Omit<Job, 'id' | 'postedDate' | 'companyId'>) => void;
    companyProfile: CompanyProfile | null;
}

const PostJobForm: React.FC<PostJobFormProps> = ({ onAddJob, companyProfile }) => {
    const [title, setTitle] = useState('');
    const [company, setCompany] = useState('');
    const [city, setCity] = useState(MOROCCAN_CITIES[0]);
    const [educationLevel, setEducationLevel] = useState(EDUCATION_LEVELS[0]);
    const [experience, setExperience] = useState(EXPERIENCE_LEVELS[0]);
    const [languages, setLanguages] = useState<string[]>([]);
    const [description, setDescription] = useState('');
    const [error, setError] = useState('');

    useEffect(() => {
        if (companyProfile && !company) {
            setCompany(companyProfile.name);
        }
    }, [companyProfile, company]);

    const handleLanguageChange = (language: string) => {
        setLanguages(prev =>
            prev.includes(language)
                ? prev.filter(lang => lang !== language)
                : [...prev, language]
        );
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!title || !company || !city || !description) {
            setError('يرجى ملء جميع الحقول المطلوبة.');
            return;
        }
        setError('');
        onAddJob({ 
            title, 
            company, 
            city, 
            description,
            educationLevel: educationLevel === EDUCATION_LEVELS[0] ? undefined : educationLevel,
            experience: experience === EXPERIENCE_LEVELS[0] ? undefined : experience,
            languages: languages.length > 0 ? languages : undefined,
        });
        // Reset form
        setTitle('');
        setCompany('');
        setCity(MOROCCAN_CITIES[0]);
        setEducationLevel(EDUCATION_LEVELS[0]);
        setExperience(EXPERIENCE_LEVELS[0]);
        setLanguages([]);
        setDescription('');
    };

    return (
        <div className="bg-gray-50 dark:bg-slate-900 py-12 transition-colors duration-300">
            <div className="container mx-auto px-6 max-w-3xl">
                <div className="bg-white dark:bg-slate-800 p-8 rounded-lg shadow-md border border-gray-100 dark:border-slate-700 transition-colors duration-300">
                    <h2 className="text-3xl font-bold text-center text-gray-800 dark:text-white mb-2">أضف وظيفة جديدة</h2>
                    <p className="text-center text-gray-500 dark:text-slate-400 mb-8 text-lg">املأ النموذج أدناه لنشر فرصتك الوظيفية.</p>
                    
                    {error && <p className="bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300 p-3 rounded-md mb-6 text-center">{error}</p>}

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label htmlFor="title" className="block text-base font-medium text-gray-700 dark:text-slate-300 mb-1">عنوان الوظيفة</label>
                            <input type="text" id="title" value={title} onChange={e => setTitle(e.target.value)} className="w-full p-3 border border-gray-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-indigo-500 bg-white dark:bg-slate-700 dark:text-white text-base transition-colors duration-200" required />
                        </div>
                        
                        <div>
                            <label htmlFor="company" className="block text-base font-medium text-gray-700 dark:text-slate-300 mb-1">اسم الشركة</label>
                            <input type="text" id="company" value={company} onChange={e => setCompany(e.target.value)} className="w-full p-3 border border-gray-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-indigo-500 bg-white dark:bg-slate-700 dark:text-white text-base transition-colors duration-200" required />
                        </div>

                        <div>
                            <label htmlFor="city" className="block text-base font-medium text-gray-700 dark:text-slate-300 mb-1">المدينة</label>
                            <select id="city" value={city} onChange={e => setCity(e.target.value)} className="w-full p-3 border border-gray-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-indigo-500 bg-white dark:bg-slate-700 dark:text-white text-base transition-colors duration-200" required>
                                {MOROCCAN_CITIES.map(c => <option key={c} value={c} className="dark:bg-slate-800">{c}</option>)}
                            </select>
                        </div>

                        <div>
                            <label htmlFor="educationLevel" className="block text-base font-medium text-gray-700 dark:text-slate-300 mb-1">المستوى الدراسي (اختياري)</label>
                            <select id="educationLevel" value={educationLevel} onChange={e => setEducationLevel(e.target.value)} className="w-full p-3 border border-gray-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-indigo-500 bg-white dark:bg-slate-700 dark:text-white text-base transition-colors duration-200">
                                {EDUCATION_LEVELS.map(level => <option key={level} value={level} className="dark:bg-slate-800">{level}</option>)}
                            </select>
                        </div>
                        
                        <div>
                            <label htmlFor="experience" className="block text-base font-medium text-gray-700 dark:text-slate-300 mb-1">سنوات الخبرة (اختياري)</label>
                            <select id="experience" value={experience} onChange={e => setExperience(e.target.value)} className="w-full p-3 border border-gray-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-indigo-500 bg-white dark:bg-slate-700 dark:text-white text-base transition-colors duration-200">
                                {EXPERIENCE_LEVELS.map(level => <option key={level} value={level} className="dark:bg-slate-800">{level}</option>)}
                            </select>
                        </div>

                        <div>
                            <label className="block text-base font-medium text-gray-700 dark:text-slate-300 mb-2">اللغات المطلوبة (اختياري)</label>
                            <div className="flex flex-wrap gap-4">
                                {LANGUAGES.map(lang => (
                                    <label key={lang} className="flex items-center space-x-reverse space-x-2 cursor-pointer">
                                        <input
                                            type="checkbox"
                                            className="h-5 w-5 rounded border-gray-300 dark:border-slate-600 text-indigo-600 focus:ring-indigo-500 bg-white dark:bg-slate-700"
                                            checked={languages.includes(lang)}
                                            onChange={() => handleLanguageChange(lang)}
                                        />
                                        <span className="text-gray-700 dark:text-slate-300">{lang}</span>
                                    </label>
                                ))}
                            </div>
                        </div>

                        <div>
                            <label htmlFor="description" className="block text-base font-medium text-gray-700 dark:text-slate-300 mb-1">الوصف الوظيفي</label>
                            <textarea id="description" value={description} onChange={e => setDescription(e.target.value)} rows={10} className="w-full p-3 border border-gray-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-indigo-500 bg-white dark:bg-slate-700 dark:text-white text-base transition-colors duration-200" required />
                        </div>

                        <button type="submit" className="w-full bg-indigo-600 text-white p-3 rounded-lg font-semibold hover:bg-indigo-700 transition text-lg shadow-md shadow-indigo-200 dark:shadow-none">نشر الوظيفة</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default PostJobForm;
