const path = require("path");
const fs = require("fs");

exports = {};

fs.readdirSync(__dirname).forEach(
  (entry => {
    if (fs.statSync(path.join(__dirname, entry)).isDirectory()) {
      let module = require(`./${entry}`);
      // console.log(module);
      this[entry] = module;
    }
  }).bind(exports)
);
