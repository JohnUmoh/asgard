exports.handler = async (event) => {
  const userId = event.queryStringParameters.user || "guest";

  const premiumUsers = ["johnumoh", "founder123"];

  return {
    statusCode: 200,
    body: JSON.stringify({
      user: userId,
      premium: premiumUsers.includes(userId),
      features: premiumUsers.includes(userId)
        ? ["AI Career Coach", "Deep Emotional Support"]
        : ["Basic Access"]
    }),
  };
};