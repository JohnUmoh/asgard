// Mock user subscription data (replace with real DB/API in production)
const userSubscriptions = {
  "user123": {
    isPremium: true,
    activeZones: [
      "career-zone",
      "emotional-zone",
      "smartq-access",
      "dual-mode-ai",
      "digital-hustle-hub",
      "partner-zone",
      "productivity-zone",
      "onboarding",
      "privacy-policy",
      "monetization",
      "career-advice",
      "mental-health-resources",
      "local-jobs",
      "community-forums",
      "voice-input-help",
      "subscription-info",
      "settings"
    ]
  },
  "user456": {
    isPremium: false,
    activeZones: [
      "career-zone",
      "emotional-zone",
      "smartq-access",
      "productivity-zone",
      "onboarding",
      "privacy-policy",
      "voice-input-help",
      "subscription-info",
      "settings"
    ]
  }
};

exports.handler = async function(event, context) {
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: 'Method not allowed' }),
    };
  }

  try {
    const { userId } = JSON.parse(event.body);

    if (!userId) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'Missing userId' }),
      };
    }

    // Lookup user subscription info
    const subscription = userSubscriptions[userId];

    if (!subscription) {
      return {
        statusCode: 404,
        body: JSON.stringify({ error: 'User subscription not found' }),
      };
    }

    return {
      statusCode: 200,
      body: JSON.stringify({
        userId,
        isPremium: subscription.isPremium,
        activeZones: subscription.activeZones
      }),
    };

  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: err.message || 'Internal Server Error' }),
    };
  }
};