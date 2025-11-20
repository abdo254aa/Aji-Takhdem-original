import React from 'react';

const ServicesPage: React.FC = () => {
  return (
    <div className="bg-white">
        <div className="container mx-auto px-6 py-20 text-center">
            <h1 className="text-4xl font-bold text-gray-800 mb-4">خدماتنا</h1>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                نقدم في "أجي تخدم" مجموعة من الخدمات المصممة خصيصًا لدعم الباحثين عن عمل وأصحاب العمل في المغرب. هدفنا هو تسهيل عملية التوظيف وجعلها أكثر فعالية للجميع.
            </p>
            
            <div className="grid md:grid-cols-2 gap-8 mt-12 text-right">
                <div className="bg-gray-50 p-8 rounded-lg border">
                    <h2 className="text-2xl font-bold text-indigo-600 mb-3">للباحثين عن عمل</h2>
                    <ul className="list-disc list-inside space-y-2 text-gray-700">
                        <li>بناء سيرة ذاتية احترافية بسهولة.</li>
                        <li>توصيات وظائف ذكية بناءً على ملفك الشخصي.</li>
                        <li>تنبيهات فورية للوظائف الجديدة والمناسبة لك.</li>
                        <li>مقالات ومصادر لتطوير مسارك المهني.</li>
                    </ul>
                </div>
                 <div className="bg-gray-50 p-8 rounded-lg border">
                    <h2 className="text-2xl font-bold text-amber-600 mb-3">لأصحاب العمل</h2>
                    <ul className="list-disc list-inside space-y-2 text-gray-700">
                        <li>نشر إعلانات الوظائف والوصول لآلاف الكفاءات.</li>
                        <li>أدوات ذكية لفرز المترشحين وإدارة طلبات التوظيف.</li>
                        <li>إنشاء وصف وظيفي جذاب باستخدام الذكاء الاصطناعي.</li>
                        <li>باقات متنوعة تناسب احتياجات جميع الشركات.</li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
  );
};

export default ServicesPage;
