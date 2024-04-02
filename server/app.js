const express = require("express");
const dotenv = require("dotenv");
const errorHandlerMiddleware = require("./middlewares/ErrorHandlerMiddleware");
const noRoute = require("./middlewares/noRoute");
const connectDatabase = require("./db/connect");
const authRouters = require("./routers/auth");

const app = express();
dotenv.config();
const PORT = process.env.port || 3000;

app.use(express.json());
app.use("/api/auth", authRouters);

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
