import http from "./httpService";
import config from "../config.json";
const apiEndpoint = config.apiURL + "/aboutGroup";

export function getAboutGroups() {
  return http.get(apiEndpoint);
}

export function getAboutGroup(aboutId) {
  return http.get(apiEndpoint + "/" + aboutId);
}

export function saveAboutGroup(abouts) {
  const firstData = { ...abouts };
  const body = { ...abouts };
  delete body._id;
  console.log(firstData._id);
  if (firstData._id && firstData._id !== "new") {
    console.log(body);
    return http.put(apiEndpoint + "/" + firstData._id, body);
  }
  return http.post(apiEndpoint, body);
}

export function deleteAboutGroup(aboutId) {
  return http.delete(apiEndpoint + "/" + aboutId);
}
