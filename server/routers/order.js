const express = require("express");
const router = express.Router();

const authentication = require("../middlewares/authentication");

const { createOrder } = require("../controllers/order");

// routes
router.post("/createorder", authentication, createOrder);

module.exports = router;
