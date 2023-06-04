import http from "./httpService";

function searchBookWithName(bookName, cb) {
  http
    .get("/api/books/" + bookName)
    .then((searchResult) => {
      let err;
      cb(searchResult, err);
    })
    .catch((err) => {
      let searchResult;
      cb(searchResult, err);
    });
}

export { searchBookWithName };
