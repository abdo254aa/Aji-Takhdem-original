import React, { useState, useEffect } from 'react';
import type { Filters } from '../types';
import { EDUCATION_LEVELS, LANGUAGES } from '../constants';

interface FilterModalProps {
  isOpen: boolean;
  onClose: () => void;
  onApply: (filters: Filters) => void;
  currentFilters: Filters;
}

const FilterModal: React.FC<FilterModalProps> = ({ isOpen, onClose, onApply, currentFilters }) => {
  const [selectedEducation, setSelectedEducation] = useState<string[]>(currentFilters.education);
  const [selectedLanguages, setSelectedLanguages] = useState<string[]>(currentFilters.languages);

  useEffect(() => {
    setSelectedEducation(currentFilters.education);
    setSelectedLanguages(currentFilters.languages);
  }, [currentFilters, isOpen]);

  if (!isOpen) return null;

  const handleCheckboxChange = (
    value: string, 
    list: string[], 
    setter: React.Dispatch<React.SetStateAction<string[]>>
  ) => {
    if (list.includes(value)) {
      setter(list.filter(item => item !== value));
    } else {
      setter([...list, value]);
    }
  };

  const handleApply = () => {
    onApply({
      education: selectedEducation,
      languages: selectedLanguages,
    });
  };

  const handleClear = () => {
    setSelectedEducation([]);
    setSelectedLanguages([]);
    onApply({ education: [], languages: [] });
  };
  
  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 p-4"
      onClick={onClose}
      aria-modal="true"
      role="dialog"
    >
      <div
        className="bg-white rounded-lg shadow-xl w-full max-w-lg max-h-[90vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-5 border-b flex justify-between items-center">
          <h2 className="text-xl font-bold text-gray-800">تصفية النتائج</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 text-2xl" aria-label="إغلاق">&times;</button>
        </div>

        <div className="p-6 overflow-y-auto space-y-6">
          <div>
            <h3 className="text-lg font-semibold text-gray-700 mb-3">المستوى الدراسي</h3>
            <div className="space-y-2">
              {EDUCATION_LEVELS.map(level => (
                <label key={level} className="flex items-center space-x-reverse space-x-3 cursor-pointer">
                  <input
                    type="checkbox"
                    className="h-5 w-5 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                    checked={selectedEducation.includes(level)}
                    onChange={() => handleCheckboxChange(level, selectedEducation, setSelectedEducation)}
                  />
                  <span className="text-gray-700">{level}</span>
                </label>
              ))}
            </div>
          </div>
           <div>
            <h3 className="text-lg font-semibold text-gray-700 mb-3">اللغات</h3>
            <div className="space-y-2">
              {LANGUAGES.map(lang => (
                <label key={lang} className="flex items-center space-x-reverse space-x-3 cursor-pointer">
                  <input
                    type="checkbox"
                    className="h-5 w-5 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                    checked={selectedLanguages.includes(lang)}
                    onChange={() => handleCheckboxChange(lang, selectedLanguages, setSelectedLanguages)}
                  />
                  <span className="text-gray-700">{lang}</span>
                </label>
              ))}
            </div>
          </div>
        </div>

        <div className="p-5 bg-gray-50 border-t flex justify-between items-center rounded-b-lg">
          <button
            onClick={handleClear}
            className="text-indigo-600 font-semibold hover:underline"
          >
            مسح الكل
          </button>
          <button
            onClick={handleApply}
            className="bg-indigo-600 text-white px-6 py-2 rounded-md hover:bg-indigo-700 transition"
          >
            تطبيق الفلاتر
          </button>
        </div>
      </div>
    </div>
  );
};

export default FilterModal;