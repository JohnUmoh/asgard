const langToLocale = {
en: "en-GB",  fallback to Us English for en
fr: "fr-FR",
es: "es-ES",
ar: "ar-SA",
hi: "hi-IN",
zh: "zh-CN",
pt: "pt-PT",
ru: "ru-RU",
bn: "bn-BD",
pg: "en-NG",
};

const translations = {
en: {
built_for_Global: "Built for Global bold dreamers.",
not_just_app: "This isn’t just an app — it’s your digital lifeline.",
tag_punch: "Earn smarter. Heal deeper. Grow faster.",
greeting: "Welcome, Hope,\nLet’s grow today.",
heading: "Welcome to MVP LifeLine",
tagline: "Your digital hub to Earn. Heal. Grow.",
get_started: "Get Started",
description: "MVP LifeLine is built for Global bold dreamers. A powerful AI app to empower youth emotionally, financially, and professionally."
},
fr: {
built_for_Global: "Créé pour les rêveurs audacieux du monde.",
not_just_app: "Ce n’est pas juste une app — c’est ta bouée de sauvetage digitale.",
tag_punch: "Gagne intelligemment. Guéris profondément. Évolue rapidement.",
greeting: "Bienvenue, Hope,\nGrandissons aujourd’hui.",
heading: "Bienvenue sur MVP LifeLine",
tagline: "Ton hub numérique pour Gagner. Guérir. Grandir.",
get_started: "Commencer",
description: "MVP LifeLine est conçu pour les rêveurs audacieux du monde. Une app IA pour autonomiser émotionnellement, financièrement et professionnellement."
},
es: {
built_for_Global: "Hecho para soñadores audaces del mundo.",
not_just_app: "Esto no es solo una aplicación — es tu salvavidas digital.",
tag_punch: "Gana más. Sana profundo. Crece rápido.",
greeting: "Bienvenido, Hope,\nCrezcamos hoy.",
heading: "Bienvenido a MVP LifeLine",
tagline: "Tu centro digital para Ganar. Sanar. Crecer.",
get_started: "Comenzar",
description: "MVP LifeLine está hecho para soñadores audaces. Una potente app de IA para empoderarte emocional, financiera y profesionalmente."
},
ar: {
built_for_Global: "مصمم للحالمين الجريئين في العالم.",
not_just_app: "هذه ليست مجرد تطبيق — إنها شريان حياتك الرقمي.",
tag_punch: "اكسب بذكاء. اشفِ بعمق. نمُ بسرعة.",
greeting: "مرحبًا، Hope،\nلننمو اليوم.",
heading: "مرحبًا بك في MVP LifeLine",
tagline: "مركزك الرقمي للكسب. الشفاء. النمو.",
get_started: "ابدأ",
description: "تم تصميم MVP LifeLine للحالمين الجريئين حول العالم. تطبيق قوي بالذكاء الاصطناعي لتمكين الشباب عاطفيًا وماليًا ومهنيًا."
},
hi: {
built_for_Global: "दुनिया के साहसी सपनों वालों के लिए बनाया गया।",
not_just_app: "यह सिर्फ एक ऐप नहीं है — यह आपकी डिजिटल जीवनरेखा है।",
tag_punch: "स्मार्ट तरीके से कमाएं। गहराई से ठीक करें। तेजी से बढ़ें।",
greeting: "स्वागत है, Hope,\nआइए आज आगे बढ़ते हैं।",
heading: "MVP LifeLine में आपका स्वागत है",
tagline: "कमाने, चंगा करने और बढ़ने के लिए आपका डिजिटल हब।",
get_started: "शुरू करें",
description: "MVP LifeLine को वैश्विक साहसी सपने देखने वालों के लिए बनाया गया है। एक शक्तिशाली एआई ऐप जो युवाओं को भावनात्मक, वित्तीय और पेशेवर रूप से सशक्त बनाता है।"
},
zh: {
built_for_Global: "为全球大胆梦想者打造。",
not_just_app: "这不仅是一个应用程序——它是你的数字生命线。",
tag_punch: "更聪明地赚钱。更深入地疗愈。更快地成长。",
greeting: "欢迎你，Hope，\n今天让我们一起成长。",
heading: "欢迎来到 MVP LifeLine",
tagline: "你的数字中心：赚钱、疗愈、成长。",
get_started: "开始使用",
description: "MVP LifeLine 专为全球大胆的梦想者而建，是一个强大的 AI 应用，赋能青年情感、财务和职业发展。"
},
pt: {
built_for_Global: "Feito para sonhadores ousados do mundo.",
not_just_app: "Isto não é apenas um aplicativo — é sua linha de vida digital.",
tag_punch: "Ganhe com inteligência. Cure profundamente. Cresça rapidamente.",
greeting: "Bem-vindo, Hope,\nVamos crescer hoje.",
heading: "Bem-vindo ao MVP LifeLine",
tagline: "Seu hub digital para Ganhar. Curar. Crescer.",
get_started: "Começar",
description: "O MVP LifeLine foi criado para sonhadores ousados. Um app de IA poderoso para empoderar jovens emocional, financeira e profissionalmente."
},
ru: {
built_for_Global: "Создано для смелых мечтателей по всему миру.",
not_just_app: "Это не просто приложение — это твоя цифровая линия жизни.",
tag_punch: "Зарабатывай умнее. Исцеляйся глубже. Расти быстрее.",
greeting: "Добро пожаловать, Hope,\nДавай расти сегодня.",
heading: "Добро пожаловать в MVP LifeLine",
tagline: "Твой цифровой центр для заработка, исцеления и роста.",
get_started: "Начать",
description: "MVP LifeLine создан для смелых мечтателей. Мощное AI-приложение для эмоциональной, финансовой и профессиональной поддержки молодежи."
},
bn: {
built_for_Global: "বিশ্বজুড়ে সাহসী স্বপ্নদর্শীদের জন্য তৈরি।",
not_just_app: "এটি শুধু একটি অ্যাপ নয় — এটি আপনার ডিজিটাল জীবনরেখা।",
tag_punch: "বুদ্ধিমত্তার সাথে উপার্জন করুন। গভীরভাবে আরোগ্য লাভ করুন। দ্রুত বৃদ্ধি করুন।",
greeting: "স্বাগতম, Hope,\nচলুন আজ বড় হই।",
heading: "MVP LifeLine এ স্বাগতম",
tagline: "উপার্জন, আরোগ্য ও বৃদ্ধির জন্য আপনার ডিজিটাল হাব।",
get_started: "শুরু করুন",
description: "MVP LifeLine সাহসী স্বপ্নদর্শীদের জন্য তৈরি। একটি শক্তিশালী AI অ্যাপ যা তরুণদের আবেগগত, আর্থিক ও পেশাগতভাবে ক্ষমতায়ন করে।"
},
pg: {
built_for_Global: "Na for bold dreamers dem wey no dey fear.",
not_just_app: "No be just app — na your digital lifeline.",
tag_punch: "Make you sabi earn. Heal well. Grow sharp sharp.",
greeting: "Wetin dey Hope,\nMake we grow today.",
heading: "Welcome to MVP LifeLine",
tagline: "Your digital hub to Earn. Heal. Grow.",
get_started: "Make We Start",
description: "MVP LifeLine na beta AI app for dreamers wey wan hammer, heal and grow. E go support you for mind, pocket and hustle levels."
}
};

