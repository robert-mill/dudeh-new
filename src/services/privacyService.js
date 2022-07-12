import http from "./httpService";
import config from "../config.json";
const apiEndpoint = config.apiURL + "/cbeprivacy";

export function getPrivacys() {
  return http.get(apiEndpoint);
}

export function getPrivacy(privacyId) {
  return http.get(apiEndpoint + "/" + privacyId);
}

export function savePrivacy(privacys) {
  const firstData = { ...privacys };
  const body = { ...privacys };
  delete body._id;
  console.log(firstData._id);
  if (firstData._id && firstData._id !== "new") {
    console.log(body);
    return http.put(apiEndpoint + "/" + firstData._id, body);
  }
  return http.post(apiEndpoint, body);
}

export function deletePrivacy(privacyId) {
  return http.delete(apiEndpoint + "/" + privacyId);
}
