import http from "../services/httpService";

function changeUserInfo(data, cb) {
  http
    .put("http://localhost:8000/api/user/updateUserData", data)
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
