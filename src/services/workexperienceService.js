import http from "./httpService";
import config from "../config.json";
const apiEndpoint = config.apiURL + "/workexperience";
export function getWorkExperiences() {
  return http.get(apiEndpoint);
}
export function getWorkExperience(workexperienceId) {
  return http.get(apiEndpoint + "/" + workexperienceId);
}
export function deleteWorkExperience(workexperienceId) {
  return http.delete(apiEndpoint + "/" + workexperienceId);
}

export function saveWorkExperience(workexperiences) {
  const firstData = { ...workexperiences };
  const body = { ...workexperiences };
  delete body._id;
  if (firstData._id && firstData._id !== "new") {
    return http.put(apiEndpoint + "/" + firstData._id, body);
  }
  return http.post(apiEndpoint, body);
}
