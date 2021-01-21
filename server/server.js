const express = require("express");
const app = express();
const port = process.env.PORT || process.argv[2] || 8080;
const cors = require("cors");

app.listen(port, () => {
  console.log("The server is running on port 8080");
});
