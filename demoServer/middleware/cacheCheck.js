const { isInCache, getKeyValue } = require("../startup/cache");

module.exports = (req, res, next) => {
  const searchName = req.params.name;
  if (isInCache(searchName)) {
    const value = getKeyValue(searchName);
    return res.send(JSON.parse(value));
  } else {
    next();
  }
};
