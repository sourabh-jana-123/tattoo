const express = require("express");
const cors = require("cors");
const multer = require("multer");

const {generateKey} = require('./generateKey')
const {db} = require('./db')

const app = express();
app.use(cors());

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage });

app.use(express.static("views"));
app.set("view engine", "ejs");

app.get("/", (req, res) => {
  res.render("index");
});

app.post("/audio", upload.single("file"), (req, res) => {
    const fileName = req.file.originalname;

    const key = generateKey(fileName);
    // console.log()

    const fileNameDB = db[key];

  res.render("audio", { path: fileNameDB });
});

app.listen(3000, function () {
  console.log("Server listening on port http://localhost:3000");
});
