// dependencies
const express = require("express");
const cors = require("cors");
require("dotenv").config();

// route imports
const transactionRoute = require("./routes/transactions.route");

// functions
const connectDB = require("./config/database");

// setup
const app = express();
const PORT = process.env.PORT || 8000;

// middlewares

app.use(cors());
app.use(express.json());

// routes

app.use("/api/v1", transactionRoute);

// connection to DB
connectDB();

app.listen(PORT, () => {
  console.log(`Server started at port ${PORT}`);
});
