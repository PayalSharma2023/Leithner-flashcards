require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const DbConnect = require("./config/db");
const app = express();
app.use(express.json());
app.use(
  cors({
    origin: (origin, callback) => {
      console.log("Origin:", origin); // Log incoming origin for debugging
      const allowedOrigins = [
        "http://localhost:5173","https://leithner-flashcards.vercel.app"
      ];
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"], // Allowed HTTP methods
    allowedHeaders: ["Content-Type", "Authorization", "x-rtb-fingerprint-id"], // Allowing specific headers if necessary
    credentials: true, // Enable sending cookies, if necessary
  })
);
const corsOptions = {
  origin: ["http://localhost:5173","https://leithner-flashcards.vercel.app"], // Your Vercel frontend domain
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  credentials: true,
};

app.use("/flashcards", require("./routes/flashcards"));
app.use('/auth', require('./routes/auth'));

const PORT = process.env.PORT || 5000;
DbConnect().then(
  app.listen(PORT, () => {
    console.log(`server is running at port ${PORT}`);
  })
);
