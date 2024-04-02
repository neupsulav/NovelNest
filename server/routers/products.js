const express = require("express");
const router = express.Router();
const multer = require("multer");

const {
  postProduct,
  deleteProduct,
  getProducts,
  getProduct,
} = require("../controllers/products");

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
    cb(uploadError, "public/uploads/productsImages");
  },
  filename: function (req, file, cb) {
    const fileName = file.originalname.split(" ").join("-");
    const extension = FILE_TYPE_MAP[file.mimetype];
    cb(null, `${Math.floor(Math.random() * 100000)}${Date.now()}.${extension}`);
  },
});

const uploadOptions = multer({ storage: storage });

// routes
router.post("/postproducts", uploadOptions.array("images", 10), postProduct);

router.delete("/deleteproduct/:id", deleteProduct);

router.get("/getproducts", getProducts);

router.get("/getproduct/:id", getProduct);

module.exports = router;
