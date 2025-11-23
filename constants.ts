

import type { City, Job, Conversation, CompanyProfile, UserProfile, MockUser, MockGoogleAccount, ConcoursArticle } from './types';

export const MOROCCAN_CITIES: City[] = [
  "الدار البيضاء",
  "الرباط",
  "فاس",
  "مراكش",
  "أكادير",
  "طنجة",
  "مكناس",
  "وجدة",
  "القنيطرة",
  "تطوان",
  "العيون",
  "المحمدية",
  "الجديدة",
  "خريبكة",
  "بني ملال",
  "الناظور",
  "تازة",
  "سطات",
];

export const MOCK_COMPANY_PROFILES: CompanyProfile[] = [
    {
        id: 1,
        name: "شركة تكنولوجيا المغرب",
        logo: 'https://picsum.photos/seed/techmorocco/200/200',
        website: "https://techmorocco.ma",
        city: "الدار البيضاء",
        industry: "تكنولوجيا المعلومات",
        size: "51-200 موظف",
        description: "شركة رائدة في مجال تطوير البرمجيات وحلول الويب في المغرب. نحن نؤمن بالابتكار ونسعى لتقديم أفضل الحلول لعملائنا.",
    },
    {
        id: 2,
        name: "وكالة إبداع",
        logo: 'https://picsum.photos/seed/ebdaa/200/200',
        website: "https://ebdaa.agency",
        city: "الرباط",
        industry: "التسويق والإعلان",
        size: "11-50 موظف",
        description: "وكالة متخصصة في التسويق الرقمي وإنشاء المحتوى الإبداعي. نساعد العلامات التجارية على النمو والوصول إلى جمهورها المستهدف.",
    },
    {
        id: 3,
        name: "حلول تقنية متقدمة",
        logo: '',
        website: "https://advanced-solutions.ma",
        city: "الدار البيضاء",
        industry: "تكنولوجيا المعلومات",
        size: "51-200 موظف",
        description: "نقدم حلولاً تقنية متكاملة للشركات من جميع الأحجام، مع التركيز على تطوير تطبيقات الهاتف المحمول والأنظمة السحابية.",
    },
];

export const MOCK_USER_PROFILES: UserProfile[] = [
    {
        id: 1,
        name: 'أحمد العلوي',
        profilePicture: 'https://picsum.photos/seed/ahmed/100/100',
        residentCity: 'الرباط',
        education: 'إجازة مهنية',
        experienceLevel: '3-5 سنوات',
        workHistory: [],
        cities: ['الرباط', 'الدار البيضاء'],
        languages: ['العربية', 'الفرنسية'],
        skills: ['التسويق الرقمي', 'إدارة وسائل التواصل الاجتماعي', 'تحسين محركات البحث (SEO)'],
    },
    {
        id: 2,
        name: 'فاطمة الزهراء',
        profilePicture: 'https://picsum.photos/seed/fatima/100/100',
        residentCity: 'مراكش',
        education: 'ماستر',
        experienceLevel: '5+ سنوات',
        workHistory: [],
        cities: [],
        languages: ['العربية', 'الفرنسية', 'الإنجليزية'],
        skills: ['إدارة المشاريع', 'Agile', 'Scrum', 'Jira'],
    },
    {
        id: 3,
        name: 'يوسف كريمي',
        profilePicture: 'https://picsum.photos/seed/youssef/100/100',
        residentCity: 'طنجة',
        education: 'شهادة تقني متخصص',
        experienceLevel: '1-3 سنوات',
        workHistory: [],
        cities: ['طنجة'],
        languages: ['العربية'],
        skills: ['تصميم الجرافيك', 'Adobe Photoshop', 'Adobe Illustrator'],
    }
];

export const MOCK_USERS: MockUser[] = [
    { email: 'google-seeker@test.com', password: 'password123', role: 'jobSeeker', profileId: 1 },
    { email: 'google-company@test.com', password: 'password123', role: 'employer', profileId: 2 },
    { email: 'new@seeker.com', password: 'password123', role: 'jobSeeker', profileId: null },
    // ADMIN USER
    { email: 'admin@ajitkhdem.ma', password: 'admin123', role: 'admin', profileId: null },
];

