import client from "./client";

export function getAllTrainingPrograms() {
  return client.get("/trainings").then((res) => res.data.trainings || []);
}

export function getTrainingProgramById(id) {
  return client.get(`/trainings/${id}`).then((res) => res.data.training);
}

export function createTrainingProgram(payload) {
  return client
    .post("/admin/trainings", payload, {
      headers: { "Content-Type": "multipart/form-data" },
    })
    .then((res) => res.data);
}

export function updateTrainingProgram(id, payload) {
  return client
    .put(`/admin/trainings/${id}`, payload, {
      headers: { "Content-Type": "multipart/form-data" },
    })
    .then((res) => res.data);
}

export function archiveTrainingProgram(id) {
  return client.delete(`/admin/trainings/${id}`).then((res) => res.data);
}
