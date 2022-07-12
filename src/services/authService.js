import jwtDecode from "jwt-decode";
import http from "./httpService";
import config from "../config.json";

const apiEndpoint = config.apiURL + "/auth";
const tokenKey = "token";
http.setJwt(getJwt());
export async function login(email, password) {
  const { data: jwt } = await http.post(apiEndpoint, { email, password });
  localStorage.setItem(tokenKey, jwt);
}
export function loginWithJWT(jwt) {
  localStorage.setItem(tokenKey, jwt);
}
export function logout() {
  localStorage.removeItem(tokenKey);
}
export function getJwt() {
  return localStorage.getItem(tokenKey);
}
export function getRole() {
  try {
    const decoded = jwtDecode(localStorage.getItem(tokenKey));
    if (decoded.IsAdmin === config.apiIA) {
      return decoded.IsAdmin;
    } else {
      return decoded.IsAdmin;
    }
  } catch (ex) {
    return false;
  }
}
export function getCurrentUser() {
  try {
    const jwt = localStorage.getItem(tokenKey);
    return jwtDecode(jwt);
  } catch (ex) {
    return null;
  }
}
export default {
  login,
  loginWithJWT,
  logout,
  getCurrentUser,
  getRole,
};
