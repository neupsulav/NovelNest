const express = require("express");
const router = express.Router();
const authentication = require("../middlewares/authentication");

const {
  addItemsToCart,
  getCartItems,
  removeCartItems,
} = require("../controllers/cart");

// routes
router.post("/addcartitem/:id", authentication, addItemsToCart);

router.get("/getcartitems", authentication, getCartItems);

router.patch("/removecartitems/:id", authentication, removeCartItems);

module.exports = router;
