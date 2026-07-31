import client from "./client";

export function getAllTeam() {
  return client.get("/team").then((res) => res.data.team || []);
}

export function getTeamById(id) {
  return client.get(`/team/${id}`).then((res) => res.data.member);
}

export function createTeamMember(formData) {
  return client
    .post("/team", formData, { headers: { "Content-Type": "multipart/form-data" } })
    .then((res) => res.data);
}

export function updateTeamMember(id, formData) {
  return client
    .put(`/team/${id}`, formData, { headers: { "Content-Type": "multipart/form-data" } })
    .then((res) => res.data);
}

export function deleteTeamMember(id) {
  return client.delete(`/team/${id}`).then((res) => res.data);
}
