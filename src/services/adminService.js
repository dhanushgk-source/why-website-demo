// adminService.js
import API from "./api";

const getToken = () => {
  return localStorage.getItem("token");
};

/* ======================
   JOBS
====================== */

export const createJob = async (jobData) => {
  const response = await API.post("/jobs", jobData, {
    headers: { Authorization: `Bearer ${getToken()}` },
  });
  return response.data;
};

export const updateJob = async (id, jobData) => {
  const response = await API.put(`/jobs/${id}`, jobData, {
    headers: { Authorization: `Bearer ${getToken()}` },
  });
  return response.data;
};

export const deleteJob = async (id) => {
  const response = await API.delete(`/jobs/${id}`, {
    headers: { Authorization: `Bearer ${getToken()}` },
  });
  return response.data;
};

/* ======================
   APPLICATIONS
====================== */

export const getApplications = async () => {
  const response = await API.get("/applications", {
    headers: { Authorization: `Bearer ${getToken()}` },
  });
  return response.data;
};

export const updateApplicationStatus = async (applicationId, status) => {
  const response = await API.put(
    `/applications/${applicationId}/status`,
    { status },
    { headers: { Authorization: `Bearer ${getToken()}` } }
  );
  return response.data;
};