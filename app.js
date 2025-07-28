// Grab DOM elements
const micBtn = document.getElementById('mic-button');
const languageSelect = document.getElementById('language-select');
const conversation = document.getElementById('conversation');

// Setup SpeechRecognition
const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
if (!SpeechRecognition) {
  alert('Sorry, your browser does not support Speech Recognition API.');
}
const recognition = new SpeechRecognition();
recognition.interimResults = false;
recognition.maxAlternatives = 1;

// Cache voices for speech synthesis
let voices = [];
function loadVoices() {
  voices = window.speechSynthesis.getVoices();
}
loadVoices();
if (speechSynthesis.onvoiceschanged !== undefined) {
  speechSynthesis.onvoiceschanged = loadVoices;
}

// State
let recognizing = false;

// Helpers
function scrollConversationToBottom() {
  conversation.scrollTop = conversation.scrollHeight;
}

function addMessage(text, className) {
  const msgDiv = document.createElement('div');
  msgDiv.className = 'message ' + className;
  msgDiv.textContent = text;
  conversation.appendChild(msgDiv);
  scrollConversationToBottom();
}

function showStatusMessage(text) {
  const status = document.createElement('div');
  status.className = 'message status';
  status.style.fontStyle = 'italic';
  status.textContent = text;
  conversation.appendChild(status);
  scrollConversationToBottom();
  setTimeout(() => {
    if (conversation.contains(status)) conversation.removeChild(status);
  }, 1500);
}

function speakText(text) {
  if (!('speechSynthesis' in window)) return null;

  window.speechSynthesis.cancel();

  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = languageSelect.value || 'en-US';

  const preferredVoice = voices.find(voice => voice.lang === utterance.lang);
  if (preferredVoice) utterance.voice = preferredVoice;

  window.speechSynthesis.speak(utterance);
  return utterance;
}

async function getGPTResponse(prompt) {
  showStatusMessage("Thinking...");
  micBtn.disabled = true;

  // Simulated async delay, replace with real API call
  await new Promise(res => setTimeout(res, 1500));

  const responseText = `You asked: "${prompt}" — Here's a helpful response from AI.`;
  addMessage(responseText, "ai-message");

  const utterance = speakText(responseText);

  if (utterance) {
    utterance.onend = () => {
      micBtn.disabled = false;
      if (!recognizing) recognition.start();
    };
  } else {
    micBtn.disabled = false;
    if (!recognizing) recognition.start();
  }
}

// Recognition event handlers
recognition.lang = languageSelect.value;

recognition.onstart = () => {
  recognizing = true;
  micBtn.textContent = "🛑 Stop";
  showStatusMessage("Listening...");
};

recognition.onend = () => {
  recognizing = false;
  micBtn.textContent = "🎤 Speak";
};

recognition.onerror = (event) => {
  addMessage("Error: " + event.error, "ai-message");
  recognizing = false;
  micBtn.textContent = "🎤 Speak";
  micBtn.disabled = false;
};

recognition.onresult = async (event) => {
  const transcript = event.results[0][0].transcript;
  addMessage(transcript, "user-message");
  await getGPTResponse(transcript);
};

// Mic button toggle logic
micBtn.addEventListener('click', () => {
  if (recognizing) {
    recognition.stop();
  } else {
    recognition.lang = languageSelect.value;
    recognition.start();
  }
});

// Update recognition language on selection change
languageSelect.addEventListener('change', () => {
  recognition.lang = languageSelect.value;
});
