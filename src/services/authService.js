import jwtDecode from "jwt-decode";

function storeToken(token) {
  localStorage.setItem("token", token);
}

function getCurrentUser() {
  const token = localStorage.getItem("token");
  if (token) {
    const { firstName } = jwtDecode(token);
    return firstName;
  }
  return;
}

export { storeToken, getCurrentUser };
