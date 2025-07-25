// MVP LifeLine AI – All-Zones Frontend Helper with i18n

document.addEventListener("DOMContentLoaded", () => {
const offlineMode = false;

const languageSelect = document.getElementById("language");
const micBtn = document.getElementById("mic-button");
const speechText = document.getElementById("speech-text");
const themeToggle = document.getElementById("theme-toggle");
const moduleCards = document.querySelectorAll(".card");

// 🌍 i18n Translations
en: {
greeting: "Welcome, Hope,<br><span>Let’s grow today.</span>",
heading: "Welcome to MVP LifeLine",
tagline: "Your digital hub to Earn. Heal. Grow.",
get_started: "Get Started",
description: "MVP LifeLine is built for Global bold dreamers. A powerful AI app to empower youth emotionally, financially, and professionally."
},
fr: {
greeting: "Bienvenue, Hope,<br><span>Faisons des progrès aujourd’hui.</span>",
heading: "Bienvenue à MVP LifeLine",
tagline: "Votre hub numérique pour Gagner. Guérir. Grandir.",
get_started: "Commencer",
description: "MVP LifeLine est conçu pour les rêveurs audacieux du monde..."
},
es: {
greeting: "Bienvenido, Hope,<br><span>Crecemos hoy.</span>",
heading: "Bienvenido a MVP LifeLine",
tagline: "Tu centro digital para Ganar. Sanar. Crecer.",
get_started: "Comenzar",
description: "MVP LifeLine está hecho para los soñadores audaces del mundo..."
},
ar: {
greeting: "مرحبًا، Hope،<br><span>لنتقدم اليوم.</span>",
heading: "مرحبًا بك في MVP LifeLine",
tagline: "منصتك الرقمية للكسب. الشفاء. النمو.",
get_started: "ابدأ",
description: "تم إنشاء MVP LifeLine للحالمين الجريئين عالميًا..."
},
hi: {
greeting: "स्वागत है, Hope,<br><span>आज आगे बढ़ते हैं।</span>",
heading: "MVP LifeLine में आपका स्वागत है",
tagline: "कमाने, ठीक होने और बढ़ने के लिए आपका डिजिटल केंद्र।",
get_started: "शुरू करें",
description: "MVP LifeLine वैश्विक साहसी सपने देखने वालों के लिए..."
},
zh: {
greeting: "欢迎, Hope,<br><span>让我们今天成长。</span>",
heading: "欢迎来到 MVP LifeLine",
tagline: "您的数字枢纽：赚钱、疗愈、成长。",
get_started: "开始",
description: "MVP LifeLine 是为全球有梦想的年轻人打造的..."
},
pt: {
greeting: "Bem-vindo, Hope,<br><span>Vamos crescer hoje.</span>",
heading: "Bem-vindo ao MVP LifeLine",
tagline: "Seu centro digital para Ganhar. Curar. Crescer.",
get_started: "Começar",
description: "O MVP LifeLine é feito para os sonhadores ousados..."
},
ru: {
greeting: "Добро пожаловать, Hope,<br><span>Давайте развиваться сегодня.</span>",
heading: "Добро пожаловать в MVP LifeLine",
tagline: "Ваш цифровой центр: Зарабатывать. Исцеляться. Расти.",
get_started: "Начать",
description: "MVP LifeLine создан для смелых мечтателей мира..."
},
bn: {
greeting: "স্বাগতম, Hope,<br><span>আসুন আজ এগিয়ে যাই।</span>",
heading: "স্বাগতম MVP LifeLine-এ",
tagline: "আপনার ডিজিটাল কেন্দ্র উপার্জন, নিরাময় এবং বিকাশের জন্য।",
get_started: "শুরু করুন",
description: "MVP LifeLine বিশ্বব্যাপী সাহসী স্বপ্নদর্শীদের জন্য নির্মিত..."
},
pg: {
greeting: "You don show, Hope,<br><span>Make we move today.</span>",
heading: "Welcome to MVP LifeLine",
tagline: "Na your digital place to Earn. Heal. Grow.",
get_started: "Make we start",
description: "MVP LifeLine na for Global youth wey get dream..."
}
};

// 🗣️ Language Switcher
if (languageSelect) {
const savedLang = localStorage.getItem("lifeline-lang");
if (savedLang && translations[savedLang]) {
languageSelect.value = savedLang;
}

const updateLanguage = (lang) => {            
  const t = translations[lang] || translations.en;            
  document.querySelectorAll("[data-i18n]").forEach(el => {            
    const key = el.getAttribute("data-i18n");            
    if (t[key]) {            
      if (key === "greeting") {            
        el.innerHTML = t[key];            
      } else {            
        el.textContent = t[key];            
      }            
    }            
  });            
  localStorage.setItem("lifeline-lang", lang);            
};            
        
updateLanguage(languageSelect.value);            
        
languageSelect.addEventListener("change", () => {            
  updateLanguage(languageSelect.value);            
});

}

// 🎨 Theme Toggle
const themes = ["red", "yellow", "blue", "white"];
let currentThemeIndex = 0;

if (themeToggle) {
const savedTheme = localStorage.getItem("lifeline-theme");
if (savedTheme && themes.includes(savedTheme)) {
document.body.classList.add(theme-${savedTheme});
currentThemeIndex = (themes.indexOf(savedTheme) + 1) % themes.length;
}

themeToggle.addEventListener("click", () => {            
  document.body.classList.remove(...themes.map(t => `theme-${t}`));            
  const nextTheme = themes[currentThemeIndex];            
  document.body.classList.add(`theme-${nextTheme}`);            
  localStorage.setItem("lifeline-theme", nextTheme);            
  currentThemeIndex = (currentThemeIndex + 1) % themes.length;            
});

}

// 🎤 Voice Recognition
if (micBtn) {
const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
if (!SR) {
micBtn.addEventListener("click", () => {
speechText.textContent = "❌ SpeechRecognition not supported.";
});
} else {
const recog = new SR();
recog.interimResults = false;

micBtn.addEventListener("click", () => {            
    const selectedLang = languageSelect?.value || "en";            
    recog.lang = selectedLang === "pg" ? "en-NG" : `${selectedLang}-NG`;            
    recog.start();            
  });            
        
  recog.onstart = () => {            
    speechText.textContent = "🎙️ Listening...";            
  };            
        
  recog.onerror = (e) => {            
    speechText.textContent = "❌ Error: " + e.error;            
  };            
        
  recog.onresult = (e) => {            
    const transcript = e.results[0][0].transcript;            
    speechText.textContent = transcript;            
    getGPTResponse({ zone: "smartq-access", prompt: transcript });            
  };            
}

}

// 🧭 Module Click Handler
moduleCards.forEach(card => {
card.addEventListener("click", (e) => {
const zone = card.dataset.zone || "smartq-access";
const title = card.querySelector("h3")?.innerText || zone;

if (offlineMode) {            
    e.preventDefault();            
    const prompt = `I clicked "${title}". Guide me on getting started.`;            
    getGPTResponse({ zone, prompt });            
  }            
});

});

// 🎤 Mic Scroll Visibility
window.addEventListener("scroll", () => {
if (!micBtn) return;
const visible = window.scrollY > 150;
micBtn.style.opacity = visible ? "1" : "0";
micBtn.style.pointerEvents = visible ? "auto" : "none";
});
});

