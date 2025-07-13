exports.handler = async (event) => {
  const { userId, completedStep } = JSON.parse(event.body || '{}');

  if (!userId || !completedStep) {
    return { statusCode: 400, body: "Missing onboarding data." };
  }

  console.log(`User ${userId} completed step: ${completedStep}`);

  return {
    statusCode: 200,
    body: JSON.stringify({ status: "recorded" }),
  };
};