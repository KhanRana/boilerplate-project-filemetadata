const express = require("express");
const cors = require("cors");
require("dotenv").config();
const fs = require("node:fs/promises");
const { mediaParser } = require("@dolphjs/core");

const app = express();

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use("/public", express.static(process.cwd() + "/public"));

app.get("/", function (req, res) {
  res.sendFile(process.cwd() + "/views/index.html");
});

const mediaParserOptions = {
  type: "single",
  fieldname: "upfile",
};
 

app.post("/api/fileanalyse", mediaParser(mediaParserOptions), async (req, res) => {
  const file = req.file;
  const { originalname, mimetype, size } = file;
  const result = { name: originalname, type: mimetype, size: size };
  res.json(result);
});

const port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log("Your app is listening on port " + port);
});
