import client from "./client";

export function getAllJobs() {
  return client.get("/jobs").then((res) => res.data.jobs || []);
}

export function getJobById(id) {
  return client.get(`/jobs/${id}`).then((res) => res.data.job);
}

export function createJob(payload) {
  return client.post("/admin/jobs", payload).then((res) => res.data);
}

export function updateJob(id, payload) {
  return client.put(`/admin/jobs/${id}`, payload).then((res) => res.data);
}

export function archiveJob(id) {
  return client.delete(`/admin/jobs/${id}`).then((res) => res.data);
}
