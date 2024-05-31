const express = require("express");
const cors = require("cors");
require("dotenv").config();
const fs = require("node:fs/promises");
const multer = require("multer");

const app = express();

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use("/public", express.static(process.cwd() + "/public"));

app.get("/", function (req, res) {
  res.sendFile(process.cwd() + "/views/index.html");
});
 

app.post("/api/fileanalyse", multer().single("upfile"), (req, res) => {
  res.json({
    name: req.file.originalname,
    type: req.file.mimetype,
    size: req.file.size,
  });
});

const port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log("Your app is listening on port " + port);
});
