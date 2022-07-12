import http from "./httpService";
import config from "../config.json";
const apiEndpoint = config.apiURL + "/aboutGallery";

export function getAboutGallerys() {
  return http.get(apiEndpoint);
}

export function getAboutGallery(aboutGalleryId) {
  return http.get(apiEndpoint + "/" + aboutGalleryId);
}

export function saveAboutGallery(aboutGallerys) {
  const firstData = { ...aboutGallerys };
  const body = { ...aboutGallerys };
  delete body._id;
  console.log(firstData._id);
  if (firstData._id && firstData._id !== "new") {
    console.log(body);
    return http.put(apiEndpoint + "/" + firstData._id, body);
  }
  return http.post(apiEndpoint, body);
}

export function deleteAboutGallery(aboutGalleryId) {
  return http.delete(apiEndpoint + "/" + aboutGalleryId);
}
