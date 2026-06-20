// jobService.js
import API from "./api";

export const getAllJobs = async () => {
  const response = await API.get("/jobs");
  return response.data;
};

export const getJobById = async (id) => {
  const response = await API.get(`/jobs/${id}`);
  return response.data;
};

export const applyJob = async (
  jobId,
  resumeUrl,
  token
) => {

  const response = await API.post(
    "/applications/apply",
    {
      jobId,
      resumeUrl,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};