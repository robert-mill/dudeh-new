import http from "./httpService";
import config from "../config.json";
const apiEndpoint = config.apiURL + "/maths";
export function getMaths() {
  return http.get(apiEndpoint);
}
export function getMath(mathId) {
  return http.get(apiEndpoint + "/" + mathId);
}
export function deleteMath(mathId) {
  return http.delete(apiEndpoint + "/" + mathId);
}

export function saveMath(maths) {
  const firstData = { ...maths };
  const body = { ...maths };
  delete body._id;
  if (firstData._id && firstData._id !== "new") {
    return http.put(apiEndpoint + "/" + firstData._id, body);
  }
  return http.post(apiEndpoint, body);
}
