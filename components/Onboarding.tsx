
import React, { useState } from 'react';
import type { UserProfile } from '../types';
import { EDUCATION_LEVELS, EXPERIENCE_LEVELS, MOROCCAN_CITIES, LANGUAGES } from '../constants';

interface OnboardingProps {
    onOnboardingComplete: (profile: Omit<UserProfile, 'id'>) => void;
}

const ProgressBar: React.FC<{step: number, totalSteps: number}> = ({ step, totalSteps }) => {
    const progressPercentage = (step / totalSteps) * 100;
    return (
        <div className="w-full bg-slate-100 dark:bg-slate-700 rounded-full h-2.5 mb-4 overflow-hidden">
            <div 
                className="bg-indigo-600 dark:bg-indigo-500 h-full rounded-full transition-all duration-700 ease-out shadow-lg shadow-indigo-200 dark:shadow-none" 
                style={{ width: `${progressPercentage}%` }}
            ></div>
        </div>
    );
};

const CheckIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-indigo-600 dark:text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
    </svg>
);

const Onboarding: React.FC<OnboardingProps> = ({ onOnboardingComplete }) => {
    const [step, setStep] = useState(1);
    const [name, setName] = useState('');
    const [education, setEducation] = useState('');
    const [experienceLevel, setExperienceLevel] = useState('');
    const [languages, setLanguages] = useState<string[]>([]);
    const [skills, setSkills] = useState('');
    const [residentCity, setResidentCity] = useState('');
    const [citySelectionType, setCitySelectionType] = useState<'all' | 'specific' | null>(null);
    const [selectedCities, setSelectedCities] = useState<string[]>([]);
    const [error, setError] = useState('');

    const TOTAL_STEPS = 7;

    const handleCityCheckboxChange = (city: string) => {
        setSelectedCities(prev => 
            prev.includes(city) 
                ? prev.filter(c => c !== city)
                : [...prev, city]
        );
    };

    const handleLanguageCheckboxChange = (language: string) => {
        setLanguages(prev =>
            prev.includes(language)
                ? prev.filter(lang => lang !== language)
                : [...prev, language]
        );
    };
    
    const nextStep = () => {
        if (step === 1 && !name.trim()) {
            setError('الرجاء إدخال اسمك.');
            return;
        }
        if (step === 2 && !education) {
            setError('الرجاء اختيار مستواك الدراسي.');
            return;
        }
        if (step === 3 && !experienceLevel) {
            setError('الرجاء اختيار مستوى خبرتك.');
            return;
        }
        if (step === 6 && !residentCity) {
            setError('الرجاء تحديد مدينة إقامتك.');
            return;
        }
        if (step === 7 && !citySelectionType) {
            setError('الرجاء اختيار تفضيلك لمدينة العمل.');
            return;
        }
        if (step === 7 && citySelectionType === 'specific' && selectedCities.length === 0) {
            setError('الرجاء اختيار مدينة واحدة على الأقل، أو اختر "كل المدن".');
            return;
        }
        setError('');
        if (step < TOTAL_STEPS) {
            setStep(step + 1);
            // Removed window.scrollTo(0, 0) to keep user position
        } else {
            handleSubmit();
        }
    };

    const prevStep = () => {
        setError('');
        if (step > 1) {
            setStep(step - 1);
        }
    };

    const handleSubmit = () => {
        if (!name || !education || !experienceLevel || !residentCity) {
            setError('حدث خطأ. يرجى التأكد من ملء جميع الحقول.');
            return;
        }
        onOnboardingComplete({ 
            name,
            residentCity,
            education,
            experienceLevel,
            workHistory: [],
            languages,
            skills: skills.split(',').map(s => s.trim()).filter(Boolean),
            cities: citySelectionType === 'all' ? [] : selectedCities
        });
    };
    
    const renderStep = () => {
        switch (step) {
            case 1:
                return (
                    <div className="animate-fade-in">
                        <h2 className="text-xl font-extrabold text-slate-800 dark:text-white mb-2">لنبدأ بالتعارف</h2>
                        <p className="text-slate-500 dark:text-slate-400 mb-4 text-sm">ما هو الاسم الذي تود أن يظهر في ملفك الشخصي؟</p>
                        <div className="relative">
                            <label htmlFor="name" className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">الاسم الكامل</label>
                            <input
                                type="text"
                                id="name"
                                value={name}
                                onChange={e => setName(e.target.value)}
                                className="w-full p-2.5 border border-slate-200 dark:border-slate-600 rounded-xl focus:border-indigo-600 dark:focus:border-indigo-400 focus:ring-4 focus:ring-indigo-100 dark:focus:ring-indigo-900/30 transition-all duration-200 outline-none shadow-sm text-base bg-white dark:bg-slate-700 dark:text-white dark:placeholder-slate-400"
                                placeholder="مثال: كريم العلمي"
                                autoFocus
                            />
                        </div>
                    </div>
                );
            case 2:
                return (
                     <div className="animate-fade-in">
                        <h2 className="text-xl font-extrabold text-slate-800 dark:text-white mb-4">المستوى الدراسي</h2>
                        <div className="space-y-2 max-h-[280px] overflow-y-auto pr-2 custom-scrollbar">
                             {EDUCATION_LEVELS.map(level => {
                                const isSelected = education === level;
                                return (
                                    <label key={level} className={`flex items-center justify-between cursor-pointer p-2.5 rounded-xl border-2 transition-all duration-200 ${isSelected ? 'border-indigo-600 bg-indigo-50 dark:bg-indigo-900/20 dark:border-indigo-400 shadow-sm' : 'border-transparent bg-slate-50 dark:bg-slate-700/50 hover:bg-slate-100 dark:hover:bg-slate-700'}`}>
                                        <div className="flex items-center space-x-reverse space-x-3">
                                            <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${isSelected ? 'border-indigo-600 dark:border-indigo-400' : 'border-slate-400 dark:border-slate-500'}`}>
                                                {isSelected && <div className="w-2 h-2 rounded-full bg-indigo-600 dark:bg-indigo-400"></div>}
                                            </div>
                                            <span className={`font-semibold text-sm ${isSelected ? 'text-indigo-900 dark:text-indigo-300' : 'text-slate-700 dark:text-slate-300'}`}>{level}</span>
                                        </div>
                                        <input
                                            type="radio"
                                            name="education"
                                            value={level}
                                            className="hidden"
                                            checked={isSelected}
                                            onChange={() => setEducation(level)}
                                        />
                                        {isSelected && <CheckIcon />}
                                    </label>
                                )
                             })}
                        </div>
                    </div>
                );
            case 3:
                 return (
                     <div className="animate-fade-in">
                        <h2 className="text-xl font-extrabold text-slate-800 dark:text-white mb-4">الخبرة المهنية</h2>
                        <div className="space-y-2">
                             {EXPERIENCE_LEVELS.map(level => {
                                const isSelected = experienceLevel === level;
                                return (
                                    <label key={level} className={`flex items-center justify-between cursor-pointer p-2.5 rounded-xl border-2 transition-all duration-200 ${isSelected ? 'border-indigo-600 bg-indigo-50 dark:bg-indigo-900/20 dark:border-indigo-400 shadow-sm' : 'border-transparent bg-slate-50 dark:bg-slate-700/50 hover:bg-slate-100 dark:hover:bg-slate-700'}`}>
                                        <div className="flex items-center space-x-reverse space-x-3">
                                            <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${isSelected ? 'border-indigo-600 dark:border-indigo-400' : 'border-slate-400 dark:border-slate-500'}`}>
                                                {isSelected && <div className="w-2 h-2 rounded-full bg-indigo-600 dark:bg-indigo-400"></div>}
                                            </div>
                                            <span className={`font-semibold text-sm ${isSelected ? 'text-indigo-900 dark:text-indigo-300' : 'text-slate-700 dark:text-slate-300'}`}>{level}</span>
                                        </div>
                                        <input
                                            type="radio"
                                            name="experience"
                                            value={level}
                                            className="hidden"
                                            checked={isSelected}
                                            onChange={() => setExperienceLevel(level)}
                                        />
                                        {isSelected && <CheckIcon />}
                                    </label>
                                )
                             })}
                        </div>
                    </div>
                );
            case 4:
                return (
                    <div className="animate-fade-in">
                        <h2 className="text-xl font-extrabold text-slate-800 dark:text-white mb-2">اللغات</h2>
                        <p className="text-slate-500 dark:text-slate-400 mb-4 text-sm">حدد جميع اللغات التي تتقنها للتواصل.</p>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                            {LANGUAGES.map(lang => {
                                const isSelected = languages.includes(lang);
                                return (
                                    <label key={lang} className={`flex items-center space-x-reverse space-x-3 cursor-pointer p-2.5 rounded-xl border-2 transition-all duration-200 ${isSelected ? 'border-indigo-600 bg-indigo-50 dark:bg-indigo-900/20 dark:border-indigo-400 shadow-sm' : 'border-transparent bg-slate-50 dark:bg-slate-700/50 hover:bg-slate-100 dark:hover:bg-slate-700'}`}>
                                        <div className={`w-5 h-5 rounded-md border-2 flex items-center justify-center transition-colors ${isSelected ? 'bg-indigo-600 border-indigo-600 dark:bg-indigo-500 dark:border-indigo-500' : 'border-slate-300 dark:border-slate-500 bg-white dark:bg-slate-800'}`}>
                                            {isSelected && (
                                                <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path></svg>
                                            )}
                                        </div>
                                        <input
                                            type="checkbox"
                                            checked={isSelected}
                                            onChange={() => handleLanguageCheckboxChange(lang)}
                                            className="hidden"
                                        />
                                        <span className={`font-bold text-sm ${isSelected ? 'text-indigo-900 dark:text-indigo-300' : 'text-slate-700 dark:text-slate-300'}`}>{lang}</span>
                                    </label>
                                )
                            })}
                        </div>
                    </div>
                );
            case 5:
                return (
                    <div className="animate-fade-in">
                        <h2 className="text-xl font-extrabold text-slate-800 dark:text-white mb-2">المهارات (اختياري)</h2>
                        <p className="text-slate-500 dark:text-slate-400 mb-4 text-sm">أضف مهاراتك لزيادة فرص ظهورك لأصحاب العمل.</p>
                        <label htmlFor="skills" className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">المهارات (افصل بينها بفاصلة)</label>
                        <textarea
                            id="skills"
                            value={skills}
                            onChange={e => setSkills(e.target.value)}
                            rows={4}
                            className="w-full p-2.5 border border-slate-200 dark:border-slate-600 rounded-xl focus:border-indigo-600 dark:focus:border-indigo-400 focus:ring-4 focus:ring-indigo-100 dark:focus:ring-indigo-900/30 transition-all duration-200 outline-none shadow-sm text-base leading-relaxed bg-white dark:bg-slate-700 dark:text-white dark:placeholder-slate-400"
                            placeholder="مثال: إدارة الوقت، التواصل، التسويق الرقمي، Photoshop..."
                        />
                    </div>
                );
            case 6:
                return (
                    <div className="animate-fade-in">
                        <h2 className="text-xl font-extrabold text-slate-800 dark:text-white mb-2">مدينة الإقامة</h2>
                        <p className="text-slate-500 dark:text-slate-400 mb-4 text-sm">أين تقيم حالياً؟</p>
                        <div className="relative">
                            <select
                                id="resident-city"
                                value={residentCity}
                                onChange={e => setResidentCity(e.target.value)}
                                className={`w-full p-2.5 border border-slate-200 dark:border-slate-600 rounded-xl focus:border-indigo-600 dark:focus:border-indigo-400 focus:ring-4 focus:ring-indigo-100 dark:focus:ring-indigo-900/30 outline-none shadow-sm bg-white dark:bg-slate-700 text-base appearance-none cursor-pointer transition-all ${!residentCity ? 'text-slate-400' : 'text-slate-900 dark:text-white font-medium'}`}
                            >
                                <option value="" disabled>-- اختر مدينتك --</option>
                                {MOROCCAN_CITIES.map(c => <option key={c} value={c} className="text-slate-900 dark:text-slate-100 dark:bg-slate-800">{c}</option>)}
                            </select>
                            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-500">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                </svg>
                            </div>
                        </div>
                    </div>
                );
            case 7:
                return (
                    <div className="animate-fade-in">
                        <h2 className="text-xl font-extrabold text-slate-800 dark:text-white mb-4">تفضيلات العمل</h2>
                        
                         <div className="space-y-2.5 mb-4">
                            {[
                                { value: 'all', label: 'كل المدن', desc: 'أنا مستعد للعمل في أي مدينة بالمغرب' },
                                { value: 'specific', label: 'مدن محددة', desc: 'أريد تحديد المدن التي أبحث فيها' }
                            ].map((option) => {
                                const isSelected = citySelectionType === option.value;
                                return (
                                    <label key={option.value} className={`flex items-start space-x-reverse space-x-3 cursor-pointer p-3 rounded-xl border-2 transition-all duration-200 ${isSelected ? 'border-indigo-600 bg-indigo-50 dark:bg-indigo-900/20 dark:border-indigo-400 shadow-md' : 'border-transparent bg-slate-50 dark:bg-slate-700/50 hover:bg-slate-100 dark:hover:bg-slate-700'}`}>
                                        <div className={`mt-0.5 w-4 h-4 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${isSelected ? 'border-indigo-600 dark:border-indigo-400' : 'border-slate-400 dark:border-slate-500'}`}>
                                            {isSelected && <div className="w-2 h-2 rounded-full bg-indigo-600 dark:bg-indigo-400"></div>}
                                        </div>
                                        <div>
                                            <span className={`block text-sm font-bold ${isSelected ? 'text-indigo-900 dark:text-indigo-300' : 'text-slate-800 dark:text-white'}`}>{option.label}</span>
                                            <span className="text-slate-500 dark:text-slate-400 text-xs">{option.desc}</span>
                                        </div>
                                        <input type="radio" name="city-type" value={option.value} checked={isSelected} onChange={() => setCitySelectionType(option.value as any)} className="hidden"/>
                                    </label>
                                )
                            })}
                        </div>

                        {citySelectionType === 'specific' && (
                            <div className="bg-slate-50 dark:bg-slate-700/30 p-3 rounded-xl border border-slate-200 dark:border-slate-600 animate-fade-in">
                                <h3 className="text-slate-700 dark:text-slate-300 font-bold mb-2 text-sm">اختر المدن:</h3>
                                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 max-h-[180px] overflow-y-auto pr-2 custom-scrollbar">
                                    {MOROCCAN_CITIES.map(c => {
                                        const isSelected = selectedCities.includes(c);
                                        return (
                                            <label key={c} className={`flex items-center space-x-reverse space-x-2 cursor-pointer p-1.5 rounded-lg transition-colors ${isSelected ? 'bg-indigo-100 dark:bg-indigo-900/40 text-indigo-800 dark:text-indigo-200' : 'hover:bg-slate-200 dark:hover:bg-slate-600 text-slate-600 dark:text-slate-300'}`}>
                                                <div className={`w-3.5 h-3.5 rounded border flex items-center justify-center ${isSelected ? 'bg-indigo-600 border-indigo-600 dark:bg-indigo-500 dark:border-indigo-500' : 'border-slate-400 dark:border-slate-500 bg-white dark:bg-slate-800'}`}>
                                                    {isSelected && <svg className="w-2.5 h-2.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path></svg>}
                                                </div>
                                                <input type="checkbox" checked={isSelected} onChange={() => handleCityCheckboxChange(c)} className="hidden"/>
                                                <span className="text-xs font-medium">{c}</span>
                                            </label>
                                        )
                                    })}
                                </div>
                            </div>
                        )}
                    </div>
                );
            default:
                return null;
        }
    };

    return (
        <div className="bg-slate-50 dark:bg-slate-900 min-h-[calc(100vh-80px)] flex flex-col justify-center items-center py-6 px-4 transition-colors duration-300">
            <div className="max-w-lg w-full mx-auto">
                {/* Top Header */}
                <div className="text-center mb-6 animate-fade-in-down">
                    <h1 className="text-xl md:text-2xl font-extrabold text-slate-900 dark:text-white mb-2">
                        مرحباً بك، لنبدأ رحلتك المهنية!
                    </h1>
                    <p className="text-sm text-slate-600 dark:text-slate-400">
                        نحتاج بعض المعلومات البسيطة لكي نبحث لك عن الوظيفة الأنسب لطموحاتك.
                    </p>
                </div>

                {/* Main Card */}
                <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl overflow-hidden border border-slate-100 dark:border-slate-700 w-full transition-colors duration-300">
                    <div className="p-5 md:p-6">
                         <div className="flex justify-between text-xs text-slate-400 dark:text-slate-500 font-semibold mb-2">
                            <span>الخطوة {step} من {TOTAL_STEPS}</span>
                            <span>{Math.round((step / TOTAL_STEPS) * 100)}%</span>
                         </div>
                         <ProgressBar step={step} totalSteps={TOTAL_STEPS} />
                         
                         {error && (
                            <div className="bg-rose-50 dark:bg-rose-900/20 border-r-4 border-rose-500 text-rose-700 dark:text-rose-300 p-2.5 rounded-lg mb-4 flex items-center animate-pulse text-xs font-medium">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-2" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                                </svg>
                                {error}
                            </div>
                         )}
                         
                         <div className="min-h-[160px]">
                            {renderStep()}
                         </div>
                    </div>
                     
                     {/* Footer / Buttons */}
                     <div className="bg-slate-50 dark:bg-slate-800/50 p-4 md:p-6 border-t border-slate-100 dark:border-slate-700 flex flex-col-reverse sm:flex-row justify-between items-center gap-6 transition-colors duration-300">
                        {step > 1 ? (
                            <button 
                                onClick={prevStep}
                                className="w-full sm:w-auto px-5 py-2.5 rounded-xl border-2 border-slate-300 dark:border-slate-600 text-slate-600 dark:text-slate-300 font-bold hover:border-slate-400 dark:hover:border-slate-500 hover:bg-slate-100 dark:hover:bg-slate-700 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-slate-200 dark:focus:ring-slate-700 text-sm"
                            >
                                السابق
                            </button>
                        ) : (
                            <div className="w-full sm:w-auto"></div> // Spacer
                        )}
                        
                        <button
                            onClick={nextStep}
                            className="w-full sm:w-auto min-w-[120px] bg-slate-900 dark:bg-indigo-600 text-white px-6 py-2.5 rounded-xl font-bold text-sm shadow-lg shadow-slate-300 dark:shadow-indigo-900/30 hover:bg-slate-800 dark:hover:bg-indigo-700 transform hover:-translate-y-0.5 transition-all duration-200 flex items-center justify-center gap-2"
                        >
                            <span>{step === TOTAL_STEPS ? 'إنهاء التسجيل' : 'التالي'}</span>
                            {step !== TOTAL_STEPS && (
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                                </svg>
                            )}
                        </button>
                     </div>
                </div>
            </div>

            <style>{`
                .custom-scrollbar::-webkit-scrollbar {
                    width: 6px;
                }
                .custom-scrollbar::-webkit-scrollbar-track {
                    background: #f1f5f9;
                    border-radius: 4px;
                }
                .dark .custom-scrollbar::-webkit-scrollbar-track {
                    background: #334155;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb {
                    background: #cbd5e1;
                    border-radius: 4px;
                }
                .dark .custom-scrollbar::-webkit-scrollbar-thumb {
                    background: #64748b;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb:hover {
                    background: #94a3b8;
                }
                @keyframes fade-in-down {
                    0% { opacity: 0; transform: translateY(-20px); }
                    100% { opacity: 1; transform: translateY(0); }
                }
                .animate-fade-in-down {
                    animation: fade-in-down 0.6s ease-out forwards;
                }
                @keyframes fade-in {
                    0% { opacity: 0; transform: translateY(10px); }
                    100% { opacity: 1; transform: translateY(0); }
                }
                .animate-fade-in {
                    animation: fade-in 0.4s ease-out forwards;
                }
            `}</style>
        </div>
    );
};

export default Onboarding;
