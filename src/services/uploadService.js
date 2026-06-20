// uploadService.js
import API from "./api";

export const uploadResume = async (file, jobTitle, jobId) => {
  const formData = new FormData();

  formData.append("resume", file);
  formData.append("jobTitle", jobTitle);
  formData.append("jobId", jobId);

  const response = await API.post("/upload/resume", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return response.data;
};