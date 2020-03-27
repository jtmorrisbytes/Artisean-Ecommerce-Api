const fs = require("fs");
const path = require("path");

module.exports = function(directory) {
  fs.readdirSync(__dirname).forEach(entry => {
    if (fs.statSync(path.join(__dirname, entry)).isDirectory()) {
      let module = require(`./${entry}`);
    }
  });
};
