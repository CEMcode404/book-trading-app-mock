import "jwt-decode";
import http from "./httpService";
import { storeToken, removeToken } from "./authService";

function register(data) {
  http
    .post("/api/signup", data)
    .then((response) => {
      storeToken(response.headers.get("x-auth-token"));
    })
    .catch((err) => {
      console.log(err);
    });
}

async function login(data) {
  try {
    const result = await http.post("/api/auth", data);
    storeToken(result.data);
  } catch (err) {
    console.log(err);
  }
}

function logout() {
  removeToken();
}

export { register, login, logout };
