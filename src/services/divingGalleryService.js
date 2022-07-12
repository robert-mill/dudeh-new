import http from "./httpService";
import config from "../config.json";
const apiEndpoint = config.apiURL + "/divingGallery";

export function getDivingGallerys() {
  return http.get(apiEndpoint);
}

export function getDivingGallery(divingGalleryId) {
  return http.get(apiEndpoint + "/" + divingGalleryId);
}

export function saveDivingGallery(divingGallerys) {
  const firstData = { ...divingGallerys };
  const body = { ...divingGallerys };
  delete body._id;
  console.log(firstData._id);
  if (firstData._id && firstData._id !== "new") {
    console.log(body);
    return http.put(apiEndpoint + "/" + firstData._id, body);
  }
  return http.post(apiEndpoint, body);
}

export function deleteDivingGallery(divingGalleryId) {
  return http.delete(apiEndpoint + "/" + divingGalleryId);
}
