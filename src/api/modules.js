import client from "./client";

export function getModules(trainingId) {
  return client.get(`/admin/trainings/${trainingId}/modules`).then((res) => res.data.modules || []);
}

export function createModule(trainingId, payload) {
  return client.post(`/admin/trainings/${trainingId}/modules`, payload).then((res) => res.data);
}

export function updateModule(trainingId, moduleId, payload) {
  return client.put(`/admin/trainings/${trainingId}/modules/${moduleId}`, payload).then((res) => res.data);
}

export function deleteModule(trainingId, moduleId) {
  return client.delete(`/admin/trainings/${trainingId}/modules/${moduleId}`).then((res) => res.data);
}

// orderedIds: full list of module ids for this training, in the desired order
export function reorderModules(trainingId, orderedIds) {
  return client
    .put(`/admin/trainings/${trainingId}/modules/reorder`, { module_ids: orderedIds })
    .then((res) => res.data);
}
