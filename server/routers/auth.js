const express = require("express");
const router = express.Router();
const multer = require("multer");

const { userRegistration, userLogin } = require("../controllers/auth");

// // multer for image upload
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
    cb(uploadError, "public/uploads/userImages");
  },
  filename: function (req, file, cb) {
    const fileName = file.originalname.split(" ").join("-");
    const extension = FILE_TYPE_MAP[file.mimetype];
    cb(null, `${Math.floor(Math.random() * 100000)}${Date.now()}.${extension}`);
  },
});

const uploadOptions = multer({ storage: storage });

// routes
router.post("/signup", uploadOptions.single("image"), userRegistration);

router.post("/login", userLogin);

module.exports = router;
