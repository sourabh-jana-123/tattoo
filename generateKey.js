const fs = require("fs");
const crypto = require("crypto");

exports.generateKey = (path) => {
  const buffer = fs.readFileSync(path);

  const hash = crypto.createHash("sha256").update(buffer).digest("hex");
  
  return hash;
};

// console.log(generateKey('./img1.png')) 