
import React from 'react';

const PrivacyPolicyPage: React.FC = () => {
  return (
    <div className="bg-white">
        <div className="container mx-auto px-6 py-20">
            <h1 className="text-4xl font-bold text-gray-800 mb-8 text-center">سياسة الخصوصية</h1>
            
            <div className="max-w-4xl mx-auto bg-gray-50 p-8 rounded-lg border border-gray-200 text-right space-y-6">
                <section>
                    <h2 className="text-2xl font-bold text-indigo-600 mb-3">1. مقدمة</h2>
                    <p className="text-gray-700 leading-relaxed">
                        نحن في "أجي تخدم" نولي أهمية قصوى لخصوصية زوارنا ومستخدمينا. توضح هذه السياسة كيفية جمعنا واستخدامنا وحمايتنا للمعلومات الشخصية التي تقدمها لنا عند استخدام موقعنا.
                    </p>
                </section>

                <section>
                    <h2 className="text-2xl font-bold text-indigo-600 mb-3">2. المعلومات التي نجمعها</h2>
                    <p className="text-gray-700 leading-relaxed mb-2">
                        قد نجمع الأنواع التالية من المعلومات:
                    </p>
                    <ul className="list-disc list-inside text-gray-700 space-y-1 mr-4">
                        <li>المعلومات الشخصية: مثل الاسم، البريد الإلكتروني، رقم الهاتف، والسيرة الذاتية التي تقدمها عند التسجيل.</li>
                        <li>معلومات الاستخدام: بيانات حول كيفية تفاعلك مع موقعنا، مثل الصفحات التي تزورها والوقت الذي تقضيه.</li>
                        <li>معلومات الجهاز: نوع الجهاز والمتصفح الذي تستخدمه للوصول إلى خدماتنا.</li>
                    </ul>
                </section>

                <section>
                    <h2 className="text-2xl font-bold text-indigo-600 mb-3">3. كيف نستخدم معلوماتك</h2>
                    <p className="text-gray-700 leading-relaxed">
                        نستخدم المعلومات التي نجمعها لتقديم خدماتنا وتحسينها، بما في ذلك:
                    </p>
                    <ul className="list-disc list-inside text-gray-700 space-y-1 mr-4 mt-2">
                        <li>ربط الباحثين عن عمل بأصحاب العمل المناسبين.</li>
                        <li>إرسال تنبيهات الوظائف والتحديثات المهمة.</li>
                        <li>تحسين تجربة المستخدم وأداء الموقع.</li>
                        <li>منع الاحتيال وضمان أمان المنصة.</li>
                    </ul>
                </section>

                <section>
                    <h2 className="text-2xl font-bold text-indigo-600 mb-3">4. مشاركة المعلومات</h2>
                    <p className="text-gray-700 leading-relaxed">
                        نحن لا نبيع معلوماتك الشخصية لأطراف ثالثة. قد نشارك معلوماتك فقط في الحالات التالية:
                    </p>
                     <ul className="list-disc list-inside text-gray-700 space-y-1 mr-4 mt-2">
                        <li>مع أصحاب العمل عندما تتقدم لوظيفة (بموافقتك).</li>
                        <li>للامتثال للقوانين واللوائح المعمول بها في المغرب.</li>
                    </ul>
                </section>

                <section>
                    <h2 className="text-2xl font-bold text-indigo-600 mb-3">5. أمن البيانات</h2>
                    <p className="text-gray-700 leading-relaxed">
                        نحن نتخذ تدابير أمنية تقنية وتنظيمية مناسبة لحماية معلوماتك من الوصول غير المصرح به أو التغيير أو الإفشاء أو الإتلاف.
                    </p>
                </section>

                <section>
                    <h2 className="text-2xl font-bold text-indigo-600 mb-3">6. اتصل بنا</h2>
                    <p className="text-gray-700 leading-relaxed">
                        إذا كان لديك أي أسئلة حول سياسة الخصوصية هذه، يرجى الاتصال بنا عبر صفحة "اتصل بنا" أو عبر البريد الإلكتروني: privacy@ajitkhdem.ma
                    </p>
                </section>
                
                <div className="pt-6 text-sm text-gray-500 border-t mt-6">
                    آخر تحديث: {new Date().toLocaleDateString('ar-MA')}
                </div>
            </div>
        </div>
    </div>
  );
};

export default PrivacyPolicyPage;
