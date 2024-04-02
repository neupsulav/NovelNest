const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  productId: {
    type: Number,
  },
  details: {
    type: String,
  },
  currentprice: {
    type: Number,
  },
  originalprice: {
    type: Number,
  },
  images: [
    {
      type: String,
    },
  ],
});

module.exports = mongoose.model("Products", productSchema);
