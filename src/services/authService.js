import jwtDecode from "jwt-decode";

function storeToken(token) {
  localStorage.setItem("token", token);
}

function getCurrentUser() {
  const token = localStorage.getItem("token");
  const { firstName } = jwtDecode(token);
  return firstName;
}

export { storeToken, getCurrentUser };
