const express = require("express");
const router = express.Router();
const authentication = require("../middlewares/authentication");

const { addItemsToCart } = require("../controllers/cart");

// routes
router.post("/addcartitem/:id", authentication, addItemsToCart);

module.exports = router;
