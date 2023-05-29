import jwtDecode from "jwt-decode";

function storeToken(token) {
  localStorage.setItem("token", token);
}

function getCurrentUser() {
  const token = localStorage.getItem("token");
  if (token) {
    const currentUser = jwtDecode(token);
    return currentUser;
  }
  return;
}

function getToken() {
  return localStorage.getItem("token");
}

function removeToken() {
  localStorage.removeItem("token");
  localStorage.clear();
}

export { storeToken, getCurrentUser, removeToken, getToken };
