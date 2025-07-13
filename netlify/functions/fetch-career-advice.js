exports.handler = async (event) => {
  const region = event.queryStringParameters.region || "general";

  const adviceMap = {
    ng: "Try NYSC portals, local tech hubs like Andela, and Nairaland job boards.",
    ke: "Check Ajira, BrighterMonday Kenya, and Upwork gigs.",
    general: "Build your online profile, create a strong CV, and join freelance platforms."
  };

  return {
    statusCode: 200,
    body: JSON.stringify({ advice: adviceMap[region] || adviceMap.general }),
  };
};