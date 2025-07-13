exports.handler = async (event) => {
  const userId = event.queryStringParameters.user || "guest";

  const settings = {
    user: userId,
    language: "en",
    theme: "light",
    voiceConsent: true
  };

  return {
    statusCode: 200,
    body: JSON.stringify(settings),
  };
};