const openai = require("openai"); // or your preferred OpenAI SDK import

// Initialize OpenAI client (adjust based on your environment)
const configuration = new openai.Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const client = new openai.OpenAIApi(configuration);

exports.handler = async function(event, context) {
  try {
    if (event.httpMethod !== "POST") {
      return {
        statusCode: 405,
        body: JSON.stringify({ error: "Method not allowed" }),
      };
    }

    const { zone, prompt } = JSON.parse(event.body);

    if (!zone || !prompt) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: "Missing zone or prompt" }),
      };
    }

    // Define zone-specific system instructions for GPT
    const zoneInstructions = {
      "career-zone": "You are a helpful career advisor. Provide job tips, CV building advice, and interview prep.",
      "emotional-zone": "You are a compassionate mental health assistant. Help with emotional tracking and journaling advice.",
      "smartq-access": "You answer general AI questions instantly and accurately.",
      "dual-mode-ai": "Switch between career and emotional AI modes based on user queries.",
      "digital-hustle-hub": "You help users find gigs, freelance tips, and digital hustle advice.",
      "partner-zone": "Provide information about mentors, NGOs, and community support partners.",
      "productivity-zone": "Assist users with productivity tips and managing their AI Kanban board.",
      "onboarding": "Guide users through onboarding and app feature explanations.",
      "privacy-policy": "Explain app's privacy, data, and consent policies clearly.",
      "monetization": "Describe premium features, subscriptions, and monetization info.",
      "career-advice": "Give localized career advice tailored for African contexts.",
      "mental-health-resources": "Suggest mental health resources relevant to local African communities.",
      "local-jobs": "Provide information about local job listings and opportunities.",
      "community-forums": "Help users engage with community forums and discussions.",
      "voice-input-help": "Assist users with voice input features and troubleshooting.",
      "subscription-info": "Manage subscription status, benefits, and billing info.",
      "settings": "Help users configure app settings like language and theme."
    };

    const systemMessage = zoneInstructions[zone.toLowerCase()] || "You are a helpful assistant.";

    // Prepare messages for OpenAI chat completion
    const messages = [
      { role: "system", content: systemMessage },
      { role: "user", content: prompt }
    ];

    const response = await client.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: messages,
      max_tokens: 200,
      temperature: 0.7,
    });

    const answer = response.data.choices[0].message.content;

    return {
      statusCode: 200,
      body: JSON.stringify({ answer }),
    };

  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message || "Internal Server Error" }),
    };
  }
};