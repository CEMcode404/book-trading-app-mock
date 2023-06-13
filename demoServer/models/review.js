const { Context } = require("../db");
const reviews = require("../mockDatas/reviewCardComments.json");

const Review = new Context(["imgSrc", "star", "name", "message"], reviews);

module.exports = { Review };
