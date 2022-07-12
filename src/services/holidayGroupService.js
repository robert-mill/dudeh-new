import http from "./httpService";
import config from "../config.json";
const apiEndpoint = config.apiURL + "/holidayGroup";

export function getHolidayGroups() {
  return http.get(apiEndpoint);
}

export function getHolidayGroup(holidayId) {
  return http.get(apiEndpoint + "/" + holidayId);
}

export function saveHolidayGroup(holidays) {
  const firstData = { ...holidays };
  const body = { ...holidays };
  delete body._id;
  console.log(firstData._id);
  if (firstData._id && firstData._id !== "new") {
    console.log(body);
    return http.put(apiEndpoint + "/" + firstData._id, body);
  }
  return http.post(apiEndpoint, body);
}

export function deleteHolidayGroup(holidayId) {
  return http.delete(apiEndpoint + "/" + holidayId);
}
