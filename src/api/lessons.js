import client from "./client";

export function getLessons(moduleId) {
  return client.get(`/admin/modules/${moduleId}/lessons`).then((res) => res.data.lessons || []);
}

export function createLesson(moduleId, payload) {
  return client
    .post(`/admin/modules/${moduleId}/lessons`, payload, {
      headers: { "Content-Type": "multipart/form-data" },
    })
    .then((res) => res.data);
}

export function updateLesson(moduleId, lessonId, payload) {
  return client
    .put(`/admin/modules/${moduleId}/lessons/${lessonId}`, payload, {
      headers: { "Content-Type": "multipart/form-data" },
    })
    .then((res) => res.data);
}

export function deleteLesson(moduleId, lessonId) {
  return client.delete(`/admin/modules/${moduleId}/lessons/${lessonId}`).then((res) => res.data);
}

// orderedIds: full list of lesson ids for this module, in the desired order
export function reorderLessons(moduleId, orderedIds) {
  return client
    .put(`/admin/modules/${moduleId}/lessons/reorder`, { lesson_ids: orderedIds })
    .then((res) => res.data);
}
