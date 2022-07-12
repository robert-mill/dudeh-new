import http from "./httpService";
import config from "../config.json";
const apiEndpoint = config.apiURL + "/qualifications";
export function getQualificationss() {
  return http.get(apiEndpoint);
}
export function getQualifications(qualificationsId) {
  return http.get(apiEndpoint + "/" + qualificationsId);
}
export function deleteQualifications(qualificationsId) {
  return http.delete(apiEndpoint + "/" + qualificationsId);
}

export function saveQualifications(qualificationss) {
  const firstData = { ...qualificationss };
  const body = { ...qualificationss };
  delete body._id;
  if (firstData._id && firstData._id !== "new") {
    return http.put(apiEndpoint + "/" + firstData._id, body);
  }
  return http.post(apiEndpoint, body);
}
