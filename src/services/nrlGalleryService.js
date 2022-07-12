import http from "./httpService";
import config from "../config.json";
const apiEndpoint = config.apiURL + "/nrlGallery";

export function getNrlGallerys() {
  return http.get(apiEndpoint);
}

export function getNrlGallery(nrlGalleryId) {
  return http.get(apiEndpoint + "/" + nrlGalleryId);
}

export function saveNrlGallery(nrlGallerys) {
  const firstData = { ...nrlGallerys };
  const body = { ...nrlGallerys };
  delete body._id;
  if (firstData._id && firstData._id !== "new") {
    return http.put(apiEndpoint + "/" + firstData._id, body);
  }
  return http.post(apiEndpoint, body);
}

export function deleteNrlGallery(nrlGalleryId) {
  return http.delete(apiEndpoint + "/" + nrlGalleryId);
}
