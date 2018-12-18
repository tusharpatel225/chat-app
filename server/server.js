const path = require('path');
const express = require('express');
const port = process.env.PORT || 2000;

var app = express();

app.use(express.static(path.join(__dirname, "../public")));

app.listen(port, () => {
  console.log("server start at ",port);
});
