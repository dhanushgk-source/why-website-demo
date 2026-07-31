import client from "./client";

export function getAllApplications() {
  return client.get("/admin/applications").then((res) => res.data.applications || []);
}

export function updateApplicationStatus(id, status) {
  return client.put(`/admin/applications/${id}/status`, { status }).then((res) => res.data);
}
