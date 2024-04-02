const User = require("../models/User");
const ErrorHandler = require("../middlewares/errorHandler");
const catchAsync = require("../middlewares/catchAsync");
const { sendVerificationMail } = require("./emailVerification");

// user registration
const userRegistration = catchAsync(async (req, res, next) => {
  const { name, username, email, password, cpassword } = req.body;

  if (!name || !username || !email || !password || !cpassword) {
    return next(new ErrorHandler("Please fill all the fields properly", 400));
  }

  if (password != cpassword) {
    return next(new ErrorHandler("Passowrd's doesn't match", 406));
  }

  //for saving user's image in database
  const file = req.file;
  if (!file) {
    const newUser = await User.create({
      name: req.body.name,
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
      cpassword: req.body.cpassword,
    });
    newUser.save();

    if (!newUser) {
      return next(
        new ErrorHandler("Something went wrong, User not created!", 500)
      );
    }

    // send verification mail
    sendVerificationMail(req.body.name, req.body.email, newUser._id);
  } else {
    const filename = file.filename;
    const basepath = `${req.protocol}://${req.get(
      "host"
    )}/public/uploads/userImages/`;

    const newUser = await User.create({
      name: req.body.name,
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
      cpassword: req.body.cpassword,
      image: `${basepath}${filename}`,
    });

    newUser.save();

    if (!newUser) {
      return next(
        new ErrorHandler("Something went wrong, User not created!", 500)
      );
    }

    // send verification mail
    sendVerificationMail(req.body.name, req.body.email, newUser._id);
  }

  res.status(201).json({
    success: true,
    msg: "An email has been sent. Please verify your account.",
  });
});

module.exports = { userRegistration };
