// main.js

const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const recog = new SpeechRecognition();

let selectedLang = "en"; // default

document.addEventListener("DOMContentLoaded", () => {
  const languageSelect = document.getElementById("language");

  languageSelect.addEventListener("change", (e) => {
    selectedLang = e.target.value;
    recog.lang = langToLocale[selectedLang] || "en-GB";
    console.log("Language changed to:", selectedLang, recog.lang);
  });
});
