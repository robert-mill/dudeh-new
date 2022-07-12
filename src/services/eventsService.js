import http from "./httpService";
import config from "../config.json";
const apiEndpoint = config.apiURL + "/events";

export function getEvents() {
  return http.get(apiEndpoint);
}

export function getEvent(eventId) {
  return http.get(apiEndpoint + "/" + eventId);
}

export function saveEvent(events) {
  const firstData = { ...events };
  const body = { ...events };
  delete body._id;
  console.log(firstData._id);
  if (firstData._id && firstData._id !== "new") {
    console.log(body);
    return http.put(apiEndpoint + "/" + firstData._id, body);
  }
  return http.post(apiEndpoint, body);
}

export function deleteEvent(eventId, imgId) {
  return http.delete(apiEndpoint + "/" + eventId);
}
