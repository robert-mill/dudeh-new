import http from "./httpService";
import config from "../config.json";
const apiEndpoint = config.apiURL + "/profileGallery";

export function getProfileGallerys() {
  return http.get(apiEndpoint);
}

export function getProfileGallery(profileGalleryId) {
  return http.get(apiEndpoint + "/" + profileGalleryId);
}

export function saveProfileGallery(profileGallerys) {
  const firstData = { ...profileGallerys };
  const body = { ...profileGallerys };
  delete body._id;
  console.log(firstData._id);
  if (firstData._id && firstData._id !== "new") {
    console.log(body);
    return http.put(apiEndpoint + "/" + firstData._id, body);
  }
  return http.post(apiEndpoint, body);
}

export function deleteProfileGallery(profileGalleryId) {
  return http.delete(apiEndpoint + "/" + profileGalleryId);
}
