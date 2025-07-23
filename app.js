// MVP LifeLine AI – All-Zones Frontend Helper

document.addEventListener("DOMContentLoaded", () => {
  const offlineMode     = false;
  const languageSelect  = document.getElementById("language");
  const greeting        = document.querySelector(".greeting h2");
  const micBtn          = document.getElementById("mic-button");
  const speechText      = document.getElementById("speech-text");
  const themeToggle     = document.getElementById("theme-toggle");
  const moduleCards     = document.querySelectorAll(".card");

  // 🌍 Translations
  const translations = {
    en: "Welcome, Hope,<br><span>Let’s grow today.</span>",
    ha: "Barka da zuwa, Hope,<br><span>Mu ci gaba yau.</span>",
    ig: "Nnọọ, Hope,<br><span>Ka nọ rie taa.</span>",
    yo: "Kaabọ, Hope,<br><span>Ẹ jẹ́ kí a dagbasoke lónìí.</span>",
    sw: "Karibu, Hope,<br><span>Tukue leo.</span>",
    fr: "Bienvenue, Hope,<br><span>Faisons des progrès aujourd’hui.</span>",
    ar: "مرحبًا، Hope،<br><span>لنتقدم اليوم.</span>",
    zu: "Siyakwamukela, Hope,<br><span>Ake sikhule namhlanje.</span>",
    pg: "You don show, Hope,<br><span>Make we move today.</span>"
  };

  // 🗣️ Language Switcher
  languageSelect?.addEventListener("change", () => {
    const selected = languageSelect.value;
    greeting.innerHTML = translations[selected] || translations.en;
  });

  // 🎨 Theme Toggle (Red, Yellow, Blue, White)
  const themes = ["red", "yellow", "blue", "white"];
  let currentThemeIndex = 0;

  themeToggle?.addEventListener("click", () => {
    document.body.classList.remove(...themes.map(t => `theme-${t}`));
    const next = themes[currentThemeIndex];
    document.body.classList.add(`theme-${next}`);
    localStorage.setItem("lifeline-theme", next);
    currentThemeIndex = (currentThemeIndex + 1) % themes.length;
  });

  // Load saved theme
  const savedTheme = localStorage.getItem("lifeline-theme");
  if (savedTheme && themes.includes(savedTheme)) {
    document.body.classList.add(`theme-${savedTheme}`);
    currentThemeIndex = (themes.indexOf(savedTheme) + 1) % themes.length;
  }

  // 🎤 Voice Recognition
  micBtn?.addEventListener("click", () => {
    const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SR) {
      speechText.innerText = "❌ SpeechRecognition not supported.";
      return;
    }

    const recog = new SR();
    recog.lang = languageSelect.value === "pg" ? "en-NG" : `${languageSelect.value}-NG`;
    recog.interimResults = false;

    recog.onstart = () => speechText.innerText = "🎙️ Listening...";
    recog.onerror = e => speechText.innerText = "❌ Error: " + e.error;
    recog.onresult = e => {
      const transcript = e.results[0][0].transcript;
      speechText.innerText = transcript;
      getGPTResponse({ zone: "smartq-access", prompt: transcript });
    };

    recog.start();
  });

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

  // 🎤 Mic Button Scroll Visibility
  window.addEventListener("scroll", () => {
    if (!micBtn) return;
    micBtn.style.opacity = window.scrollY > 150 ? "1" : "0";
    micBtn.style.pointerEvents = window.scrollY > 150 ? "auto" : "none";
  });
});

// 🤖 GPT Response Fetcher
async function getGPTResponse({ zone, prompt }) {
  const replyBox  = document.getElementById("gpt-reply-box");
  const replyText = document.getElementById("gpt-reply-text");

  if (!replyBox || !replyText) return;

  replyBox.style.display = "block";
  replyText.innerText = "Thinking...";

  try {
    const res = await fetch("/.netlify/functions/gpt-handler", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ zone, prompt })
    });

    const data = await res.json();
    replyText.innerText = "🤖 " + (data.answer || "No response from GPT.");
    replyBox.scrollIntoView({ behavior: "smooth" });
  } catch (err) {
    replyText.innerText = "⚠️ GPT error: " + err.message;
  }
      }
