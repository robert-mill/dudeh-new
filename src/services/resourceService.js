import http from "./httpService";
import config from "../config.json";
const apiEndpoint = config.apiURL + "/resource";
export function getResources() {
  return http.get(apiEndpoint);
}
export function getResource(resourceId) {
  return http.get(apiEndpoint + "/" + resourceId);
}
export function deleteResource(resourceId) {
  return http.delete(apiEndpoint + "/" + resourceId);
}

export function saveResource(resources) {
  const firstData = { ...resources };
  const body = { ...resources };
  delete body._id;
  console.log(firstData._id);
  if (firstData._id && firstData._id !== "new") {
    console.log(body);
    return http.put(apiEndpoint + "/" + firstData._id, body);
  }
  return http.post(apiEndpoint, body);
}
