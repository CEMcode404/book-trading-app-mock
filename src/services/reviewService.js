import http from "./httpService";

function getReviews(cb) {
  http
    .get("/api/reviews")
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
