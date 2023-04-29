import "jwt-decode";
import http from "./httpService";
import { getCurrentUser, storeToken } from "./authService";

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

function login(data) {
  http
    .post("/api/auth", data)
    .then((result) => {
      storeToken(result.data);
      getCurrentUser();
    })
    .catch((err) => {
      console.log(err);
    });
}

export default { register, login };
