import http from "./httpService";
import config from "../config.json";
const apiEndpoint = config.apiURL + "/divingGroup";

export function getDivingGroups() {
  return http.get(apiEndpoint);
}

export function getDivingGroup(divingId) {
  return http.get(apiEndpoint + "/" + divingId);
}

export function saveDivingGroup(divings) {
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

export function deleteDivingGroup(divingId) {
  return http.delete(apiEndpoint + "/" + divingId);
}
