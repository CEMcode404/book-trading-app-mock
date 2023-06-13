const { Cache } = require("../cache");

let cache = new Cache();

function getCache() {
  return cache;
}

function isInCache(key) {
  return cache.exists(key);
}

function getKeyValue(key) {
  return cache.get(key);
}

function setKeyValue(key, value) {
  return cache.set(key, value);
}

module.exports = {
  isInCache,
  getCache,
  getKeyValue,
  setKeyValue,
};
