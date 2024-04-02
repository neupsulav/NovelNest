const mongoose = require("mongoose");
const User = require("./User");
const Cart = require("./Cart");

const orderSchema = new mongoose.Schema({
  fname: {
    type: String,
  },
  lname: {
    type: String,
  },
  email: {
    type: String,
  },
  gender: {
    type: String,
  },
  address1: {
    type: String,
  },
  address2: {
    type: String,
  },
  city: {
    type: String,
  },
  postalcode: {
    type: Number,
  },
  country: {
    type: String,
  },
  phone: {
    type: String,
  },
  paymentProofImage: {
    type: String,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: User,
  },
  cart: {
    type: mongoose.Schema.Types.ObjectId,
    ref: Cart,
  },
  amount: {
    type: Number,
  },
  approved: {
    type: Boolean,
    default: false,
  },
  processing: {
    type: Boolean,
    default: false,
  },
  shipped: {
    type: Boolean,
    default: false,
  },
  delivered: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Order", orderSchema);
