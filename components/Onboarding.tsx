import React, { useState } from 'react';
import type { UserProfile } from '../types';
import { EDUCATION_LEVELS, EXPERIENCE_LEVELS, MOROCCAN_CITIES, LANGUAGES } from '../constants';

interface OnboardingProps {
    onOnboardingComplete: (profile: UserProfile) => void;
}

const ProgressBar: React.FC<{step: number, totalSteps: number}> = ({ step, totalSteps }) => {
    const progressPercentage = (step / totalSteps) * 100;
    return (
        <div className="w-full bg-gray-200 rounded-full h-2.5 mb-8">
            <div className="bg-indigo-600 h-2.5 rounded-full transition-all duration-500" style={{ width: `${progressPercentage}%` }}></div>
        </div>
    );
};

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
                    <div>
                        <h2 className="text-2xl font-bold text-gray-800 mb-2">لنبدأ ببناء ملفك الشخصي</h2>
                        <p className="text-gray-600 mb-6">سيساعدنا هذا في العثور على الوظائف المناسبة لك.</p>
                        <label htmlFor="name" className="block text-base font-medium text-gray-700 mb-1">ما هو اسمك؟</label>
                        <input
                            type="text"
                            id="name"
                            value={name}
                            onChange={e => setName(e.target.value)}
                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 text-base"
                            placeholder="مثال: كريم العلمي"
                        />
                    </div>
                );
            case 2:
                return (
                     <div>
                        <h2 className="text-2xl font-bold text-gray-800 mb-6">ما هو أعلى مستوى تعليمي لك؟</h2>
                        <div className="space-y-3 max-h-80 overflow-y-auto pr-2">
                             {EDUCATION_LEVELS.map(level => (
                                <label key={level} className="flex items-center space-x-reverse space-x-3 cursor-pointer p-3 rounded-lg border border-gray-200 hover:bg-indigo-50 transition-colors">
                                  <input
                                    type="radio"
                                    name="education"
                                    value={level}
                                    className="h-5 w-5 text-indigo-600 focus:ring-indigo-500"
                                    checked={education === level}
                                    onChange={() => setEducation(level)}
                                  />
                                  <span className="text-gray-700">{level}</span>
                                </label>
                              ))}
                        </div>
                    </div>
                );
            case 3:
                 return (
                     <div>
                        <h2 className="text-2xl font-bold text-gray-800 mb-6">ما هو مستوى خبرتك المهنية؟</h2>
                        <div className="space-y-3">
                             {EXPERIENCE_LEVELS.map(level => (
                                <label key={level} className="flex items-center space-x-reverse space-x-3 cursor-pointer p-3 rounded-lg border border-gray-200 hover:bg-indigo-50 transition-colors">
                                  <input
                                    type="radio"
                                    name="experience"
                                    value={level}
                                    className="h-5 w-5 text-indigo-600 focus:ring-indigo-500"
                                    checked={experienceLevel === level}
                                    onChange={() => setExperienceLevel(level)}
                                  />
                                  <span className="text-gray-700">{level}</span>
                                </label>
                              ))}
                        </div>
                    </div>
                );
            case 4:
                return (
                    <div>
                        <h2 className="text-2xl font-bold text-gray-800 mb-4">ما هي اللغات التي تتقنها؟</h2>
                        <p className="text-gray-600 mb-6">حدد اللغات التي تجيدها لمساعدتنا في إيجاد الوظائف التي تتطلب مهاراتك اللغوية.</p>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {LANGUAGES.map(lang => (
                                <label key={lang} className="flex items-center space-x-reverse space-x-3 cursor-pointer p-3 rounded-lg border border-gray-200 hover:bg-indigo-50 transition-colors">
                                    <input
                                        type="checkbox"
                                        checked={languages.includes(lang)}
                                        onChange={() => handleLanguageCheckboxChange(lang)}
                                        className="h-5 w-5 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                                    />
                                    <span className="text-gray-700">{lang}</span>
                                </label>
                            ))}
                        </div>
                    </div>
                );
            case 5:
                return (
                    <div>
                        <h2 className="text-2xl font-bold text-gray-800 mb-4">ما هي أبرز مهاراتك؟ (اختياري)</h2>
                        <p className="text-gray-600 mb-6">أدخل المهارات التي تتقنها، مفصولة بفاصلة. مثال: HTML, CSS, JavaScript, إدارة المشاريع</p>
                        <textarea
                            id="skills"
                            value={skills}
                            onChange={e => setSkills(e.target.value)}
                            rows={5}
                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 text-base"
                            placeholder="مثال: التواصل الفعال, حل المشكلات, Python, Photoshop..."
                        />
                    </div>
                );
            case 6:
                return (
                    <div>
                        <h2 className="text-2xl font-bold text-gray-800 mb-6">ما هي مدينة إقامتك الحالية؟</h2>
                        <label htmlFor="resident-city" className="block text-base font-medium text-gray-700 mb-1 sr-only">مدينة الإقامة</label>
                        <select
                            id="resident-city"
                            value={residentCity}
                            onChange={e => setResidentCity(e.target.value)}
                            className={`w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 bg-white text-base transition-colors ${!residentCity ? 'text-gray-500' : 'text-gray-900'}`}
                        >
                            <option value="" disabled>-- اختر مدينة إقامتك --</option>
                            {MOROCCAN_CITIES.map(c => <option key={c} value={c} className="text-gray-900">{c}</option>)}
                        </select>
                    </div>
                );
            case 7:
                return (
                    <div>
                        <h2 className="text-2xl font-bold text-gray-800 mb-4">في أي مدينة تفضل العمل؟</h2>
                         <div className="space-y-3 mb-4">
                            <label className="flex items-center space-x-reverse space-x-3 cursor-pointer p-3 rounded-lg border border-gray-200 hover:bg-indigo-50 transition-colors">
                                <input type="radio" name="city-type" value="all" checked={citySelectionType === 'all'} onChange={() => setCitySelectionType('all')} className="h-5 w-5 text-indigo-600 focus:ring-indigo-500"/>
                                <span className="text-gray-700">كل المدن</span>
                            </label>
                            <label className="flex items-center space-x-reverse space-x-3 cursor-pointer p-3 rounded-lg border border-gray-200 hover:bg-indigo-50 transition-colors">
                                <input type="radio" name="city-type" value="specific" checked={citySelectionType === 'specific'} onChange={() => setCitySelectionType('specific')} className="h-5 w-5 text-indigo-600 focus:ring-indigo-500"/>
                                <span className="text-gray-700">تحديد مدن معينة</span>
                            </label>
                        </div>

                        {citySelectionType === 'specific' && (
                            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 max-h-60 overflow-y-auto p-2 border rounded-lg">
                                {MOROCCAN_CITIES.map(c => (
                                    <label key={c} className="flex items-center space-x-reverse space-x-2 cursor-pointer p-2 rounded-md hover:bg-gray-100">
                                        <input type="checkbox" checked={selectedCities.includes(c)} onChange={() => handleCityCheckboxChange(c)} className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"/>
                                        <span className="text-sm text-gray-700">{c}</span>
                                    </label>
                                ))}
                            </div>
                        )}
                    </div>
                );
            default:
                return null;
        }
    };

    return (
        <div className="bg-gray-50 py-10 flex items-center justify-center min-h-[calc(100vh-140px)]">
            <div className="container mx-auto px-6 max-w-2xl">
                <div className="bg-white p-8 rounded-lg shadow-md">
                     <ProgressBar step={step} totalSteps={TOTAL_STEPS} />
                     {error && <p className="bg-red-100 text-red-700 p-3 rounded-md mb-6 text-center">{error}</p>}
                     
                     <div className="min-h-[380px]">
                        {renderStep()}
                     </div>
                     
                     <div className="mt-8 flex justify-between items-center">
                        <button 
                            onClick={prevStep}
                            disabled={step === 1}
                            className="bg-gray-200 text-gray-700 px-6 py-2 rounded-md hover:bg-gray-300 transition disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            السابق
                        </button>
                        <button
                            onClick={nextStep}
                            className="bg-indigo-600 text-white px-6 py-2 rounded-md hover:bg-indigo-700 transition"
                        >
                            {step === TOTAL_STEPS ? 'إنهاء واحصل على وظائف' : 'التالي'}
                        </button>
                     </div>
                </div>
            </div>
        </div>
    );
};

export default Onboarding;