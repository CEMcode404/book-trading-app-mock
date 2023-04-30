import "jwt-decode";
import http from "./httpService";
import { storeToken, removeToken } from "./authService";

function register(data, cb) {
  http
    .post("/api/signup", data)
    .then((response) => {
      storeToken(response.headers.get("x-auth-token"));
      cb();
    })
    .catch((err) => {
      console.log(err);
    });
}

function login(data, cb) {
  // try {
  //   const result = await http.post("/api/auth", data);
  //   storeToken(result.data);
  // } catch (err) {
  //   console.log(err);
  // }

  http
    .post("/api/auth", data)
    .then((result) => {
      storeToken(result.data);
      cb();
    })
    .catch((err) => {
      console.log(err);
    });
}

function logout() {
  removeToken();
}

export { register, login, logout };
