const express = require("express");
const dotenv = require("dotenv");

const app = express();
dotenv.config();
const PORT = process.env.port || 3000;

app.use(express.json());

// listen
const listen = async () => {
  app.listen(PORT, () => {
    console.log(`Connected to port no ${PORT}`);
  });
};

listen();
