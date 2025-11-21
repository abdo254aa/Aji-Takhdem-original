import React, { useEffect } from 'react';

interface ToastProps {
  message: string;
  type: 'success' | 'error';
  onClose: () => void;
}

const SuccessIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
);

const ErrorIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
);

const CloseIcon: React.FC = () => (
    <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
        <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
    </svg>
);


const Toast: React.FC<ToastProps> = ({ message, type, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 5000); // Auto-close after 5 seconds

    return () => {
      clearTimeout(timer);
    };
  }, [onClose]);

  const themeClasses = {
    success: {
        bg: 'bg-green-50',
        border: 'border-green-200',
        icon: <SuccessIcon />,
    },
    error: {
        bg: 'bg-red-50',
        border: 'border-red-200',
        icon: <ErrorIcon />,
    }
  };

  const currentTheme = themeClasses[type];

  return (
    <div className="fixed top-5 right-1/2 translate-x-1/2 z-[100] w-[calc(100%-2rem)] max-w-md animate-fade-in-down">
      <div className={`p-4 rounded-lg shadow-lg border ${currentTheme.bg} ${currentTheme.border} flex items-start`}>
        <div className="flex-shrink-0">
          {currentTheme.icon}
        </div>
        <div className="mr-3 flex-1">
          <p className="text-sm font-medium text-gray-800">{message}</p>
        </div>
        <div className="ml-auto pl-3">
          <div className="-mx-1.5 -my-1.5">
            <button
              type="button"
              onClick={onClose}
              className="inline-flex rounded-md p-1.5 text-gray-400 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-green-50 focus:ring-green-600"
            >
              <span className="sr-only">إغلاق</span>
              <CloseIcon />
            </button>
          </div>
        </div>
      </div>
       <style>{`
          @keyframes fade-in-down {
              0% {
                  opacity: 0;
                  transform: translate(50%, -20px);
              }
              100% {
                  opacity: 1;
                  transform: translate(50%, 0);
              }
          }
          .animate-fade-in-down {
              animation: fade-in-down 0.5s ease-out forwards;
          }
      `}</style>
    </div>
  );
};

export default Toast;