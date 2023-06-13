const express = require("express");
const { searchBooksWithName } = require("../services/booksApiInterfaceService");
const cacheCheck = require("../middleware/cacheCheck");
const { setKeyValue } = require("../startup/cache");
const router = express.Router();

router.get("/:name", cacheCheck, async (req, res) => {
  if (!process.env.G_BOOKS_API_KEY) return res.end();

  const searchName = req.params.name;
  if (!searchName) {
    return res.status(400).end();
  }
  let result = await searchBooksWithName(searchName);
  setKeyValue(searchName, JSON.stringify(result));
  return res.send(result);
});

module.exports = router;
