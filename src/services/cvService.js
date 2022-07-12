import http from "./httpService";
import config from "../config.json";
const apiEndpoint = config.apiURL + "/cv";
export function getCvs() {
  return http.get(apiEndpoint);
}
export function getCv(cvId) {
  return http.get(apiEndpoint + "/" + cvId);
}
export function deleteCv(cvId) {
  return http.delete(apiEndpoint + "/" + cvId);
}

export function saveCv(cvs) {
  const firstData = { ...cvs };
  const body = { ...cvs };
  delete body._id;
  if (firstData._id && firstData._id !== "new") {
    return http.put(apiEndpoint + "/" + firstData._id, body);
  }
  return http.post(apiEndpoint, body);
}
