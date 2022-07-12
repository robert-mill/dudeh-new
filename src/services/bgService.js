import http from "./httpService";
import config from "../config.json";
const apiEndpoint = config.apiURL + "/bg";
export function getBgs() {
  return http.get(apiEndpoint);
}
export function getBg(bgId) {
  return http.get(apiEndpoint + "/" + bgId);
}
export function deleteBg(bgId) {
  return http.delete(apiEndpoint + "/" + bgId);
}

export function saveBg(bgs) {
  const firstData = { ...bgs };
  const body = { ...bgs };
  delete body._id;
  if (firstData._id && firstData._id !== "new") {
    return http.put(apiEndpoint + "/" + firstData._id, body);
  }
  return http.post(apiEndpoint, body);
}
