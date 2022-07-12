import http from "./httpService";
import config from "../config.json";
const apiEndpoint = config.apiURL + "/music";
export function getMusics() {
  return http.get(apiEndpoint);
}
export function getMusic(musicId) {
  return http.get(apiEndpoint + "/" + musicId);
}
export function deleteMusic(musicId) {
  return http.delete(apiEndpoint + "/" + musicId);
}

export function saveMusic(musics) {
  const firstData = { ...musics };
  const body = { ...musics };
  delete body._id;
  if (firstData._id && firstData._id !== "new") {
    return http.put(apiEndpoint + "/" + firstData._id, body);
  }
  return http.post(apiEndpoint, body);
}