export const MOCK_GOOGLE_ACCOUNTS: MockGoogleAccount[] = [
    { name: 'أحمد العلوي', email: 'google-seeker@test.com', avatarUrl: 'https://picsum.photos/seed/ahmed/100/100' },
    { name: 'نورة حمدي', email: 'new.user@gmail.com', avatarUrl: 'https://picsum.photos/seed/noura/100/100' },
];

export const INITIAL_JOBS: Job[] = [
    {
        id: 1,
        companyId: 1,
        title: "مطور الواجهة الأمامية (Frontend)",
        company: "شركة تكنولوجيا المغرب",
        city: "الدار البيضاء",
        description: "نبحث عن مطور واجهة أمامية محترف للانضمام إلى فريقنا. يجب أن يكون لديك خبرة في React و TypeScript.",
        postedDate: "2024-07-28",
        experience: "3-5 سنوات",
        educationLevel: "بكالوريوس",
        languages: ["الفرنسية", "الإنجليزية"],
        phoneNumber: "+212612345678",
    },
    {
        id: 2,
        companyId: 2,
        title: "مسؤول تسويق رقمي",
        company: "وكالة إبداع",
        city: "الرباط",
        description: "فرصة لمسؤول تسويق رقمي لإدارة حملاتنا على وسائل التواصل الاجتماعي وتحسين محركات البحث.",
        postedDate: "2024-07-27",
        experience: "1-3 سنوات",
        languages: ["العربية"],
        phoneNumber: "+212687654321",
    },
    {
        id: 3,
        companyId: 3,
        title: "مهندس برمجيات (Backend)",
        company: "حلول تقنية متقدمة",
        city: "الدار البيضاء",
        description: "مطلوب مهندس برمجيات متخصص في Node.js و MongoDB لتطوير وصيانة خدماتنا الخلفية.",
        postedDate: "2024-07-26",
        experience: "5+ سنوات",
        educationLevel: "ماجستير",
        languages: ["الإنجليزية"],
    },
    {
        id: 4,
        companyId: 2,
        title: "مصمم جرافيك",
        company: "وكالة إبداع",
        city: "مراكش",
        description: "نحن نبحث عن مصمم جرافيك مبدع لإنشاء تصاميم بصرية مذهلة لمشاريع متنوعة.",
        postedDate: "2024-07-25",
        educationLevel: "دبلوم",
    },
    {
        id: 5,
        companyId: 1,
        title: "مدير مشروع",
        company: "شركة تكنولوجيا المغرب",
        city: "طنجة",
        description: "مطلوب مدير مشروع ذو خبرة للإشراف على مشاريع البناء وضمان تسليمها في الوقت المحدد.",
        postedDate: "2024-07-24",
        experience: "5+ سنوات",
    },
];

// Helper to get current date parts
const now = new Date();
const currentYear = now.getFullYear();
const currentMonth = String(now.getMonth() + 1).padStart(2, '0'); // 01 to 12
const d = (day: number) => `${currentYear}-${currentMonth}-${String(day).padStart(2, '0')}`;

