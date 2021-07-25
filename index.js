const express = require("express");
const fs = require("fs");
const app = express();
const port = 3000;

app.use(express.static(__dirname + "/public"));
app.use(express.static(__dirname + "/node_modules/three"));

app.get("/", (req, res) => {
  res.sendFile("/index.html");
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
