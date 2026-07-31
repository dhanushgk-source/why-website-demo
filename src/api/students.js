import client from "./client";

export function getAllStudents() {
  return client.get("/students").then((res) => res.data.students || []);
}

export function getStudentById(id) {
  return client.get(`/students/${id}`).then((res) => res.data.student);
}

export function createStudent(payload) {
  return client.post("/admin/students", payload).then((res) => res.data);
}

export function updateStudent(id, payload) {
  return client.put(`/admin/students/${id}`, payload).then((res) => res.data);
}

export function archiveStudent(id) {
  return client.delete(`/admin/students/${id}`).then((res) => res.data);
}

export function setStudentStatus(id, status) {
  return client.patch(`/admin/students/${id}/status`, { status }).then((res) => res.data);
}

export function resetStudentPassword(id) {
  return client.post(`/admin/students/${id}/reset-password`).then((res) => res.data);
}
