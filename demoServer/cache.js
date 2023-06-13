class Cache {
  #store;
  constructor(initData = []) {
    this.#store = { ...initData };
  }

  set(key, value) {
    this.#store[key] = value;
  }

  get(key) {
    return this.#store[key];
  }

  exists(key) {
    return this.#store.hasOwnProperty(key);
  }

  remove(key) {
    delete this.#store[key];
  }

  clearAll() {
    this.#store = {};
  }
}

module.exports = { Cache };
