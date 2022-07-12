import http from "./httpService";
import config from "../config.json";
const apiEndpoint = config.apiURL + "/nrl";
export function getNrlPages() {
  return http.get(apiEndpoint);
}
export function getNrlPage(nrlId) {
  return http.get(apiEndpoint + "/" + nrlId);
}
export function deleteNrlPage(nrlId) {
  return http.delete(apiEndpoint + "/" + nrlId);
}

export function saveNrlPage(nrls) {
  const firstData = { ...nrls };
  const body = { ...nrls };
  delete body._id;
  if (firstData._id && firstData._id !== "new") {
    return http.put(apiEndpoint + "/" + firstData._id, body);
  }
  return http.post(apiEndpoint, body);
}
