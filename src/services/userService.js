import "jwt-decode";
import http from "./httpService";
import { storeToken, removeToken } from "./tokenService.js";

function register(data, cb) {
  http
    .post("/api/signup", data)
    .then((response) => {
      let err;
      storeToken(response.headers.get("Authorization"));
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

function fetchUserData(userId, cb) {
  http
    .get("/api/user/" + userId)
    .then((result) => {
      cb(result);
    })
    .catch((err) => {
      console.log(err);
    });
}

function verifyUserIdentity(password, id, cb) {
  http
    .post("/api/auth/withID", { password, id })
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
