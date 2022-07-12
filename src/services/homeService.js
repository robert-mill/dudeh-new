import http from "./httpService";
import config from "../config.json";
const apiEndpoint = config.apiURL + "/home";

export function getHomePages() {
  return http.get(apiEndpoint);
}

export function getHomePage(homeId) {
  return http.get(apiEndpoint + "/" + homeId);
}

export function saveHomePage(homes) {
  const firstData = { ...homes };
  const body = { ...homes };
  delete body._id;
  console.log(firstData._id);
  if (firstData._id && firstData._id !== "new") {
    console.log(body);
    return http.put(apiEndpoint + "/" + firstData._id, body);
  }
  return http.post(apiEndpoint, body);
}

export function deleteHomePage(homeId) {
  return http.delete(apiEndpoint + "/" + homeId);
}
