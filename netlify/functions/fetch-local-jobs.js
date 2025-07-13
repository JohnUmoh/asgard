exports.handler = async (event) => {
  const country = event.queryStringParameters.country || "ng";

  const jobs = {
    ng: ["https://jobberman.com.ng", "https://nyscjobs.com", "https://remoteafrica.io"],
    ke: ["https://brightermonday.co.ke", "https://myjobsinkenya.com"],
    general: ["https://remoteok.io", "https://indeed.com"]
  };

  return {
    statusCode: 200,
    body: JSON.stringify({ jobs: jobs[country] || jobs.general }),
  };
};