import http from "../services/httpService";

const baseUrl = process.env.RESOURCE_SERVER_URL;

function changeUserInfo(data, cb) {
  http
    .put(`${baseUrl}/api/user/updateUserData`, data)
    .then((result) => {
      let err;
      cb(result, err);
    })
    .catch((err) => {
      let result;
      cb(result, err);
    });
}

export { changeUserInfo };