export const MOCK_CONCOURS: ConcoursArticle[] = [
    {
        id: 1,
        title: "مباراة توظيف 100 متصرف من الدرجة الثانية بوزارة الاقتصاد والمالية",
        department: "وزارة الاقتصاد والمالية",
        deadline: d(28),
        publishDate: d(15),
        content: `تعلن وزارة الاقتصاد والمالية عن تنظيم مباراة لتوظيف 100 متصرف من الدرجة الثانية. تفتح المباراة في وجه المترشحين الحاصلين على دبلوم الدراسات العليا المعمقة أو دبلوم الدراسات العليا المتخصصة أو الماستر أو الماستر المتخصص.`,
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/18/Emblem_of_Morocco.svg/800px-Emblem_of_Morocco.svg.png"
    },
    {
        id: 2,
        title: "مباراة التعليم بالتعاقد: الشروط والآجال الجديدة",
        department: "وزارة التربية الوطنية",
        deadline: d(30),
        publishDate: d(14),
        content: `استعداداً للموسم الدراسي المقبل، تعلن الأكاديميات الجهوية للتربية والتكوين عن فتح باب الترشيح لمباريات توظيف الأطر النظامية للأكاديميات.`,
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/18/Emblem_of_Morocco.svg/800px-Emblem_of_Morocco.svg.png"
    },
    {
        id: 3,
        title: "مباراة الأمن الوطني: توظيف حراس أمن ومفتشي شرطة",
        department: "المديرية العامة للأمن الوطني",
        deadline: d(25),
        publishDate: d(12),
        content: `تنظم المديرية العامة للأمن الوطني مباراة لتوظيف حراس الأمن ومفتشي الشرطة وضباط الشرطة وضباط الأمن وعمداء الشرطة.`,
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/18/Emblem_of_Morocco.svg/800px-Emblem_of_Morocco.svg.png"
    },
    {
        id: 4,
        title: "مباراة ضخمة لوزارة الصحة والحماية الاجتماعية لتوظيف 500 ممرض وتقني صحة",
        department: "وزارة الصحة",
        deadline: d(29),
        publishDate: d(10),
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/18/Emblem_of_Morocco.svg/800px-Emblem_of_Morocco.svg.png",
        content: `
تعلن وزارة الصحة والحماية الاجتماعية عن تنظيم مباراة لتوظيف 500 ممرض وتقني صحة من الدرجة الأولى.

**أولاً: شروط الترشيح**
تفتح المباراة في وجه المترشحين من جنسية مغربية، البالغين من العمر 18 سنة على الأقل و45 سنة على الأكثر في فاتح يناير من السنة الجارية، والحاصلين على دبلوم الإجازة في المسالك العلمية والتقنية أو ما يعادلها.

**ثانياً: التخصصات المطلوبة**
1. التمريض متعدد التخصصات: 200 منصب.
2. التخدير والإنعاش: 100 منصب.
3. الصحة النفسية والعقلية: 50 منصب.
4. تقنيات المختبر: 50 منصب.
5. تقنيات الأشعة: 50 منصب.
6. القبالة: 50 منصب.

**ثالثاً: ملف الترشيح**
يتكون ملف الترشيح من الوثائق التالية:
- طلب خطي يبين فيه المترشح الاسم العائلي والشخصي والعنوان ورقم الهاتف والتخصص المطلوب.
- نسخة مشهود بمطابقتها لأصل الدبلوم في التخصص المطلوب.
- نسخة مشهود بمطابقتها لأصل بطاقة التعريف الوطنية.
- 3 أظرف متنبرة تحمل اسم وعنوان المترشح.
- سيرة ذاتية (CV) مفصلة.

**رابعاً: مواد المباراة**
تشتمل المباراة على اختبارين كتابيين واختبار شفوي:
1. **اختبار عام:** يتعلق بقطاع الصحة والحماية الاجتماعية (المدة: 3 ساعات، المعامل: 3).
2. **اختبار تخصص:** يتعلق بالتخصص المطلوب (المدة: 3 ساعات، المعامل: 4).
3. **اختبار شفوي:** تناقش فيه لجنة المباراة مع المترشح مواضيع مختلفة (المدة: 20 دقيقة، المعامل: 3).

**خامساً: إيداع الملفات**
يجب أن تصل ملفات الترشيح إلى المديريات الجهوية للصحة قبل تاريخ ${d(29)}، ولن يؤخذ بعين الاعتبار أي ملف يصل بعد هذا الأجل.

**ملاحظات هامة:**
- يعتبر لاغياً كل ملف ترشيح تنقصه وثيقة من الوثائق المذكورة.
- سيتم نشر لوائح المترشحين المقبولين لاجتياز الاختبار الكتابي على الموقع الإلكتروني للوزارة.
- الحضور إلى مركز الامتحان يكون مصحوباً ببطاقة التعريف الوطنية.

نتمنى التوفيق لجميع المترشحين والمترشحات في هذه المباراة المهمة التي تهدف إلى تعزيز الموارد البشرية بقطاع الصحة.
        `
    },
    {
        id: 5,
        title: "مباراة توظيف 50 تقني من الدرجة الثالثة بجماعة الدار البيضاء",
        department: "جماعة الدار البيضاء",
        deadline: d(22),
        publishDate: d(8),
        content: "تعلن جماعة الدار البيضاء عن تنظيم مباراة لتوظيف تقنيين من الدرجة الثالثة في تخصصي الهندسة المدنية والمعلوميات.",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/18/Emblem_of_Morocco.svg/800px-Emblem_of_Morocco.svg.png"
    },
    {
        id: 6,
        title: "المكتب الوطني للسكك الحديدية (ONCF): توظيف 40 سائق قطار",
        department: "ONCF",
        deadline: d(20),
        publishDate: d(7),
        content: "ينظم المكتب الوطني للسكك الحديدية مباراة لتوظيف سائقي قطارات. الشروط: دبلوم تقني متخصص، السن أقل من 30 سنة.",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/18/Emblem_of_Morocco.svg/800px-Emblem_of_Morocco.svg.png"
    },
    {
        id: 7,
        title: "مباراة القياد 2024: وزارة الداخلية تفتح باب الترشيح",
        department: "وزارة الداخلية",
        deadline: d(18),
        publishDate: d(6),
        content: "وزارة الداخلية تعلن عن مباراة ولوج السلك العادي للمعهد الملكي للإدارة الترابية (قياد).",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/18/Emblem_of_Morocco.svg/800px-Emblem_of_Morocco.svg.png"
    },
    {
        id: 8,
        title: "الصندوق الوطني للضمان الاجتماعي: توظيف 150 إطار",
        department: "CNSS",
        deadline: d(15),
        publishDate: d(5),
        content: "CNSS يعلن عن حملة توظيف واسعة تهم 150 منصباً في مختلف التخصصات المالية والقانونية.",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/18/Emblem_of_Morocco.svg/800px-Emblem_of_Morocco.svg.png"
    },
    {
        id: 9,
        title: "وكالة التنمية الرقمية: توظيف مهندسي دولة",
        department: "وكالة التنمية الرقمية",
        deadline: d(12),
        publishDate: d(4),
        content: "مباراة لتوظيف 10 مهندسي دولة في تخصصات الذكاء الاصطناعي والأمن السيبراني.",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/18/Emblem_of_Morocco.svg/800px-Emblem_of_Morocco.svg.png"
    },
    {
        id: 10,
        title: "وزارة العدل: مباراة الملحقين القضائيين",
        department: "وزارة العدل",
        deadline: d(10),
        publishDate: d(3),
        content: "تعلن وزارة العدل عن تنظيم مباراة لتوظيف 250 ملحقاً قضائياً.",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/18/Emblem_of_Morocco.svg/800px-Emblem_of_Morocco.svg.png"
    },
    {
        id: 11,
        title: "المجمع الشريف للفوسفاط OCP: حملة توظيف",
        department: "OCP Group",
        deadline: d(9),
        publishDate: d(2),
        content: "مجموعة OCP تطلق حملة لتوظيف مهندسين وتقنيين في المواقع الصناعية.",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/18/Emblem_of_Morocco.svg/800px-Emblem_of_Morocco.svg.png"
    },
    {
        id: 12,
        title: "بريد المغرب: توظيف سعاة بريد وموزعين",
        department: "بريد المغرب",
        deadline: d(5),
        publishDate: d(1),
        content: "بريد المغرب ينظم مباراة لتوظيف 80 ساعي بريد على الصعيد الوطني.",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/18/Emblem_of_Morocco.svg/800px-Emblem_of_Morocco.svg.png"
    }
];

