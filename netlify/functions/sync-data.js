// netlify/functions/sync-data.js

exports.handler = async function(event, context) {
  try {
    if (event.httpMethod !== 'POST') {
      return { statusCode: 405, body: JSON.stringify({ error: 'Method Not Allowed' }) };
    }

    // Parse JSON body sent from client app
    const body = JSON.parse(event.body);

    // Expected structure (example):
    // {
    //   userId: "user123",
    //   data: {
    //     careerZone: {...},
    //     emotionalZone: {...},
    //     digitalHustleHub: {...},
    //     dualModeAI: {...},
    //     partnerZone: {...},
    //     productivityZone: {...},
    //     smartQAccess: {...},
    //     onboarding: {...},
    //     privacyPolicy: {...},
    //     monetization: {...},
    //     careerAdvice: {...},
    //     mentalHealthResources: {...},
    //     localJobs: {...},
    //     communityForums: {...},
    //     voiceInputHelp: {...},
    //     subscriptionInfo: {...},
    //     settings: {...}
    //   }
    // }

    const { userId, data } = body;
    if (!userId || !data) {
      return { statusCode: 400, body: JSON.stringify({ error: "Missing userId or data" }) };
    }

    // TODO: Connect to your database here
    // Example: await saveUserData(userId, data);

    // For demo: just log it
    console.log(`Syncing data for user ${userId}`);
    console.log(data);

    // Simulate success response
    return {
      statusCode: 200,
      body: JSON.stringify({ message: "User data synced successfully" })
    };

  } catch (error) {
    console.error("Sync data error:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Internal Server Error" })
    };
  }
};