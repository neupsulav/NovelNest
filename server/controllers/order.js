const catchAsync = require("../middlewares/catchAsync");
const ErrorHandler = require("../middlewares/errorHandler");
const Cart = require("../models/Cart");
const Order = require("../models/Order");
const { sendOrderUpdateMail } = require("./orderUpdateMail");
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
  } = req.body;

  //   to find user cart
  let totalPrice = 0;

  const usersCart = await Cart.findOne({ owner: userId })
    .select("products")
    .populate("products");

  usersCart.products.map((product) => {
    totalPrice += product.currentprice;
  });

  const file = req.file;
  if (!file) {
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

    sendOrderUpdateMail(fname, email, "Received");

    res.status(201).json({ msg: "Order created" });
  } else {
    const filename = file.filename;
    const basepath = `${req.protocol}://${req.get(
      "host"
    )}/public/uploads/paymentProofImages/`;

    //   to create a new order
    const newOrder = await Order.create({
      paymentProofImage: `${basepath}${filename}`,
      fname: fname,
      lname: lname,
      email: email,
      gender: gender,
      amount: totalPrice,
      address1: address1,
      address2: address2,
      city: city,
      postalcode: postalcode,
      country: country,
      phone: phone,
      user: userId,
      cart: usersCart._id,
    });

    newOrder.save();

    sendOrderUpdateMail(fname, email, "Received");

    res.status(201).json({ msg: "Order created" });
  }
});

// to get all the orders
const getOrders = catchAsync(async (req, res, next) => {
  const orders = await Order.find({})
    .sort({ createdAt: -1 })
    .populate("user cart")
    .populate({ path: "cart", populate: { path: "products" } });

  res.status(200).send(orders);
});

module.exports = { createOrder, getOrders };
