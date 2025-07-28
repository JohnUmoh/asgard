document.addEventListener("DOMContentLoaded", () => {
  const languageSelect = document.getElementById("language");
  const themeToggle = document.getElementById("theme-toggle");
  const themes = ["light", "dark"];
  let currentThemeIndex = 0;

  // Load saved language
  const savedLanguage = localStorage.getItem("language") || "en";
  languageSelect.value = savedLanguage;
  updateTranslations(savedLanguage);

  // Load saved theme
  const savedTheme = localStorage.getItem("lifeline-theme") || "light";
  document.body.classList.add(`theme-${savedTheme}`);
  currentThemeIndex = themes.indexOf(savedTheme);

  // Language change handler
  languageSelect.addEventListener("change", () => {
    const selected = languageSelect.value;
    localStorage.setItem("language", selected);
    updateTranslations(selected);
  });

  // Theme toggle
  themeToggle.addEventListener("click", () => {
    document.body.classList.remove(...themes.map(t => `theme-${t}`));
    const nextTheme = themes[(currentThemeIndex + 1) % themes.length];
    document.body.classList.add(`theme-${nextTheme}`);
    localStorage.setItem("lifeline-theme", nextTheme);
    currentThemeIndex = (currentThemeIndex + 1) % themes.length;
  });

  function updateTranslations(lang) {
    const translations = {
      en: { welcome: "Welcome", zone: "Career Zone" },
      fr: { welcome: "Bienvenue", zone: "Zone Carrière" },
      es: { welcome: "Bienvenido", zone: "Zona de Carrera" },
      ar: { welcome: "أهلا بك", zone: "منطقة الوظائف" },
      hi: { welcome: "स्वागत है", zone: "करियर ज़ोन" },
      zh: { welcome: "欢迎", zone: "职业区" },
      pt: { welcome: "Bem-vindo", zone: "Zona de Carreira" },
      ru: { welcome: "Добро пожаловать", zone: "Карьера" },
      bn: { welcome: "স্বাগতম", zone: "ক্যারিয়ার অঞ্চল" },
      pg: { welcome: "You dey welcome", zone: "Career Zone" },
    };

    document.querySelectorAll("[data-i18n]").forEach(el => {
      const key = el.getAttribute("data-i18n");
      el.textContent = translations[lang][key] || el.textContent;
    });
  }
});
