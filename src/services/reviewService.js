import http from "./httpService";

const baseUrl = process.env.RESOURCE_SERVER_URL;

function getReviews(cb) {
  http
    .get(`${baseUrl}/api/review/getReviews`)
    .then((reviews) => {
      let err;
      cb(reviews, err);
    })
    .catch((err) => {
      let reviews;
      cb(reviews, err);
    });
}

export { getReviews };
