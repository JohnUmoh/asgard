// MVP LifeLine AI – all-zones frontend helper
document.addEventListener("DOMContentLoaded", () => {
  const offlineMode = false; // 🛑 Set to true to use dummy replies instead of real pages

  const languageSelect = document.getElementById("language");
  const greeting       = document.querySelector(".greeting h2");
  const micBtn         = document.getElementById("mic-btn");
  const speechText     = document.getElementById("speech-text");
  const darkToggle     = document.getElementById("dark-toggle");
  const themeToggle    = document.getElementById("theme-toggle");
  const moduleCards    = document.querySelectorAll(".card");

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

  languageSelect?.addEventListener("change", () => {
    const sel = languageSelect.value;
    if (translations[sel]) greeting.innerHTML = translations[sel];
  });

  darkToggle?.addEventListener("click", () =>
    document.body.classList.toggle("dark")
  );

  const themeColors = ["red", "black", "white", "yellow", "blue"];
  let currentColorIndex = 0;

  themeToggle?.addEventListener("click", () => {
    themeColors.forEach(c => document.body.classList.remove("theme-" + c));
    const nextColor = themeColors[currentColorIndex];
    document.body.classList.add("theme-" + nextColor);
    currentColorIndex = (currentColorIndex + 1) % themeColors.length;
  });

  micBtn?.addEventListener("click", () => {
    const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SR) return alert("SpeechRecognition not supported on this browser.");
    const recog = new SR();
    recog.lang = "en-US";
    recog.onstart  = () => (speechText.innerText = "[Listening…]");
    recog.onerror  = e  => (speechText.innerText = "[Error] " + e.error);
    recog.onresult = e  => {
      const transcript = e.results[0][0].transcript;
      speechText.innerText = transcript;
      getGPTResponse({ zone: "smartq-access", prompt: transcript });
    };
    recog.start();
  });

  moduleCards.forEach(card => {
    card.addEventListener("click", e => {
      const zone   = card.dataset.zone || "smartq-access";
      const title  = card.querySelector("h3")?.innerText || zone;

      if (offlineMode) {
        e.preventDefault(); // Stay on page in dummy mode
        const prompt = `I clicked "${title}". Guide me on getting started.`;
        getGPTResponse({ zone, prompt });
      } 
      // else: let it naturally go to href
    });
  });

  // Add click handlers for Career tools cards
  document.querySelectorAll(".card.tool").forEach((tool) => {
    tool.addEventListener("click", () => {
      const toolName = tool.dataset.tool;
      // Map toolName to URLs:
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
        alert("Page not found!");
      }
    });
  });
});

/* ---------- GPT call helper ---------- */
async function getGPTResponse({ zone, prompt }) {
  const replyBox  = document.getElementById("gpt-reply-box");
  const replyText = document.getElementById("gpt-reply-text");
  replyBox.style.display = "block";
  replyText.innerText = "Thinking…";

  try {
    const res  = await fetch("/.netlify/functions/gpt-handler", {
      method : "POST",
      headers: { "Content-Type": "application/json" },
      body   : JSON.stringify({ zone, prompt })
    });
    const data   = await res.json();
    const answer = data.answer || "No response from GPT.";
    replyText.innerText = "🤖 " + answer;
    replyBox.scrollIntoView({ behavior: "smooth" });
  } catch (err) {
    replyText.innerText = "⚠️ GPT error: " + err.message;
  }
    }
