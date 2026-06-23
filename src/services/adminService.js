// adminService.js
import API from "./api";

const getToken = () => {
  return localStorage.getItem("token");
};

/* ======================
   JOBS
====================== */

export const createJob = async (jobData) => {
  const response = await API.post("/admin/jobs", jobData, {
    headers: { Authorization: `Bearer ${getToken()}` },
  });
  return response.data;
};

export const updateJob = async (id, jobData) => {
  const response = await API.put(`/admin/jobs/${id}`, jobData, {
    headers: { Authorization: `Bearer ${getToken()}` },
  });
  return response.data;
};

export const deleteJob = async (id) => {
  const response = await API.delete(`/admin/jobs/${id}`, {
    headers: { Authorization: `Bearer ${getToken()}` },
  });
  return response.data;
};

/* ======================
   APPLICATIONS
====================== */

export const getApplications = async () => {
  const response = await API.get("/admin/applications", {
    headers: { Authorization: `Bearer ${getToken()}` },
  });
  return response.data;
};

export const updateApplicationStatus = async (applicationId, status) => {
  const response = await API.put(
    `/admin/applications/${applicationId}/status`,
    { status },
    { headers: { Authorization: `Bearer ${getToken()}` } }
  );
  return response.data;
};