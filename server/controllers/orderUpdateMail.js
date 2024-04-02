const nodemailer = require("nodemailer");
const catchAsync = require("../middlewares/catchAsync");
const ErrorHandler = require("../middlewares/errorHandler");
const User = require("../models/User");

// email generation
const sendOrderUpdateMail = catchAsync(async (name, email, orderstate) => {
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    requireTLS: true,
    auth: {
      user: process.env.USER,
      pass: process.env.PASS,
    },
  });

  const mailOptions = {
    from: process.env.USER,
    to: email,
    subject: "For update regarding your order",
    html: `<p>Hi ${name},</p><p>Thank you for ordering our products.</p> <p>Your order is <b>${orderstate}</b></p>`,
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log("Email has been sent:", info.response);
    }
  });
});

module.exports = { sendOrderUpdateMail };
