import React, { useState, useRef } from 'react';
import { MOROCCAN_CITIES, COMPANY_SIZES } from '../constants';
import type { CompanyProfile } from '../types';

interface CompanyProfileSetupProps {
    onProfileComplete: (profile: CompanyProfile) => void;
}

const UploadIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
    </svg>
);

const CompanyProfileSetup: React.FC<CompanyProfileSetupProps> = ({ onProfileComplete }) => {
    const [name, setName] = useState('');
    const [logo, setLogo] = useState('');
    const [website, setWebsite] = useState('');
    const [city, setCity] = useState(MOROCCAN_CITIES[0]);
    const [industry, setIndustry] = useState('');
    const [size, setSize] = useState(COMPANY_SIZES[0]);
    const [description, setDescription] = useState('');
    const [error, setError] = useState('');
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setLogo(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!name.trim() || !industry.trim() || !description.trim()) {
            setError('الرجاء ملء جميع الحقول المطلوبة: اسم الشركة، المجال، والوصف.');
            return;
        }
        setError('');
        onProfileComplete({
            name,
            logo,
            website,
            city,
            industry,
            size,
            description,
        });
    };

    return (
        <div className="bg-gray-50 py-12">
            <div className="container mx-auto px-6 max-w-3xl">
                <div className="bg-white p-8 rounded-lg shadow-md">
                    <h2 className="text-3xl font-bold text-center text-gray-800 mb-2">إنشاء ملف تعريف شركتك</h2>
                    <p className="text-center text-gray-500 mb-8 text-lg">سيظهر هذا الملف للمرشحين المحتملين. اجعله جذابًا!</p>
                    
                    {error && <p className="bg-red-100 text-red-700 p-3 rounded-md mb-6 text-center">{error}</p>}

                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Logo Upload */}
                        <div>
                             <label className="block text-base font-medium text-gray-700 mb-2">شعار الشركة</label>
                            <div
                                className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md cursor-pointer"
                                onClick={() => fileInputRef.current?.click()}
                            >
                                <div className="space-y-1 text-center">
                                    {logo ? (
                                        <img src={logo} alt="Company Logo" className="mx-auto h-24 w-24 object-contain rounded-md" />
                                    ) : (
                                        <>
                                            <UploadIcon />
                                            <div className="flex text-sm text-gray-600 justify-center">
                                                <p className="pl-1">اسحب وأفلت أو انقر للتحميل</p>
                                            </div>
                                            <p className="text-xs text-gray-500">PNG, JPG up to 2MB</p>
                                        </>
                                    )}
                                </div>
                            </div>
                             <input ref={fileInputRef} id="file-upload" name="file-upload" type="file" className="sr-only" onChange={handleLogoUpload} accept="image/png, image/jpeg" />
                        </div>
                        
                        {/* Company Info Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label htmlFor="name" className="block text-base font-medium text-gray-700 mb-1">اسم الشركة</label>
                                <input type="text" id="name" value={name} onChange={e => setName(e.target.value)} className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 text-base" required />
                            </div>
                             <div>
                                <label htmlFor="website" className="block text-base font-medium text-gray-700 mb-1">الموقع الإلكتروني (اختياري)</label>
                                <input type="url" id="website" value={website} onChange={e => setWebsite(e.target.value)} className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 text-base" placeholder="https://example.com" />
                            </div>
                            <div>
                                <label htmlFor="city" className="block text-base font-medium text-gray-700 mb-1">المدينة الرئيسية</label>
                                <select id="city" value={city} onChange={e => setCity(e.target.value)} className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 bg-white text-base" required>
                                    {MOROCCAN_CITIES.map(c => <option key={c} value={c}>{c}</option>)}
                                </select>
                            </div>
                             <div>
                                <label htmlFor="industry" className="block text-base font-medium text-gray-700 mb-1">مجال الشركة</label>
                                <input type="text" id="industry" value={industry} onChange={e => setIndustry(e.target.value)} className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 text-base" placeholder="مثال: تكنولوجيا المعلومات" required />
                            </div>
                             <div className="md:col-span-2">
                                <label htmlFor="size" className="block text-base font-medium text-gray-700 mb-1">حجم الشركة</label>
                                <select id="size" value={size} onChange={e => setSize(e.target.value)} className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 bg-white text-base" required>
                                    {COMPANY_SIZES.map(s => <option key={s} value={s}>{s}</option>)}
                                </select>
                            </div>
                        </div>

                        {/* Description */}
                        <div>
                            <label htmlFor="description" className="block text-base font-medium text-gray-700 mb-1">نبذة عن الشركة</label>
                            <textarea id="description" value={description} onChange={e => setDescription(e.target.value)} rows={6} className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 text-base" required placeholder="صف رؤية شركتك، ثقافتها، وما يميزها..."></textarea>
                        </div>

                        <button type="submit" className="w-full bg-indigo-600 text-white p-3 rounded-lg font-semibold hover:bg-indigo-700 transition text-lg">حفظ ومتابعة لنشر وظيفة</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default CompanyProfileSetup;
