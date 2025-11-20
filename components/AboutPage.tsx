import React from 'react';

const AboutPage: React.FC = () => {
  return (
    <div className="bg-white">
        <div className="container mx-auto px-6 py-20">
            <div className="text-center">
                <h1 className="text-4xl font-bold text-gray-800 mb-4">من نحن</h1>
                <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                    "أجي تخدم" هي منصة انطلقت بشغف لربط المواهب المغربية بأفضل الفرص الوظيفية. نؤمن بأن إيجاد الوظيفة المناسبة يمكن أن يغير حياة الإنسان، ونسعى جاهدين لتحقيق ذلك من خلال منصة سهلة الاستخدام وفعالة.
                </p>
            </div>
            
            <div className="mt-16 grid md:grid-cols-2 gap-12 items-center">
                <div>
                    <h2 className="text-3xl font-bold text-gray-800 mb-4">رؤيتنا</h2>
                    <p className="text-gray-700 leading-relaxed">
                         نطمح لأن نكون الوجهة الأولى والموثوقة للتوظيف في المغرب، حيث نساهم في تمكين الشباب وتقليص الفجوة بين الكفاءات ومتطلبات سوق الشغل، ودعم الشركات في العثور على أفضل المواهب لتحقيق النمو والنجاح.
                    </p>
                </div>
                 <div>
                    <h2 className="text-3xl font-bold text-gray-800 mb-4">رسالتنا</h2>
                    <p className="text-gray-700 leading-relaxed">
                        تتمثل رسالتنا في توفير بيئة تقنية مبتكرة تسهل عملية البحث عن عمل والتوظيف، من خلال تقديم أدوات ذكية ومصادر معرفية تدعم كل من الباحثين عن عمل والشركات في تحقيق أهدافهم المهنية والاقتصادية بكفاءة وشفافية.
                    </p>
                </div>
            </div>
        </div>
    </div>
  );
};

export default AboutPage;
