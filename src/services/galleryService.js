import http from "./httpService";
import config from "../config.json";
const apiEndpoint = config.apiURL + "/gallery";
export function getGallerys() {
  return http.get(apiEndpoint);
}
export function getGallery(galleryId) {
  return http.get(apiEndpoint + "/" + galleryId);
}
export function deleteGallery(galleryId) {
  return http.delete(apiEndpoint + "/" + galleryId);
}

export function saveGallery(gallerys) {
  const firstData = { ...gallerys };
  const body = { ...gallerys };
  delete body._id;
  if (firstData._id && firstData._id !== "new") {
    return http.put(apiEndpoint + "/" + firstData._id, body);
  }
  return http.post(apiEndpoint, body);
}