export const EDUCATION_LEVELS = [
    "بدون مستوى دراسي",
    "مستوى إعدادي",
    "شهادة باكالوريا",
    "باكالوريا + سنة (Bac +1)",
    "باكالوريا + سنتان (Bac +2)",
    "باكالوريا + ثلاث سنوات (Bac +3)",
    "باكالوريا + أربع سنوات (Bac +4)",
    "باكالوريا + خمس سنوات (Bac +5)",
    "شهادة تقني",
    "شهادة تقني متخصص",
    "شهادة DUT",
    "شهادة BTS",
    "شهادة DEUG",
    "إجازة جامعية",
    "إجازة مهنية",
    "ماستر",
    "دكتوراه"
];

export const EXPERIENCE_LEVELS = ["لا يشترط", "أقل من سنة", "1-3 سنوات", "3-5 سنوات", "5+ سنوات"];

export const LANGUAGES = ["العربية", "الفرنسية", "الإنجليزية"];

export const COMPANY_SIZES = [
    "1-10 موظفين",
    "11-50 موظف",
    "51-200 موظف",
    "201-500 موظف",
    "501+ موظف"
];

export const MOCK_FULL_CONVERSATIONS: Conversation[] = [
    { 
        id: 2, 
        participantId: 1,
        participantType: 'company',
        name: 'شركة تكنولوجيا المغرب', 
        avatarChar: 'ش', 
        avatarUrl: 'https://picsum.photos/seed/techmorocco/100/100',
        onlineStatus: 'online',
        lastReadMessageId: 3,
        unread: 1,
        messages: [
            { id: 1, text: 'مرحباً، لقد قدمت على وظيفة مطور الواجهة الأمامية.', sender: 'me', timestamp: '10:30ص' },
            { id: 2, text: 'مرحباً، شكراً لاهتمامك بالوظيفة. هل يمكنك إرسال نماذج من أعمالك؟', sender: 'other', timestamp: '10:32ص' },
            { id: 3, text: 'بالتأكيد، سأرسلها حالاً.', sender: 'me', timestamp: '10:33ص' },
            { id: 4, text: 'تم استلامها، تبدو رائعة. متى تكون متاحاً لإجراء مقابلة قصيرة؟', sender: 'other', timestamp: '10:45ص' },
        ] 
    },
    { 
        id: 1, 
        participantId: 1,
        participantType: 'user',
        name: 'أحمد العلوي', 
        avatarChar: 'أ', 
        avatarUrl: 'https://picsum.photos/seed/ahmed/100/100',
        onlineStatus: 'offline',
        lastReadMessageId: 1,
        unread: 2,
        messages: [
            { id: 1, text: 'مرحباً أحمد، هل ما زلت مهتماً بالعمل في مجال التسويق؟', sender: 'other', timestamp: '9:15ص' },
            { id: 2, text: 'نعم بالتأكيد، أبحث حالياً عن فرصة جديدة.', sender: 'me', timestamp: '9:16ص' },
            { id: 3, text: 'ممتاز، لدينا وظيفة شاغرة قد تهمك في شركتنا.', sender: 'other', timestamp: '9:18ص' },
            { id: 4, text: 'بالتأكيد، سأرسل لك السيرة الذاتية المحدثة.', sender: 'other', timestamp: '9:20ص' },
        ]
    },
    { 
        id: 3, 
        participantId: 2,
        participantType: 'user',
        name: 'فاطمة الزهراء', 
        avatarChar: 'ف', 
        avatarUrl: 'https://picsum.photos/seed/fatima/100/100',
        onlineStatus: 'offline',
        lastReadMessageId: 3,
        unread: 0,
        messages: [
            { id: 1, text: 'شكراً جزيلاً على وقتك اليوم.', sender: 'me', timestamp: 'أمس' },
            { id: 2, text: 'العفو، كانت مقابلة جيدة. سنتواصل معك قريباً.', sender: 'other', timestamp: 'أمس' },
            { id: 3, text: 'نعم، لقد أجريت المقابلة وكانت جيدة جداً.', sender: 'me', timestamp: '1س' },
        ] 
    },
    { 
        id: 4, 
        participantId: 2,
        participantType: 'company',
        name: 'وكالة إبداع', 
        avatarChar: 'و', 
        avatarUrl: 'https://picsum.photos/seed/ebdaa/100/100',
        onlineStatus: 'online',
        lastReadMessageId: 1,
        unread: 0,
        messages: [
            { id: 1, text: 'تم استلام طلبك، سنقوم بمراجعته قريباً.', sender: 'other', timestamp: '3س' },
        ]
    },
    { 
        id: 5, 
        participantId: 3,
        participantType: 'user',
        name: 'يوسف كريمي', 
        avatarChar: 'ي', 
        avatarUrl: 'https://picsum.photos/seed/youssef/100/100',
        onlineStatus: 'offline',
        unread: 0,
        messages: [
            { id: 1, text: 'هل لديك أي نصائح بخصوص المقابلة التقنية؟', sender: 'me', timestamp: 'أمس' },
        ]
    },
];

export const REPORT_REASONS = [
    "إعلان احتيالي أو مشبوه",
    "معلومات الوظيفة غير صحيحة أو مضللة",
    "إعلان مكرر",
    "تمييزي أو غير لائق",
    "الشركة تطلب رسومًا",
    "سبب آخر"
];
