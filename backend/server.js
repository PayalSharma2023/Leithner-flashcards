require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const DbConnect = require("./config/db");
const app = express();
app.use(express.json());
app.use(cors());

app.use("/flashcards", require("./routes/flashcards"));
app.use('/auth', require('./routes/auth'));

const PORT = process.env.PORT || 5000;
DbConnect().then(
  app.listen(PORT, () => {
    console.log(`server is running at port ${PORT}`);
  })
);
