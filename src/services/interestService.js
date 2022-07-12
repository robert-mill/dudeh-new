import http from "./httpService";
import config from "../config.json";
const apiEndpoint = config.apiURL + "/interests";
export function getInterests() {
  return http.get(apiEndpoint);
}
export function getInterest(interestsId) {
  return http.get(apiEndpoint + "/" + interestsId);
}
export function deleteInterest(interestsId) {
  return http.delete(apiEndpoint + "/" + interestsId);
}

export function saveInterest(interestss) {
  const firstData = { ...interestss };
  const body = { ...interestss };
  delete body._id;
  if (firstData._id && firstData._id !== "new") {
    return http.put(apiEndpoint + "/" + firstData._id, body);
  }
  return http.post(apiEndpoint, body);
}
