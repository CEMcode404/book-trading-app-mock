const { v4: uuidv4, validate } = require("uuid");

class Context {
  #store;
  #allowedKeys;
  constructor(keys = [], initData = []) {
    this.#store = { ...initData };
    this.#allowedKeys = ["_id", ...keys];
  }

  #moldDataToModel(obj) {
    let filteredObj = {};
    for (const prop in obj) {
      if (this.#allowedKeys.includes(prop)) {
        filteredObj[prop] = obj[prop];
      }
    }

    return { ...filteredObj };
  }

  #getStoreLength() {
    return Object.keys(this.#store).length;
  }

  save(item) {
    item = this.#moldDataToModel(item);
    const _id = uuidv4();
    this.#store[_id] = { _id: _id };

    for (const prop in item) {
      this.#store[_id][prop] = item[prop];
    }

    const returnObj = this.#store[_id];
    return Object.keys(returnObj).length < 1 ? null : { ...returnObj };
  }

  findById(id) {
    const returnObj = this.#store[id];
    return Object.keys(returnObj).length < 1 ? null : { ...returnObj };
  }

  findByIdAndUpdate(id, newData) {
    newData = this.#moldDataToModel(newData);
    const obj = this.#store[id];
    for (const prop in newData) {
      obj[prop] = newData[prop];
    }

    const returnObj = this.#store[id];
    return Object.keys(returnObj).length < 1 ? null : { ...returnObj };
  }

  //temp func
  getAll() {
    return this.#getStoreLength() > 0 ? { ...this.#store } : null;
  }

  findOne(obj) {
    const key = Object.keys(obj)[0];
    const objArrays = Object.values(this.#store);
    const returnObj = objArrays.find((data) => data[key] === obj[key]);

    if (returnObj) return { ...returnObj };
    return returnObj;
  }

  deleteById(id) {
    if (!this.#store[id]) return null;
    delete this.#store[id];
    return true;
  }

  select(obj, string) {
    if (!obj) return null;
    let newObj = obj;
    if (string.indexOf("-") > -1) {
      string = string.replaceAll("-", "");
      const param = string.split(" ");
      for (let i = 0; i < param.length; i++) {
        delete newObj[param[i]];
      }
      return newObj;
    }

    newObj = {};
    const param = string.split(" ");
    for (let i = 0; i < param.length; i++) {
      newObj[param[i]] = obj[param[i]];
    }
    return newObj;
  }
}

function validateId(id) {
  return validate(id);
}

module.exports = { Context, validateId };
