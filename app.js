// MVP LifeLine AI – All-Zones Frontend Helper

document.addEventListener("DOMContentLoaded", () => {
  const offlineMode     = false;
  const languageSelect  = document.getElementById("language");
  const greeting        = document.querySelector(".greeting h2");
  const micBtn          = document.getElementById("mic-button");
  const speechText      = document.getElementById("speech-text");
  const darkToggle      = document.getElementById("dark-toggle");
  const themeToggle     = document.getElementById("theme-toggle");
  const moduleCards     = document.querySelectorAll(".card");
  const replyBox        = document.getElementById("gpt-reply-box");
  const replyText       = document.getElementById("gpt-reply-text");

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

  // 🗣️ Language Change
  languageSelect?.addEventListener("change", () => {
    const selected = languageSelect.value;
    if (translations[selected]) {
      greeting.innerHTML = translations[selected];
    }
  });

  // 🌘 Dark Mode Toggle
  darkToggle?.addEventListener("click", () => {
    document.body.classList.toggle("dark");
  });

  // 🎨 Theme Toggle
  const themeColors = ["red", "black", "white", "yellow", "blue"];
  let currentTheme = 0;

  themeToggle?.addEventListener("click", () => {
    themeColors.forEach(color => document.body.classList.remove(`theme-${color}`));
    const nextTheme = themeColors[currentTheme];
    document.body.classList.add(`theme-${nextTheme}`);
    currentTheme = (currentTheme + 1) % themeColors.length;
  });

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

  // 🧭 Card Navigation Logic
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

  // 🛠️ Career Tools Redirect
  document.querySelectorAll(".card.tool").forEach(tool => {
    tool.addEventListener("click", () => {
      const toolName = tool.dataset.tool;
      const urlMap = {
        cv: "cv-builder.html",
        cover: "cover-letter.html",
        interview: "interview-coach.html",
        linkedin: "linkedin-optimizer.html",
        referral: "job-referral.html",
        freelance: "freelance-profile.html",
        portfolio: "portfolio-builder.html",
        careerplan: "career-planner.html",
        aiagent: "ai-career-agent.html"
      };

      const targetUrl = urlMap[toolName];
      if (targetUrl) {
        window.location.href = targetUrl;
      } else {
        alert("⚠️ Page not found!");
      }
    });
  });

  // 📱 Mic Button Scroll Visibility (Fix overlap)
  window.addEventListener("scroll", () => {
    if (!micBtn) return;
    if (window.scrollY > 150) {
      micBtn.style.opacity = "1";
      micBtn.style.pointerEvents = "auto";
    } else {
      micBtn.style.opacity = "0";
      micBtn.style.pointerEvents = "none";
    }
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
