import http from "./httpService";
import config from "../config.json";
const apiEndpoint = config.apiURL + "/actor";
export function getActors() {
  return http.get(apiEndpoint);
}
export function getActor(actorId) {
  return http.get(apiEndpoint + "/" + actorId);
}
export function deleteActor(actorId) {
  return http.delete(apiEndpoint + "/" + actorId);
}

export function saveActor(actors) {
  const firstData = { ...actors };
  const body = { ...actors };
  delete body._id;
  if (firstData._id && firstData._id !== "new") {
    return http.put(apiEndpoint + "/" + firstData._id, body);
  }
  return http.post(apiEndpoint, body);
}
