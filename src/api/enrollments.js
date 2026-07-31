import client from "./client";

// Trainings currently assigned to one student
export function getStudentEnrollments(studentId) {
  return client
    .get(`/admin/students/${studentId}/trainings`)
    .then((res) => res.data.training_ids || []);
}

// Replace the full set of trainings assigned to a student
export function setStudentEnrollments(studentId, trainingIds) {
  return client
    .put(`/admin/students/${studentId}/trainings`, { training_ids: trainingIds })
    .then((res) => res.data);
}

// Students currently assigned to one training program
export function getTrainingEnrollments(trainingId) {
  return client
    .get(`/admin/trainings/${trainingId}/students`)
    .then((res) => res.data.student_ids || []);
}

// Replace the full set of students assigned to a training program
export function setTrainingEnrollments(trainingId, studentIds) {
  return client
    .put(`/admin/trainings/${trainingId}/students`, { student_ids: studentIds })
    .then((res) => res.data);
}
