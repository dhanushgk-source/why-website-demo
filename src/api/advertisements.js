import client from "./client";

export function getAllAdvertisements() {
  return client.get("/ads").then((res) => res.data.data || []);
}

export function getAdvertisementById(id) {
  return client.get(`/ads/${id}`).then((res) => res.data.data);
}

export function createAdvertisement(payload) {
  return client
    .post("/ads", payload, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
    .then((res) => res.data);
}

export function updateAdvertisement(id, payload) {
  return client
    .put(`/ads/${id}`, payload, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
    .then((res) => res.data);
}

export function deleteAdvertisement(id) {
  return client.delete(`/ads/${id}`).then((res) => res.data);
}