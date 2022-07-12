import http from "./httpService";
import config from "../config.json";
const apiEndpoint = config.apiURL + "/holidayGallery";

export function getHolidayGallerys() {
  return http.get(apiEndpoint);
}

export function getHolidayGallery(holidayGalleryId) {
  return http.get(apiEndpoint + "/" + holidayGalleryId);
}

export function saveHolidayGallery(holidayGallerys) {
  const firstData = { ...holidayGallerys };
  const body = { ...holidayGallerys };
  delete body._id;
  if (firstData._id && firstData._id !== "new") {
    return http.put(apiEndpoint + "/" + firstData._id, body);
  }
  return http.post(apiEndpoint, body);
}

export function deleteHolidayGallery(holidayGalleryId) {
  return http.delete(apiEndpoint + "/" + holidayGalleryId);
}
