// MVP LifeLine AI – All-Zones Frontend Helper with i18n

document.addEventListener("DOMContentLoaded", () => {
  const offlineMode = false;

  const languageSelect = document.getElementById("language");
  const micBtn = document.getElementById("mic-button");
  const speechText = document.getElementById("speech-text");
  const themeToggle = document.getElementById("theme-toggle");
  const moduleCards = document.querySelectorAll(".card");

  // 🌍 i18n Translations
  const translations = {
    en: {
      greeting: "Welcome, Hope,<br><span>Let’s grow today.</span>",
      heading: "Welcome to MVP LifeLine",
      tagline: "Your digital hub to Earn. Heal. Grow.",
      get_started: "Get Started",
      description: "MVP LifeLine is built for Africa’s bold dreamers. A powerful AI app to empower youth emotionally, financially, and professionally."
    },
    fr: {
      greeting: "Bienvenue, Hope,<br><span>Faisons des progrès aujourd’hui.</span>",
      heading: "Bienvenue à MVP LifeLine",
      tagline: "Votre hub numérique pour Gagner. Guérir. Grandir.",
      get_started: "Commencer",
      description: "MVP LifeLine est conçu pour les rêveurs audacieux d’Afrique. Une application IA puissante pour autonomiser les jeunes émotionnellement, financièrement et professionnellement."
    },
    es: {
      greeting: "Bienvenido, Hope,<br><span>Crecemos hoy.</span>",
      heading: "Bienvenido a MVP LifeLine",
      tagline: "Tu centro digital para Ganar. Sanar. Crecer.",
      get_started: "Comenzar",
      description: "MVP LifeLine está hecho para los soñadores audaces de África. Una poderosa app de IA para empoderar a los jóvenes emocional, financiera y profesionalmente."
    },
    ar: {
      greeting: "مرحبًا، Hope،<br><span>لنتقدم اليوم.</span>",
      heading: "مرحبًا بك في MVP LifeLine",
      tagline: "منصتك الرقمية للكسب. الشفاء. النمو.",
      get_started: "ابدأ",
      description: "تم إنشاء MVP LifeLine لحالمين أفريقيا. تطبيق ذكاء اصطناعي قوي لتمكين الشباب عاطفياً ومالياً ومهنياً."
    },
    hi: {
      greeting: "स्वागत है, Hope,<br><span>आज आगे बढ़ते हैं।</span>",
      heading: "MVP LifeLine में आपका स्वागत है",
      tagline: "कमाने, ठीक होने और बढ़ने के लिए आपका डिजिटल केंद्र।",
      get_started: "शुरू करें",
      description: "MVP LifeLine अफ्रीका के साहसी सपने देखने वालों के लिए बनाया गया है। यह युवाओं को भावनात्मक, आर्थिक और पेशेवर रूप से सशक्त करता है।"
    },
    zh: {
      greeting: "欢迎, Hope,<br><span>让我们今天成长。</span>",
      heading: "欢迎来到 MVP LifeLine",
      tagline: "您的数字枢纽：赚钱、疗愈、成长。",
      get_started: "开始",
      description: "MVP LifeLine 是为非洲有梦想的年轻人打造的强大 AI 应用，助力情感、财务和职业成长。"
    },
    pt: {
      greeting: "Bem-vindo, Hope,<br><span>Vamos crescer hoje.</span>",
      heading: "Bem-vindo ao MVP LifeLine",
      tagline: "Seu centro digital para Ganhar. Curar. Crescer.",
      get_started: "Começar",
      description: "O MVP LifeLine é feito para os sonhadores ousados da África. Um app de IA poderoso para capacitar os jovens emocional, financeira e profissionalmente."
    },
    ru: {
      greeting: "Добро пожаловать, Hope,<br><span>Давайте развиваться сегодня.</span>",
      heading: "Добро пожаловать в MVP LifeLine",
      tagline: "Ваш цифровой центр: Зарабатывать. Исцеляться. Расти.",
      get_started: "Начать",
      description: "MVP LifeLine создан для смелых мечтателей Африки. Мощное AI-приложение для эмоционального, финансового и профессионального роста молодежи."
    },
    bn: {
      greeting: "স্বাগতম, Hope,<br><span>আসুন আজ এগিয়ে যাই।</span>",
      heading: "স্বাগতম MVP LifeLine-এ",
      tagline: "আপনার ডিজিটাল কেন্দ্র উপার্জন, নিরাময় এবং বিকাশের জন্য।",
      get_started: "শুরু করুন",
      description: "MVP LifeLine আফ্রিকার সাহসী স্বপ্নদর্শীদের জন্য নির্মিত। এটি একটি শক্তিশালী AI অ্যাপ যা তরুণদের মানসিক, আর্থিক ও পেশাগতভাবে ক্ষমতায়ন করে।"
    },
    pg: {
      greeting: "You don show, Hope,<br><span>Make we move today.</span>",
      heading: "Welcome to MVP LifeLine",
      tagline: "Na your digital place to Earn. Heal. Grow.",
      get_started: "Make we start",
      description: "MVP LifeLine na for African youth wey get dream. This na strong AI app wey go help una mentally, financially and skill-wise."
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
            el.innerHTML = t[key]; // InnerHTML for styled greeting
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
      document.body.classList.add(`theme-${savedTheme}`);
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
    card.addEventListener("click", e => {
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
    micBtn.style.opacity = window.scrollY > 150 ? "1" : "0";
    micBtn.style.pointerEvents = window.scrollY > 150 ? "auto" : "none";
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
