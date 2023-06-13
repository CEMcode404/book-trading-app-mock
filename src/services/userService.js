import "jwt-decode";
import http from "./httpService";
import { storeToken, removeToken } from "./tokenService.js";

function register(data, cb) {
  http
    .post("/api/signup", data)
    .then((response) => {
      let err;
      const token = response.headers.get("Authorization");
      if (token) {
        storeToken(token);
      }
      cb(response, err);
    })
    .catch((err) => {
      let response;
      cb(response, err);
    });
}

async function checkEmailAvailability(email) {
  try {
    return await http.post("/api/signup/email", email);
  } catch (err) {
    return err;
  }
}

function login(data, cb) {
  http
    .post("/api/auth", data)
    .then((result) => {
      let err;
      storeToken(result.data);
      cb(result, err);
    })
    .catch((err) => {
      let result;
      cb(result, err);
    });
}

function logout() {
  removeToken();
}

function fetchUserData(cb) {
  http
    .get("/api/user")
    .then((result) => {
      let err;
      cb(result, err);
    })
    .catch((err) => {
      let result;
      cb(result, err);
    });
}

function verifyUserIdentity(password, cb) {
  http
    .post("/api/auth/withID", { password })
    .then((result) => {
      let err;
      cb(result, err);
    })
    .catch((err) => {
      let result;
      cb(result, err);
    });
}

export {
  register,
  login,
  logout,
  fetchUserData,
  verifyUserIdentity,
  checkEmailAvailability,
};
