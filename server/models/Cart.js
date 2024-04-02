const mongoose = require("mongoose");
const User = require("./User");
const Product = require("./Product");

const cartSchema = new mongoose.Schema({
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: User,
  },
  products: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: Product,
    },
  ],
});

module.exports = mongoose.model("Cart", cartSchema);
