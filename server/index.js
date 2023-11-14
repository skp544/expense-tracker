// dependencies
const express = require("express");
require("dotenv").config();

// setup
const app = express();
const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
  console.log(`Server started at port ${PORT}`);
});
