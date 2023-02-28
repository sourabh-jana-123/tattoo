const { spawnSync } = require('child_process');
const express = require("express");
const cors = require("cors");
const multer = require("multer");

const app = express();
app.use(cors());

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    
    cb(null,"new.png");
  },
});

const upload = multer({ storage: storage });

app.use(express.static("views"));
app.set("view engine", "ejs");

app.get("/", (req, res) => {
  res.render("index");
});

app.post("/audio", upload.single("file"), async (req, res) => {

  try {
    const fileName = req.file.originalname;

    const result = spawnSync('python3', ['./main.py']);

    if (result.error) {
      console.error(result.error);
      process.exit(1);
    }

    let data = Number((result.stdout.toString()).substring(0, 5))

    console.log(data)

    if (data > 60) {
        return res.render("audio", { path: 'audio1.mp3' });
    }
    return res.send("image not match")
  } catch (error) {
    console.log(error)

  }

});

app.listen(3000, function () {
  console.log("Server listening on port http://localhost:3000");
});



