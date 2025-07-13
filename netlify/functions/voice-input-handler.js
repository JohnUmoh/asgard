exports.handler = async (event) => {
  const { transcript, sourceZone } = JSON.parse(event.body || '{}');

  if (!transcript) {
    return { statusCode: 400, body: "No transcript received." };
  }

  console.log(`Voice input from ${sourceZone || 'unknown'}:`, transcript);

  return {
    statusCode: 200,
    body: JSON.stringify({ received: true }),
  };
};