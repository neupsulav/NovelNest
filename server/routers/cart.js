const express = require("express");
const router = express.Router();
const authentication = require("../middlewares/authentication");

const { addItemsToCart, getCartItems } = require("../controllers/cart");

// routes
router.post("/addcartitem/:id", authentication, addItemsToCart);

router.get("/getcartitems", authentication, getCartItems);

module.exports = router;
