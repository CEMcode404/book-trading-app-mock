import axios from "axios";
import { getToken } from "./tokenService";

axios.interceptors.response.use(
  (response) => {
    console.log(response, "reponse intercept");
    return response;
  },
  (error) => {
    console.log(error, "error intercept");
    return Promise.reject(error);
  }
);

axios.interceptors.request.use((req) => {
  const token = getToken();
  req.headers.Authorization = token;

  return req;
});

export default {
  get: axios.get,
  post: axios.post,
  put: axios.put,
  delete: axios.delete,
};