// 🤖 GPT Response Handler
async function getGPTResponse({ zone, prompt }) {
const replyBox = document.getElementById("gpt-reply-box");
const replyText = document.getElementById("gpt-reply-text");

if (!replyBox || !replyText) return;

replyBox.style.display = "block";
replyText.textContent = "Thinking...";

try {
const res = await fetch("/.netlify/functions/gpt-handler", {
method: "POST",
headers: { "Content-Type": "application/json" },
body: JSON.stringify({ zone, prompt })
});

const data = await res.json();            
replyText.textContent = "🤖 " + (data.answer || "No response from GPT.");            
replyBox.scrollIntoView({ behavior: "smooth" });

} catch (err) {
replyText.textContent = "⚠️ GPT error: " + err.message;
}
}
const translations = {
en: {
welcome: "Welcome to MVP LifeLine",
tagline: "Your digital hub to Earn. Heal. Grow.",
get_started: "Get Started",
description: "MVP LifeLine is built for Global bold dreamers. A powerful AI app to empower youth emotionally, financially, and professionally.",
voice_input: "Voice Input: [Waiting for input...]",
career_zone: "📁 Career Zone",
career_desc: "Jobs, CVs, and Interview Prep.",
emotional_zone: "💔 Emotional Zone",
emotional_desc: "Track feelings and journaling.",
smartq: "🤖 SmartQ Access",
smartq_desc: "Ask anything to your AI guide.",
dual_mode: "🧠 Dual Mode AI",
dual_desc: "Switch between career/emotional help.",
hustle: "💼 Digital Hustle Hub",
hustle_desc: "Freelance and gig economy tools.",
partner: "🤝 Partner Zone",
partner_desc: "NGO, mentors and impact partners.",
productivity: "✅ Productivity Zone",
productivity_desc: "AI-powered Kanban and planner.",
wellness: "🧘 Wellness Zone",
wellness_desc: "Mental health & calming audio.",
finance: "💰 Finance Zone",
finance_desc: "Budgeting and savings advice.",
insight: "📊 Insight Zone",
insight_desc: "Track usage & analytics insights.",
sync: "🔄 Sync Zone",
sync_desc: "Manage your offline & online data.",
footer: "© 2025 MVP LifeLine AI App. Built by John Umoh.",
privacy: "Privacy",
help: "Help",
security: "Security",
language: "Language",
monetization: "Monetization",
onboarding: "Onboarding"
},
fr: {
welcome: "Bienvenue à MVP LifeLine",
tagline: "Votre hub numérique pour Gagner. Guérir. Progresser.",
get_started: "Commencer",
description: "MVP LifeLine est conçu pour les rêveurs audacieux du monde entier. Une application IA puissante pour autonomiser les jeunes sur les plans émotionnel, financier et professionnel.",
voice_input: "Entrée vocale : [En attente d'entrée...]",
career_zone: "📁 Zone Carrière",
career_desc: "Emplois, CVs, et préparation aux entretiens.",
emotional_zone: "💔 Zone Émotionnelle",
emotional_desc: "Suivre les sentiments et le journal.",
smartq: "🤖 Accès SmartQ",
smartq_desc: "Posez n'importe quelle question à votre guide IA.",
dual_mode: "🧠 Mode IA Double",
dual_desc: "Basculez entre l’aide carrière/émotionnelle.",
hustle: "💼 Pôle Gigs Numériques",
hustle_desc: "Freelance et outils d'économie de petits boulots.",
partner: "🤝 Zone Partenaire",
partner_desc: "ONG, mentors et partenaires d'impact.",
productivity: "✅ Zone Productivité",
productivity_desc: "Kanban et planificateur propulsés par IA.",
wellness: "🧘 Zone Bien-être",
wellness_desc: "Santé mentale & audio apaisant.",
finance: "💰 Zone Finance",
finance_desc: "Conseils sur le budget et l’épargne.",
insight: "📊 Zone Insight",
insight_desc: "Suivre l'utilisation et les analyses.",
sync: "🔄 Zone de Synchronisation",
sync_desc: "Gérez vos données hors ligne et en ligne.",
footer: "© 2025 MVP LifeLine AI App. Développé par John Umoh.",
privacy: "Confidentialité",
help: "Aide",
security: "Sécurité",
language: "Langue",
monetization: "Monétisation",
onboarding: "Embarquement"
},
es: {
welcome: "Bienvenido a MVP LifeLine",
tagline: "Tu centro digital para Ganar. Sanar. Crecer.",
get_started: "Comenzar",
description: "MVP LifeLine está diseñado para soñadores valientes en todo el mundo. Una app de IA poderosa para empoderar a la juventud emocional, financiera y profesionalmente.",
voice_input: "Entrada de voz: [Esperando entrada...]",
career_zone: "📁 Zona de Carrera",
career_desc: "Trabajos, CVs y preparación para entrevistas.",
emotional_zone: "💔 Zona Emocional",
emotional_desc: "Seguimiento de sentimientos y diario.",
smartq: "🤖 Acceso SmartQ",
smartq_desc: "Pregunta lo que sea a tu guía de IA.",
dual_mode: "🧠 Modo IA Dual",
dual_desc: "Cambia entre ayuda profesional y emocional.",
hustle: "💼 Centro de Gigs Digitales",
hustle_desc: "Herramientas para freelancing y economía de gigs.",
partner: "🤝 Zona de Socios",
partner_desc: "ONGs, mentores y socios de impacto.",
productivity: "✅ Zona de Productividad",
productivity_desc: "Kanban y planificador con IA.",
wellness: "🧘 Zona de Bienestar",
wellness_desc: "Salud mental y audios relajantes.",
finance: "💰 Zona Financiera",
finance_desc: "Consejos sobre presupuesto y ahorro.",
insight: "📊 Zona de Análisis",
insight_desc: "Seguimiento de uso e insights.",
sync: "🔄 Zona de Sincronización",
sync_desc: "Gestiona tus datos en línea y sin conexión.",
footer: "© 2025 MVP LifeLine AI App. Desarrollado por John Umoh.",
privacy: "Privacidad",
help: "Ayuda",
security: "Seguridad",
language: "Idioma",
monetization: "Monetización",
onboarding: "Introducción"
},
ar: {
welcome: "مرحبًا بك في MVP LifeLine",
tagline: "منصتك الرقمية لكسب. شفاء. نمو.",
get_started: "ابدأ",
description: "تم بناء MVP LifeLine للحالمين الجريئين حول العالم. تطبيق ذكاء اصطناعي قوي لتمكين الشباب عاطفيًا وماليًا ومهنيًا.",
voice_input: "إدخال صوتي: [بانتظار الإدخال...]",
career_zone: "📁 منطقة الوظائف",
career_desc: "وظائف، سير ذاتية، وتحضير للمقابلات.",
emotional_zone: "💔 المنطقة العاطفية",
emotional_desc: "تتبع المشاعر وتدوين اليوميات.",
smartq: "🤖 وصول SmartQ",
smartq_desc: "اسأل مرشدك بالذكاء الاصطناعي عن أي شيء.",
dual_mode: "🧠 وضع الذكاء الاصطناعي المزدوج",
dual_desc: "التبديل بين الدعم المهني والعاطفي.",
hustle: "💼 مركز العمل الحر",
hustle_desc: "أدوات العمل الحر واقتصاد الوظائف الصغيرة.",
partner: "🤝 منطقة الشركاء",
partner_desc: "المنظمات والمرشدون والشركاء المؤثرون.",
productivity: "✅ منطقة الإنتاجية",
productivity_desc: "كانبان وخطط مدعومة بالذكاء الاصطناعي.",
wellness: "🧘 منطقة العافية",
wellness_desc: "الصحة النفسية والصوتيات المريحة.",
finance: "💰 منطقة المالية",
finance_desc: "نصائح الميزانية والادخار.",
insight: "📊 منطقة الإحصاءات",
insight_desc: "تتبع الاستخدام وتحليلات البيانات.",
sync: "🔄 منطقة المزامنة",
sync_desc: "إدارة البيانات المتصلة وغير المتصلة.",
footer: "© 2025 تطبيق MVP LifeLine AI. أنشأه جون أوموه.",
privacy: "الخصوصية",
help: "مساعدة",
security: "الأمان",
language: "اللغة",
monetization: "تحقيق الدخل",
onboarding: "التهيئة"
},
hi: {
welcome: "MVP LifeLine में आपका स्वागत है",
tagline: "कमाओ। ठीक हो जाओ। आगे बढ़ो। डिजिटल हब।",
get_started: "शुरू करें",
description: "MVP LifeLine वैश्विक साहसी सपने देखने वालों के लिए बनाया गया है। यह एक शक्तिशाली एआई ऐप है जो युवाओं को भावनात्मक, आर्थिक और प्रोफेशनल रूप से सशक्त बनाता है।",
voice_input: "वॉइस इनपुट: [इनपुट की प्रतीक्षा...]",
career_zone: "📁 करियर ज़ोन",
career_desc: "नौकरियाँ, CVs, और इंटरव्यू तैयारी।",
emotional_zone: "💔 भावनात्मक ज़ोन",
emotional_desc: "भावनाओं को ट्रैक करें और डायरी लिखें।",
smartq: "🤖 स्मार्टQ एक्सेस",
smartq_desc: "अपने AI गाइड से कुछ भी पूछें।",
dual_mode: "🧠 ड्यूल मोड एआई",
dual_desc: "करियर और इमोशनल हेल्प के बीच स्विच करें।",
hustle: "💼 डिजिटल हसल हब",
hustle_desc: "फ्रीलांस और गिग इकॉनॉमी टूल्स।",
partner: "🤝 पार्टनर ज़ोन",
partner_desc: "NGO, मेंटर्स और प्रभावशाली साझेदार।",
productivity: "✅ उत्पादकता ज़ोन",
productivity_desc: "AI-संचालित कनबान और प्लानर।",
wellness: "🧘 वेलनेस ज़ोन",
wellness_desc: "मेंटल हेल्थ और शांत करने वाला ऑडियो।",
finance: "💰 फाइनेंस ज़ोन",
finance_desc: "बजट और सेविंग्स की सलाह।",
insight: "📊 इनसाइट ज़ोन",
insight_desc: "उपयोग और विश्लेषण ट्रैक करें।",
sync: "🔄 सिंक ज़ोन",
sync_desc: "ऑनलाइन और ऑफलाइन डेटा मैनेज करें।",
footer: "© 2025 MVP LifeLine AI App. जॉन उमोह द्वारा निर्मित।",
privacy: "गोपनीयता",
help: "सहायता",
security: "सुरक्षा",
language: "भाषा",
monetization: "मोनेटाइज़ेशन",
onboarding: "ऑनबोर्डिंग"
},
zh: {
welcome: "欢迎使用 MVP LifeLine",
tagline: "你的数字中心：赚钱、疗愈、成长。",
get_started: "开始使用",
description: "MVP LifeLine 为全球勇敢的梦想者打造。一个强大的 AI 应用程序，致力于在情感、财务和职业方面赋能年轻人。",
voice_input: "语音输入：[等待输入...]",
career_zone: "📁 职业专区",
career_desc: "求职、简历和面试准备。",
emotional_zone: "💔 情感专区",
emotional_desc: "情绪追踪与日记记录。",
smartq: "🤖 SmartQ 智能问答",
smartq_desc: "向你的 AI 指导提问。",
dual_mode: "🧠 双模式 AI",
dual_desc: "在职业和情绪支持间切换。",
hustle: "💼 数字副业中心",
hustle_desc: "自由职业与零工经济工具。",
partner: "🤝 合作伙伴专区",
partner_desc: "NGO、导师与影响力伙伴。",
productivity: "✅ 生产力专区",
productivity_desc: "AI 驱动的看板与计划工具。",
wellness: "🧘 健康专区",
wellness_desc: "心理健康与放松音频。",
finance: "💰 财务专区",
finance_desc: "预算与储蓄建议。",
insight: "📊 洞察专区",
insight_desc: "使用情况与分析见解追踪。",
sync: "🔄 同步专区",
sync_desc: "管理在线与离线数据。",
footer: "© 2025 MVP LifeLine AI 应用。由 John Umoh 构建。",
privacy: "隐私",
help: "帮助",
security: "安全",
language: "语言",
monetization: "变现",
onboarding: "引导"
},
pt: {
welcome: "Bem-vindo ao MVP LifeLine",
tagline: "Seu hub digital para Ganhar. Curar. Crescer.",
get_started: "Começar",
description: "O MVP LifeLine foi feito para sonhadores ousados do mundo inteiro. Um app de IA poderoso para empoderar jovens emocional, financeira e profissionalmente.",
voice_input: "Entrada de voz: [Aguardando entrada...]",
career_zone: "📁 Zona de Carreira",
career_desc: "Empregos, currículos e preparação para entrevistas.",
emotional_zone: "💔 Zona Emocional",
emotional_desc: "Acompanhe sentimentos e diário.",
smartq: "🤖 Acesso SmartQ",
smartq_desc: "Pergunte qualquer coisa ao seu guia de IA.",
dual_mode: "🧠 Modo IA Duplo",
dual_desc: "Alterne entre ajuda emocional e profissional.",
hustle: "💼 Centro de Freelance Digital",
hustle_desc: "Ferramentas para freelas e economia gig.",
partner: "🤝 Zona de Parceiros",
partner_desc: "ONGs, mentores e parceiros de impacto.",
productivity: "✅ Zona de Produtividade",
productivity_desc: "Kanban e planner com IA.",
wellness: "🧘 Zona de Bem-estar",
wellness_desc: "Saúde mental e áudio relaxante.",
finance: "💰 Zona Financeira",
finance_desc: "Dicas de orçamento e economia.",
insight: "📊 Zona de Insights",
insight_desc: "Acompanhe uso e análises.",
sync: "🔄 Zona de Sincronização",
sync_desc: "Gerencie seus dados online e offline.",
footer: "© 2025 MVP LifeLine AI App. Desenvolvido por John Umoh.",
privacy: "Privacidade",
help: "Ajuda",
security: "Segurança",
language: "Idioma",
monetization: "Monetização",
onboarding: "Onboarding"
},
ru: {
welcome: "Добро пожаловать в MVP LifeLine",
tagline: "Ваш цифровой центр: Зарабатывайте. Исцеляйтесь. Развивайтесь.",
get_started: "Начать",
description: "MVP LifeLine создан для смелых мечтателей по всему миру. Мощное приложение с ИИ для поддержки молодежи в эмоциональном, финансовом и профессиональном плане.",
voice_input: "Голосовой ввод: [Ожидание ввода...]",
career_zone: "📁 Карьерная зона",
career_desc: "Работа, резюме и подготовка к собеседованиям.",
emotional_zone: "💔 Эмоциональная зона",
emotional_desc: "Отслеживание чувств и ведение дневника.",
smartq: "🤖 Доступ к SmartQ",
smartq_desc: "Задавайте вопросы вашему ИИ-гиду.",
dual_mode: "🧠 Двойной режим ИИ",
dual_desc: "Переключение между карьерной и эмоциональной поддержкой.",
hustle: "💼 Центр цифрового подработки",
hustle_desc: "Инструменты для фриланса и экономики гигов.",
partner: "🤝 Зона партнёров",
partner_desc: "НКО, наставники и партнёры по влиянию.",
productivity: "✅ Зона продуктивности",
productivity_desc: "AI-Канбан и планировщик.",
wellness: "🧘 Зона благополучия",
wellness_desc: "Психическое здоровье и расслабляющий аудио.",
finance: "💰 Финансовая зона",
finance_desc: "Советы по бюджету и сбережениям.",
insight: "📊 Зона аналитики",
insight_desc: "Отслеживание использования и аналитика.",
sync: "🔄 Зона синхронизации",
sync_desc: "Управление офлайн- и онлайн-данными.",
footer: "© 2025 MVP LifeLine AI App. Разработано Джоном Умо.",
privacy: "Конфиденциальность",
help: "Помощь",
security: "Безопасность",
language: "Язык",
monetization: "Монетизация",
onboarding: "Онбординг"
},
bn: {
welcome: "MVP LifeLine-এ স্বাগতম",
tagline: "আপনার ডিজিটাল প্ল্যাটফর্ম: আয় করুন। সুস্থ হন। উন্নতি করুন।",
get_started: "শুরু করুন",
description: "MVP LifeLine বৈশ্বিক সাহসী স্বপ্নদর্শীদের জন্য তৈরি। এটি একটি শক্তিশালী AI অ্যাপ যা তরুণদের মানসিক, আর্থিক এবং পেশাগতভাবে ক্ষমতায়ন করে।",
voice_input: "ভয়েস ইনপুট: [ইনপুটের জন্য অপেক্ষা করছে...]",
career_zone: "📁 ক্যারিয়ার জোন",
career_desc: "চাকরি, সিভি, এবং ইন্টারভিউ প্রস্তুতি।",
emotional_zone: "💔 আবেগ জোন",
emotional_desc: "অনুভূতি ট্র্যাক করুন এবং ডায়েরি লিখুন।",
smartq: "🤖 স্মার্টQ অ্যাক্সেস",
smartq_desc: "আপনার AI গাইডকে কিছু জিজ্ঞাসা করুন।",
dual_mode: "🧠 ডুয়াল মোড AI",
dual_desc: "ক্যারিয়ার এবং আবেগের সাহায্যের মধ্যে স্যুইচ করুন।",
hustle: "💼 ডিজিটাল হাসল হাব",
hustle_desc: "ফ্রিল্যান্স ও
},
pg: {
welcome: "Welcome to MVP LifeLine",
tagline: "Your digital hub to Earn. Heal. Grow.",
get_started: "Make we start",
description: "MVP LifeLine na beta AI app wey dey empower young pipo for mind, money, and work matter dem.",
voice_input: "Voice Input: [I dey wait for your talk...]",
career_zone: "📁 Career Zone",
career_desc: "Jobs, CV dem, and how to do interview.",
emotional_zone: "💔 Emotional Zone",
emotional_desc: "Track how you dey feel and write your mind.",
smartq: "🤖 SmartQ Access",
smartq_desc: "You fit ask your AI guide anything.",
dual_mode: "🧠 Dual Mode AI",
dual_desc: "You fit switch between career and emotional help.",
hustle: "💼 Digital Hustle Hub",
hustle_desc: "Freelance and gig work tools.",
partner: "🤝 Partner Zone",
partner_desc: "NGO, mentors, and people wey fit help.",
productivity: "✅ Productivity Zone",
productivity_desc: "Kanban board and planner wey AI dey run.",
wellness: "🧘 Wellness Zone",
wellness_desc: "Mental health and soft sound to calm you.",
finance: "💰 Finance Zone",
finance_desc: "Budgeting and saving tips.",
insight: "📊 Insight Zone",
insight_desc: "See how you dey use the app and analytics.",
sync: "🔄 Sync Zone",
sync_desc: "Manage your data for offline and online.",
footer: "© 2025 MVP LifeLine AI App. John Umoh build am.",
privacy: "Privacy",
help: "Help",
security: "Security",
language: "Language",
monetization: "How to make money",
onboarding: "How to start"
}
</script> <!-- (this closes your last functional script) -->    <!-- 🚫 Remove this line: -->    <!-- const translations = { ... -->    <!-- ✅ Then close body and html properly -->

<script src="translations.js"></script>              </body>                
                                               </html>            
  en: {            
    greeting: "MVP LifeLine AI App",            
    tagline: "Earn. Heal. Grow.",            
    selectLanguage: "Select Language",            
    micLabel: "Voice Input",            
    darkMode: "Dark Mode",            
  },            
  fr: {            
    greeting: "Application MVP LifeLine AI",            
    tagline: "Gagner. Guérir. Évoluer.",            
    selectLanguage: "Choisir la langue",            
    micLabel: "Entrée vocale",            
    darkMode: "Mode Sombre",            
  },            
  es: {            
    greeting: "Aplicación MVP LifeLine AI",            
    tagline: "Ganar. Sanar. Crecer.",            
    selectLanguage: "Seleccionar idioma",            
    micLabel: "Entrada de voz",            
    darkMode: "Modo oscuro",            
  },            
  ar: {            
    greeting: "تطبيق MVP LifeLine AI",            
    tagline: "اكسب. اشف. نمُ.",            
    selectLanguage: "اختر اللغة",            
    micLabel: "إدخال صوتي",            
    darkMode: "الوضع الداكن",            
  },            
  hi: {            
    greeting: "एमवीपी लाइफलाइन एआई ऐप",            
    tagline: "कमाओ. चंगा करो. बढ़ो.",            
    selectLanguage: "भाषा चुनें",            
    micLabel: "वॉयस इनपुट",            
    darkMode: "डार्क मोड",            
  },            
  zh: {            
    greeting: "MVP LifeLine AI 应用",            
    tagline: "赚钱。疗愈。成长。",            
    selectLanguage: "选择语言",            
    micLabel: "语音输入",            
    darkMode: "深色模式",            
  },            
  pt: {            
    greeting: "Aplicativo MVP LifeLine AI",            
    tagline: "Ganhar. Curar. Crescer.",            
    selectLanguage: "Selecionar idioma",            
    micLabel: "Entrada de voz",            
    darkMode: "Modo escuro",            
  },            
  ru: {            
    greeting: "Приложение MVP LifeLine AI",            
    tagline: "Зарабатывай. Исцеляйся. Расти.",            
    selectLanguage: "Выбрать язык",            
    micLabel: "Голосовой ввод",            
    darkMode: "Темный режим",            
  },            
  bn: {            
    greeting: "এমভিপি লাইফলাইন এআই অ্যাপ",            
    tagline: "আয় করুন। সুস্থ হন। বেড়ে উঠুন।",            
    selectLanguage: "ভাষা নির্বাচন করুন",            
    micLabel: "ভয়েস ইনপুট",            
    darkMode: "ডার্ক মোড",            
  },            
  pg: {            
    greeting: "MVP LifeLine AI App",            
    tagline: "Make money. Get better. Grow up.",            
    selectLanguage: "Pick ya language",            
    micLabel: "Talk put",            
    darkMode: "Dark mode",            
  }            
};            
