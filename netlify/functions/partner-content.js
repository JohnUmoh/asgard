exports.handler = async () => {
  const content = [
    {
      title: "Join MTN MoMo",
      link: "https://momo.mtn.com.ng",
      description: "Earn from digital finance."
    },
    {
      title: "Andela Learning Community",
      link: "https://andela.com",
      description: "Upskill with global tech training."
    }
  ];

  return {
    statusCode: 200,
    body: JSON.stringify({ partners: content }),
  };
};