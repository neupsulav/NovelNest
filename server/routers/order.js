const express = require("express");
const router = express.Router();
const multer = require("multer");

const authentication = require("../middlewares/authentication");

const {
  createOrder,
  getOrders,
  approveOrder,
  processOrder,
  shippedOrder,
  deliveredOrder,
} = require("../controllers/order");

// multer for image upload on post
const FILE_TYPE_MAP = {
  "image/png": "png",
  "image/jpeg": "jpeg",
  "image/jpg": "jpg",
};

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const isValid = FILE_TYPE_MAP[file.mimetype];
    let uploadError = new Error("invalid image type");

    if (isValid) {
      uploadError = null;
    }
    cb(uploadError, "public/uploads/paymentProofImages");
  },
  filename: function (req, file, cb) {
    const fileName = file.originalname.split(" ").join("-");
    const extension = FILE_TYPE_MAP[file.mimetype];
    cb(null, `${Math.floor(Math.random() * 100000)}${Date.now()}.${extension}`);
  },
});

const uploadOptions = multer({ storage: storage });

// routes
router.post(
  "/createorder",
  authentication,
  uploadOptions.single("paymentProofImage"),
  createOrder
);

router.get("/getorders", getOrders);

router.patch("/approveorder/:id", approveOrder);

router.patch("/processorder/:id", processOrder);

router.patch("/shippedorder/:id", shippedOrder);

router.patch("/deliverorder/:id", deliveredOrder);

module.exports = router;
