import React from 'react';

const ContactPage: React.FC = () => {
  return (
    <div className="bg-gray-50">
        <div className="container mx-auto px-6 py-20 text-center">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">اتصل بنا</h1>
        <p className="text-lg text-gray-600 max-w-3xl mx-auto mb-10">
            نحن هنا للمساعدة! إذا كان لديك أي أسئلة أو اقتراحات، لا تتردد في التواصل معنا عبر القنوات التالية.
        </p>
        <div className="max-w-lg mx-auto bg-white p-8 rounded-lg shadow-md border text-right">
            <div className="mb-6">
                <h3 className="text-xl font-semibold text-gray-700 mb-2">البريد الإلكتروني</h3>
                <a href="mailto:contact@ajitkhdem.ma" className="text-indigo-600 hover:underline">contact@ajitkhdem.ma</a>
                <p className="text-sm text-gray-500 mt-1">للاستفسارات العامة والدعم الفني.</p>
            </div>
             <div className="mb-6">
                <h3 className="text-xl font-semibold text-gray-700 mb-2">الهاتف</h3>
                <p className="text-gray-800">+212 5 00 00 00 00</p>
                <p className="text-sm text-gray-500 mt-1">متواجدون من الإثنين إلى الجمعة، من 9 صباحًا حتى 5 مساءً.</p>
            </div>
             <div>
                <h3 className="text-xl font-semibold text-gray-700 mb-2">العنوان</h3>
                <p className="text-gray-800">123 شارع المستقبل، الدار البيضاء، المغرب</p>
            </div>
        </div>
        </div>
    </div>
  );
};

export default ContactPage;
