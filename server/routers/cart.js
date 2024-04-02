const express = require("express");
const router = express.Router();

const { addItemsToCart } = require("../controllers/cart");

// routes
router.post("/addcartitem/:id", addItemsToCart);

module.exports = router;
