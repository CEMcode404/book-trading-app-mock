import http from "./httpService";

function getReviews(cb) {
  http
    .get("http://localhost:8000/api/review/getReviews")
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
