import http from "./httpService";
import config from "../config.json";
const apiEndpoint = config.apiURL + "/actorGroup";

export function getActorGroups() {
  return http.get(apiEndpoint);
}

export function getActorGroup(actorId) {
  return http.get(apiEndpoint + "/" + actorId);
}

export function saveActorGroup(actors) {
  const firstData = { ...actors };
  const body = { ...actors };
  delete body._id;
  if (firstData._id && firstData._id !== "new") {
    return http.put(apiEndpoint + "/" + firstData._id, body);
  }
  return http.post(apiEndpoint, body);
}

export function deleteActorGroup(actorId) {
  return http.delete(apiEndpoint + "/" + actorId);
}
