import http from "./httpService";
import config from "../config.json";
const apiEndpoint = config.apiURL + "/diving";
export function getDivingPages() {
  return http.get(apiEndpoint);
}
export function getDivingPage(divingId) {
  return http.get(apiEndpoint + "/" + divingId);
}
export function deleteDivingPage(divingId) {
  return http.delete(apiEndpoint + "/" + divingId);
}

export function saveDivingPage(divings) {
  const firstData = { ...divings };
  const body = { ...divings };
  delete body._id;
  console.log(firstData._id);
  if (firstData._id && firstData._id !== "new") {
    console.log(body);
    return http.put(apiEndpoint + "/" + firstData._id, body);
  }
  return http.post(apiEndpoint, body);
}
