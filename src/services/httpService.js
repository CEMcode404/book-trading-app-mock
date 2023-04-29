import axios from "axios";

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

export default {
  get: axios.get,
  post: axios.post,
  put: axios.put,
  delete: axios.delete,
};
