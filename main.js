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
function applyTranslations(lang) {
const textElements = document.querySelectorAll('[data-i18n]');
const dictionary = translations[lang] || translations["en"]; // fallback to English

textElements.forEach(el => {
const key = el.getAttribute('data-i18n');
const translatedText = dictionary[key];
if (translatedText) {
el.innerText = translatedText;
}
});
}

