import http from "./httpService";
import config from "../config.json";
const apiEndpoint = config.apiURL + "/about";
export function getAbouts() {
  return http.get(apiEndpoint);
}
export function getAbout(aboutId) {
  return http.get(apiEndpoint + "/" + aboutId);
}
export function deleteAbout(aboutId) {
  return http.delete(apiEndpoint + "/" + aboutId);
}

export function saveAbout(abouts) {
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
