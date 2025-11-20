import React, { useState, useEffect } from 'react';
import type { Job } from '../types';
import { REPORT_REASONS } from '../constants';

interface ReportModalProps {
  job: Job | null;
  onClose: () => void;
  onSubmit: (reportData: { reason: string; details?: string; blockCompany: boolean; }) => void;
}

const SuccessIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-green-500 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
);


const ReportModal: React.FC<ReportModalProps> = ({ job, onClose, onSubmit }) => {
    const [step, setStep] = useState<'reason' | 'block_confirm'>('reason');
    const [reason, setReason] = useState('');
    const [details, setDetails] = useState('');
    const [error, setError] = useState('');

    useEffect(() => {
        if (job) {
            setStep('reason');
            setReason('');
            setDetails('');
            setError('');
        }
    }, [job]);

    if (!job) return null;

    const handleReportSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!reason) {
            setError('الرجاء اختيار سبب للإبلاغ.');
            return;
        }
        if (reason === 'سبب آخر' && !details.trim()) {
            setError('الرجاء تقديم تفاصيل إضافية.');
            return;
        }
        setError('');
        setStep('block_confirm');
    };

    const handleBlockDecision = (block: boolean) => {
        onSubmit({
            reason,
            details: reason === 'سبب آخر' ? details : undefined,
            blockCompany: block,
        });
    };

    return (
        <div
            className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-start sm:items-center z-50 p-4 pt-10 sm:p-4"
            onClick={onClose}
            aria-modal="true"
            role="dialog"
        >
            <div
                className="bg-white rounded-lg shadow-xl w-full max-w-lg max-h-[calc(100vh-5rem)] sm:max-h-[calc(100vh-8rem)] flex flex-col"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="p-5 border-b flex justify-between items-center">
                    <h2 className="text-xl font-bold text-gray-800">
                        {step === 'reason' ? 'الإبلاغ عن إعلان' : 'تأكيد الإجراء'}
                    </h2>
                    <button onClick={onClose} className="text-gray-400 hover:text-gray-600 text-2xl" aria-label="إغلاق">&times;</button>
                </div>

                {step === 'reason' ? (
                    <form onSubmit={handleReportSubmit} className="flex flex-col flex-grow">
                        <div className="p-6 overflow-y-auto space-y-6">
                            <div className="bg-gray-50 p-4 rounded-md border">
                                <p className="text-sm text-gray-500">أنت تبلغ عن الوظيفة التالية:</p>
                                <p className="font-bold text-gray-800">{job.title}</p>
                                <p className="text-sm text-gray-600">من شركة: {job.company}</p>
                            </div>
                            
                            {error && <p className="bg-red-100 text-red-700 p-3 rounded-md text-center text-sm">{error}</p>}

                            <div>
                                <h3 className="text-lg font-semibold text-gray-700 mb-3">ما هو سبب بلاغك؟</h3>
                                <div className="space-y-2">
                                    {REPORT_REASONS.map(r => (
                                        <label key={r} className="flex items-center space-x-reverse space-x-3 cursor-pointer">
                                            <input
                                                type="radio"
                                                name="report-reason"
                                                value={r}
                                                className="h-5 w-5 text-indigo-600 focus:ring-indigo-500"
                                                checked={reason === r}
                                                onChange={() => setReason(r)}
                                            />
                                            <span className="text-gray-700">{r}</span>
                                        </label>
                                    ))}
                                </div>
                            </div>

                            {reason === 'سبب آخر' && (
                                <div>
                                    <label htmlFor="details" className="block text-base font-medium text-gray-700 mb-1">تفاصيل إضافية</label>
                                    <textarea 
                                        id="details" 
                                        value={details} 
                                        onChange={e => setDetails(e.target.value)} 
                                        rows={3} 
                                        className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 text-base"
                                        placeholder="يرجى توضيح سبب بلاغك هنا..."
                                    />
                                </div>
                            )}
                        </div>
                        <div className="p-5 bg-gray-50 border-t mt-auto">
                            <button type="submit" className="w-full bg-red-600 text-white p-3 rounded-lg font-semibold hover:bg-red-700 transition">
                                متابعة
                            </button>
                        </div>
                    </form>
                ) : (
                    <div className="p-6 text-center">
                         <h3 className="text-lg font-semibold text-gray-700 mb-4">
                            هل ترغب أيضًا في حظر جميع الوظائف المستقبلية من شركة "{job.company}"؟
                         </h3>
                         <p className="text-sm text-gray-500 mb-6">
                            لن ترى أي إعلانات من هذه الشركة مرة أخرى. يمكنك دائمًا تغيير هذا الإعداد لاحقًا من ملفك الشخصي.
                         </p>
                         <div className="flex justify-center gap-4">
                            <button 
                                onClick={() => handleBlockDecision(false)}
                                className="px-6 py-2 rounded-md bg-gray-200 text-gray-800 hover:bg-gray-300 transition font-semibold"
                            >
                                لا، فقط أبلغ
                            </button>
                             <button
                                onClick={() => handleBlockDecision(true)}
                                className="px-6 py-2 rounded-md bg-red-600 text-white hover:bg-red-700 transition font-semibold"
                             >
                                نعم، أبلغ وقم بالحظر
                             </button>
                         </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ReportModal;