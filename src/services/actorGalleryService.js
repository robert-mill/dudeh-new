import http from "./httpService";
import config from "../config.json";
const apiEndpoint = config.apiURL + "/actorGallery";

export function getActorGallerys() {
  return http.get(apiEndpoint);
}

export function getActorGallery(actorGalleryId) {
  return http.get(apiEndpoint + "/" + actorGalleryId);
}

export function saveActorGallery(actorGallerys) {
  const firstData = { ...actorGallerys };
  const body = { ...actorGallerys };
  delete body._id;
  console.log(firstData._id);
  if (firstData._id && firstData._id !== "new") {
    console.log(body);
    return http.put(apiEndpoint + "/" + firstData._id, body);
  }
  return http.post(apiEndpoint, body);
}

export function deleteActorGallery(actorGalleryId) {
  return http.delete(apiEndpoint + "/" + actorGalleryId);
}
