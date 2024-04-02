const ErrorHandler = require("../middlewares/errorHandler");
const catchAsync = require("../middlewares/catchAsync");
const Cart = require("../models/Cart");
const Product = require("../models/Product");
const mongoose = require("mongoose");

// to add items to cart
const addItemsToCart = catchAsync(async (req, res, next) => {
  if (!mongoose.isValidObjectId(req.params.id)) {
    return next(new ErrorHandler("Invalid product ID", 401));
  }

  const productId = req.params.id;
  const userId = req.user.userId;

  const usersCart = await Cart.findOne({ owner: userId });

  const cart = await Cart.findOne({ _id: usersCart._id });

  const addItem = await Cart.findByIdAndUpdate(
    { _id: cart._id },
    { $push: { products: productId } },
    { new: true }
  );

  res.status(200).json({ msg: "Product added to cart" });
});

// get cart items
const getCartItems = catchAsync(async (req, res, next) => {
  const userId = req.user.userId;

  let totalPrice = 0;

  const usersCart = await Cart.findOne({ owner: userId })
    .select("products -_id")
    .populate("products");

  usersCart.products.map((product) => {
    totalPrice += product.currentprice;
  });

  res.status(200).json({ usersCart, totalPrice });
});

// remove cart items
const removeCartItems = catchAsync(async (req, res, next) => {
  if (!mongoose.isValidObjectId(req.params.id)) {
    return next(new ErrorHandler("Invalid product ID", 401));
  }

  const userId = req.user.userId;
  const productId = req.params.id;

  const usersCart = await Cart.findOne({ owner: userId });

  // const product = await Product.findOne({ productId: productId });

  const removeCartItems = await Cart.findByIdAndUpdate(
    { _id: usersCart._id },
    { $pull: { products: productId } },
    { new: true }
  );

  res.status(200).json({ msg: "Product removed from cart" });
});

module.exports = {
  addItemsToCart,
  getCartItems,
  removeCartItems,
};
