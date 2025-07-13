exports.handler = async (event) => {
  const { message, user } = JSON.parse(event.body || '{}');

  if (!message) {
    return { statusCode: 400, body: "Missing feedback message." };
  }

  console.log("Feedback from:", user || "Anonymous", "Message:", message);

  return {
    statusCode: 200,
    body: JSON.stringify({ success: true }),
  };
};