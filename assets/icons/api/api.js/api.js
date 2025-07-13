/*  assets/api/api.js
 *  One helper per zone + core wrappers
 *  Import only the zone helpers you need. Example:
 *    import { careerZoneAsk } from "/assets/api/api.js";
 *    const reply = await careerZoneAsk("How do I write a CV?");
 */

/* ---------- low-level wrapper ---------- */
const FN = "/.netlify/functions";
async function post(fn, body) {
  const res = await fetch(`${FN}/${fn}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body)
  });
  if (!res.ok) throw new Error(await res.text());
  return res.json();
}

/* ---------- GPT helper ---------- */
async function ask(zone, prompt, userId = "anon") {
  return post("gpt-handler", { zone, prompt, userId });
}

/* ---------- Zone-specific helpers (17) ---------- */

/** 1. Career Zone — GPT advice + regional data */
export async function careerZoneAsk(prompt, userId) {
  return ask("career-zone", prompt, userId);
}
export async function careerZoneAdvice(region = "general") {
  return post("fetch-career-advice", { region });
}

/** 2. Emotional Zone — GPT journaling + save */
export async function emotionalZoneAsk(prompt, userId) {
  return ask("emotional-zone", prompt, userId);
}
export async function emotionalZoneSave(userId, entry) {
  return post("save-journal", { userId, zone: "emotional-zone", journalEntry: entry });
}

/** 3. SmartQ Access (general QA) */
export async function smartQAsk(prompt, userId) {
  return ask("smartq-access", prompt, userId);
}

/** 4. Dual-Mode AI (career/emotional switch) */
export async function dualModeAsk(prompt, mode = "career", userId) {
  return ask(`dual-mode-${mode}`, prompt, userId);
}

/** 5. Digital Hustle Hub — local jobs + GPT */
export async function hustleHubAsk(prompt, userId) {
  return ask("digital-hustle-hub", prompt, userId);
}
export async function hustleHubJobs(country = "ng") {
  return post("fetch-local-jobs", { country });
}

/** 6. Partner Zone — sponsored content */
export async function partnerZoneFeed() {
  return post("partner-content");
}

/** 7. Productivity Zone — sync tasks */
export async function productivitySync(userId, data) {
  return post("sync-data", { userId, zone: "productivity-zone", type: "task", payload: data });
}

/** 8. Onboarding Zone — record progress */
export async function onboardingRecord(userId, step) {
  return post("onboarding-progress", { userId, completedStep: step });
}

/** 9. Privacy Zone — save consent */
export async function savePrivacyConsent(userId, consentGiven = true) {
  return post("privacy-consent", { userId, consentGiven });
}

/**10. Monetization Zone — premium check */
export async function monetizationInfo(userId) {
  return post("monetization", { userId });
}
export async function checkSubscription(userId) {
  return post("subscription-check", { userId });
}

/**11. Career-Advice Page (regional feed) */
export async function getCareerAdvice(region) {
  return post("fetch-career-advice", { region });
}

/**12. Mental-Health Resources Page */
export async function getMentalHealth(country) {
  return post("fetch-mental-health", { country });
}

/**13. Community Forums */
export async function communityPost(userId, postObj) {
  return post("community-forums", { user: userId, post: postObj });
}

/**14. Voice-Input Help — log transcripts */
export async function logVoiceInput(userId, zone, transcript) {
  return post("voice-input-handler", { userId, zone, transcript });
}

/**15. Settings Zone — load/update prefs */
export async function getUserSettings(userId) {
  return post("get-user-settings", { user: userId });
}
export async function updateUserSettings(userId, newSettings) {
  return post("update-user-settings", { userId, newSettings });
}

/**16. Feedback Zone — send feedback */
export async function submitFeedback(userId, message) {
  return post("submit-feedback", { user: userId, message });
}

/**17. Local Job Board (stand-alone page) */
export async function localJobFeed(country) {
  return post("fetch-local-jobs", { country });
}