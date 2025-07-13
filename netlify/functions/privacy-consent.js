exports.handler = async (event) => {
  const { userId, consentGiven } = JSON.parse(event.body || '{}');

  if (!userId) {
    return { statusCode: 400, body: "User ID required." };
  }

  console.log(`User ${userId} consent: ${consentGiven}`);

  return {
    statusCode: 200,
    body: JSON.stringify({ saved: true }),
  };
};