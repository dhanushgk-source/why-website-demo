import API from "./api";

export const getMyCertificates = () => API.get("/certificates/my/all");

export const getCertificateById = (id) => API.get(`/certificates/${id}`);
