import http from "./httpService";

function searchBookWithName(bookName) {
  http
    .get("/api/books/" + bookName)
    .then((result) => {
      console.log(result);
    })
    .catch((err) => {
      console.log(err);
    });
}

export { searchBookWithName };
