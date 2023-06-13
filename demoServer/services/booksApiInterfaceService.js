const axios = require("axios");
const { getLogger } = require("../startup/logging");

async function searchBooksWithName(bookName) {
  let result;
  try {
    result = await axios.get(
      "https://www.googleapis.com/books/v1/volumes?fields=items(volumeInfo(title,subtitle,categories,description,industryIdentifiers,pageCount,authors,publishedDate,publisher,imageLinks))&q=" +
        bookName +
        "&key=" +
        process.env.G_BOOKS_API_KEY
    );
    result = result.data;
    return result;
  } catch (err) {
    getLogger().log("Error while quering data from google books api.");
    return Error("Error while quering data from google books api.");
  }
}

module.exports = {
  searchBooksWithName,
};
