import http from "./httpService";
import config from "../config.json";
const apiEndpoint = config.apiURL + "/profileGroup";

export function getProfileGroups() {
  return http.get(apiEndpoint);
}

export function getProfileGroup(profileId) {
  return http.get(apiEndpoint + "/" + profileId);
}

export function saveProfileGroup(profiles) {
  const firstData = { ...profiles };
  const body = { ...profiles };
  delete body._id;
  console.log(firstData._id);
  if (firstData._id && firstData._id !== "new") {
    console.log(body);
    return http.put(apiEndpoint + "/" + firstData._id, body);
  }
  return http.post(apiEndpoint, body);
}

export function deleteProfileGroup(profileId) {
  return http.delete(apiEndpoint + "/" + profileId);
}
