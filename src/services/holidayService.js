import http from "./httpService";
import config from "../config.json";
const apiEndpoint = config.apiURL + "/holiday";
export function getHolidays() {
  return http.get(apiEndpoint);
}
export function getHoliday(holidayId) {
  return http.get(apiEndpoint + "/" + holidayId);
}
export function deleteHoliday(holidayId) {
  return http.delete(apiEndpoint + "/" + holidayId);
}

export function saveHoliday(holidays) {
  const firstData = { ...holidays };
  const body = { ...holidays };
  delete body._id;
  if (firstData._id && firstData._id !== "new") {
    return http.put(apiEndpoint + "/" + firstData._id, body);
  }
  return http.post(apiEndpoint, body);
}
