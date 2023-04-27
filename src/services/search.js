import axios from "axios";

function searchBookWithName(bookName) {
  axios
    .get("/api/books/" + bookName)
    .then((result) => {
      console.log(result);
    })
    .catch((err) => {
      console.log(err);
    });
}

export { searchBookWithName };
