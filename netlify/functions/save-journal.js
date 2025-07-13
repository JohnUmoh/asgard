const fs = require('fs');
const path = require('path');

// In a real app, replace with a proper DB like DynamoDB, FaunaDB, etc.
const DATA_FILE = path.resolve(__dirname, 'journals.json');

// Helper to read data file safely
function readData() {
  try {
    const data = fs.readFileSync(DATA_FILE, 'utf-8');
    return JSON.parse(data);
  } catch {
    return {};
  }
}

// Helper to write data file safely
function writeData(data) {
  fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2), 'utf-8');
}

exports.handler = async function(event, context) {
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: 'Method not allowed' }),
    };
  }

  try {
    const { userId, zone, journalEntry } = JSON.parse(event.body);

    if (!userId || !zone || !journalEntry) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'Missing userId, zone, or journalEntry' }),
      };
    }

    // Validate zone (optional, only accept predefined zones)
    const validZones = [
      "career-zone",
      "emotional-zone",
      "smartq-access",
      "dual-mode-ai",
      "digital-hustle-hub",
      "partner-zone",
      "productivity-zone",
      "onboarding",
      "privacy-policy",
      "monetization",
      "career-advice",
      "mental-health-resources",
      "local-jobs",
      "community-forums",
      "voice-input-help",
      "subscription-info",
      "settings"
    ];

    if (!validZones.includes(zone)) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'Invalid zone' }),
      };
    }

    // Load existing journals
    const data = readData();

    // Initialize user data if not present
    if (!data[userId]) data[userId] = {};

    if (!data[userId][zone]) data[userId][zone] = [];

    // Add new journal entry with timestamp
    data[userId][zone].push({
      entry: journalEntry,
      timestamp: new Date().toISOString(),
    });

    // Save back to storage
    writeData(data);

    return {
      statusCode: 200,
      body: JSON.stringify({ message: 'Journal entry saved successfully' }),
    };

  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: err.message || 'Internal Server Error' }),
    };
  }
};