exports.handler = async (event) => {
  const token = event.headers.authorization;

  if (token === "Bearer demo-token") {
    return {
      statusCode: 200,
      body: JSON.stringify({ authenticated: true }),
    };
  }

  return {
    statusCode: 401,
    body: JSON.stringify({ authenticated: false }),
  };
};