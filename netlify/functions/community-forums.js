Example: Handles forum post creation (stubbed).

exports.handler = async (event) => {
  const { user, post } = JSON.parse(event.body || '{}');

  if (!user || !post) {
    return { statusCode: 400, body: "Missing post data." };
  }

  console.log(`New post from ${user}:`, post);

  return {
    statusCode: 200,
    body: JSON.stringify({ success: true, postId: Date.now() }),
  };
};
