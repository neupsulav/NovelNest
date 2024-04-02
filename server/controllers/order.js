const catchAsync = require("../middlewares/catchAsync");
const ErrorHandler = require("../middlewares/errorHandler");
const Cart = require("../models/Cart");
const Order = require("../models/Order");
const User = require("../models/User");

const createOrder = catchAsync(async (req, res, next) => {
  const userId = req.user.userId;
  const {
    fname,
    lname,
    email,
    gender,
    address1,
    address2,
    city,
    postalcode,
    country,
    phone,
    // paymentProofImage,
  } = req.body;

  //   to find user cart
  let totalPrice = 0;

  const usersCart = await Cart.findOne({ owner: userId })
    .select("products")
    .populate("products");

  usersCart.products.map((product) => {
    totalPrice += product.currentprice;
  });

  //   to create a new order
  const newOrder = await Order.create({
    fname: fname,
    lname: lname,
    email: email,
    gender: gender,
    address1: address1,
    address2: address2,
    city: city,
    postalcode: postalcode,
    country: country,
    phone: phone,
    user: userId,
    cart: usersCart._id,
    amount: totalPrice,
  });

  newOrder.save();

  res.status(201).json({ msg: "Order created" });
});

module.exports = { createOrder };