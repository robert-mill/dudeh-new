import http from "./httpService";
import config from "../config.json";
const apiEndpoint = config.apiURL + "/profile";
export function getProfiles() {
  return http.get(apiEndpoint);
}
export function getProfile(profileId) {
  return http.get(apiEndpoint + "/" + profileId);
}
export function deleteProfile(profileId) {
  return http.delete(apiEndpoint + "/" + profileId);
}

export function saveProfile(profiles) {
  const firstData = { ...profiles };
  const body = { ...profiles };
  delete body._id;
  if (firstData._id && firstData._id !== "new") {
    return http.put(apiEndpoint + "/" + firstData._id, body);
  }
  return http.post(apiEndpoint, body);
}
