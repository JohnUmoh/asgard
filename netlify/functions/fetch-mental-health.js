exports.handler = async (event) => {
  const country = event.queryStringParameters.country || "general";

  const resources = {
    ng: ["Mentally Aware Nigeria Initiative", "She Writes Woman", "HelloDoc Teletherapy"],
    ke: ["Chiromo Hospital Group", "MEHMA Kenya"],
    general: ["WHO Mental Health Toolkit", "Mind.org", "BetterHelp"]
  };

  return {
    statusCode: 200,
    body: JSON.stringify({ support: resources[country] || resources.general }),
  };
};