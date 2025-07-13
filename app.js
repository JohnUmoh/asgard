document.addEventListener('DOMContentLoaded', () => {
  const languageSelect = document.getElementById('language');
  const greeting = document.querySelector('.greeting h2');
  const micBtn = document.getElementById('mic-btn');
  const speechText = document.getElementById('speech-text');
  const darkToggle = document.getElementById('dark-toggle');
  const moduleCards = document.querySelectorAll('.card');

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

  if (languageSelect && greeting) {
    languageSelect.addEventListener('change', () => {
      const selected = languageSelect.value;
      if (translations[selected]) {
        greeting.innerHTML = translations[selected];
      }
    });
  }

  // 🔄 Dark Mode Toggle
  if (darkToggle) {
    darkToggle.addEventListener('click', () => {
      document.body.classList.toggle('dark');
    });
  }

  // 🎤 Voice Input
  if (micBtn) {
    micBtn.addEventListener('click', () => {
      const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
      recognition.lang = 'en-US';
      recognition.interimResults = false;

      recognition.onstart = () => {
        if (speechText) speechText.innerText = "[Listening...]";
      };

      recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        if (speechText) speechText.innerText = transcript;

        // If input field exists, insert text, otherwise send to GPT
        const inputField = document.querySelector('input[type="text"]');
        if (inputField) {
          inputField.value = transcript;
        } else {
          getGPTResponse(transcript);
        }
      };

      recognition.onerror = (event) => {
        if (speechText) speechText.innerText = "[Error]: " + event.error;
      };

      recognition.start();
    });
  }

  // 📡 Online/Offline status indicator
  window.addEventListener('online', () => {
    console.log("✅ You are online");
  });

  window.addEventListener('offline', () => {
    console.log("⚠️ You are offline");
  });

  // ✅ Click on any module = GPT guidance
  moduleCards.forEach(card => {
    card.addEventListener('click', () => {
      const title = card.querySelector('h3')?.innerText || "Module";
      const prompt = `I clicked on "${title}". Please help me get started with this section.`;
      getGPTResponse(prompt);
    });
  });
});

// 🤖 GPT handler
async function getGPTResponse(prompt) {
  const replyBox = document.getElementById("gpt-reply-box");
  const replyText = document.getElementById("gpt-reply-text");

  if (replyText) replyText.innerText = "Thinking...";
  if (replyBox) replyBox.style.display = "block";

  try {
    const res = await fetch("/.netlify/functions/gpt-handler", {
      method: "POST",
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ prompt })
    });

    const data = await res.json();
    const reply = data.choices?.[0]?.message?.content || "No response from GPT.";
    if (replyText) replyText.innerText = "🤖 " + reply;
    if (replyBox) replyBox.scrollIntoView({ behavior: "smooth" });
  } catch (err) {
    if (replyText) replyText.innerText = "⚠️ GPT error: " + err.message;
  }
}