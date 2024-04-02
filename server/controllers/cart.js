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

module.exports = {
  addItemsToCart,
};
