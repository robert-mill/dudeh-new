import http from "./httpService";
import config from "../config.json";
const apiEndpoint = config.apiURL + "/nrlGroup";

export function getNrlGroups() {
  return http.get(apiEndpoint);
}

export function getNrlGroup(nrlId) {
  return http.get(apiEndpoint + "/" + nrlId);
}

export function saveNrlGroup(nrls) {
  const firstData = { ...nrls };
  const body = { ...nrls };
  delete body._id;
  console.log(firstData._id);
  if (firstData._id && firstData._id !== "new") {
    console.log(body);
    return http.put(apiEndpoint + "/" + firstData._id, body);
  }
  return http.post(apiEndpoint, body);
}

export function deleteNrlGroup(nrlId) {
  return http.delete(apiEndpoint + "/" + nrlId);
}
