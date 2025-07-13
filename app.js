// MVP LifeLine AI – all-zones frontend helper
document.addEventListener("DOMContentLoaded", () => {
  /* ---------- DOM refs ---------- */
  const languageSelect = document.getElementById("language");
  const greeting       = document.querySelector(".greeting h2");
  const micBtn         = document.getElementById("mic-btn");
  const speechText     = document.getElementById("speech-text");
  const darkToggle     = document.getElementById("dark-toggle");
  const moduleCards    = document.querySelectorAll(".card");

  /* ---------- Translations ---------- */
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

  /* ---------- Language switch ---------- */
  languageSelect?.addEventListener("change", () => {
    const sel = languageSelect.value;
    if (translations[sel]) greeting.innerHTML = translations[sel];
  });

  /* ---------- Dark-mode toggle ---------- */
  darkToggle?.addEventListener("click", () =>
    document.body.classList.toggle("dark")
  );

  /* ---------- Voice-input (Web Speech) ---------- */
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

  /* ---------- Card-click → ask GPT ---------- */
  moduleCards.forEach(card => {
    card.addEventListener("click", e => {
      e.preventDefault();                                     // stay on page
      const zone   = card.dataset.zone || "smartq-access";    // fallback
      const title  = card.querySelector("h3")?.innerText || zone;
      const prompt = `I clicked "${title}". Guide me on getting started.`;
      getGPTResponse({ zone, prompt });
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
