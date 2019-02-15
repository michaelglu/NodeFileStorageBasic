const express = require("express");
const morgan = require("morgan");
const multer = require("multer");
const bodyParser = require("body-parser");
const crypto = require("crypto");

const storage = multer.diskStorage({
  destination: "./images",
  filename: function(req, file, callback) {
    callback(null, file.fieldname + "_" + Date.now() + "_" + file.originalname);
  }
});

const upload = multer({
  storage: storage
});

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan("dev"));
app.post("/uploadSingle", upload.single("avatar"), (req, res, next) => {
  if (!req.file) {
    res.send("File not uploaded");
  } else {
    res.send("File uploaded");
  }
});
app.use("/images", express.static("images"));
app.listen(process.env.PORT || 3000, () => {
  console.log(`Listening on 3000`);
});
