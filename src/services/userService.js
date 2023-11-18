import "jwt-decode";
import http from "./httpService";
import { storeToken, removeToken } from "./tokenService.js";

const baseUrl = process.env.RESOURCE_SERVER_URL;

function register(data, cb) {
  http
    .post(`${baseUrl}/api/user/signup`, data)
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
    return await http.post(`${baseUrl}/api/user/signup/email`, email);
  } catch (err) {
    return err;
  }
}

function login(data, cb) {
  http
    .post(`${baseUrl}/api/auth/login`, data)
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

function loginDemo(cb) {
  http
    .get(`${baseUrl}/api/auth/login-demo`)
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
    .get(`${baseUrl}/api/user/getUserData`)
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
    .post(`${baseUrl}/api/auth/withID`, { password })
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
  loginDemo,
  logout,
  fetchUserData,
  verifyUserIdentity,
  checkEmailAvailability,
};
