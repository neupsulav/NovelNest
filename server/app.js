const express = require("express");
const dotenv = require("dotenv");
const errorHandlerMiddleware = require("./middlewares/ErrorHandlerMiddleware");
const noRoute = require("./middlewares/noRoute");
const connectDatabase = require("./db/connect");
const authRouters = require("./routers/auth");
const emailVerificationRouter = require("./routers/emailVerification");
const productsRouter = require("./routers/products");
const cartRouter = require("./routers/cart");

const app = express();
dotenv.config();
const PORT = process.env.port || 3000;
app.use(express.json());

// routes
app.use(
  "/public/uploads/userImages",
  express.static("public/uploads/userImages")
);

app.use(
  "/public/uploads/productsImages",
  express.static("public/uploads/productsImages")
);

app.use("/api/auth", authRouters);
app.use("/api", emailVerificationRouter);
app.use("/api", productsRouter);
app.use("/api", cartRouter);

// error handler middlewares
app.use(errorHandlerMiddleware);

// no route
app.use(noRoute);

// listen
const listen = async () => {
  await connectDatabase(process.env.connectionUrl);

  app.listen(PORT, () => {
    console.log(`Connected to port no ${PORT}`);
  });
};

listen();
