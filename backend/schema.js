const { Decimal128 } = require("mongodb");
const mongoose = require("mongoose");

let schema = new mongoose.Schema({
  name: String,
  description: String,
  quantity: Number,
  price: Decimal128,
  category: String,
});

const schemas = new mongoose.model("products", schema);
module.exports = schemas;
