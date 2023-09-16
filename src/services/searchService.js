import http from "./httpService";

const baseUrl = process.env.RESOURCE_SERVER_URL;

function searchBookWithName(bookName, cb) {
  http
    .get(`${baseUrl}/api/books/${bookName}`)
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
