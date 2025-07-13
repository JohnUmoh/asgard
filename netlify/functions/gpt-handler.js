exports.handler = async function(event, context) {
  try {
    const { zone, prompt } = JSON.parse(event.body);

    return {
      statusCode: 200,
      body: JSON.stringify({
        answer: `🧠 (${zone}) You asked: "${prompt}". This is a test reply from MVP LifeLine AI.`,
      }),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Something went wrong." }),
    };
  }
};
