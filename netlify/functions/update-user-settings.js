exports.handler = async (event) => {
  const { userId, newSettings } = JSON.parse(event.body || '{}');

  if (!userId || !newSettings) {
    return { statusCode: 400, body: "Missing userId or settings." };
  }

  console.log(`Updating settings for ${userId}:`, newSettings);

  return {
    statusCode: 200,
    body: JSON.stringify({ success: true }),
  };
};