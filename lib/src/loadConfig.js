const path = require("path");
module.exports = function loadConfig() {
  let envFile = require("dotenv").config().parsed;
  let NODE_ENV = process.env.NODE_ENV || "development";
  let CWD = process.cwd();
  console.log("NODE_ENV is", NODE_ENV);

  let configFile = require(path.join(CWD, "config.json"));
  let defaults = require(path.join(CWD, "defaults.json"))[NODE_ENV];

  let config = Object.assign(
    {},
    defaults,
    configFile,
    {
      NODE_ENV: NODE_ENV.trim(),
      CWD
    },
    envFile
  );
  if (process.env.DEBUG === "true") {
    console.log("loaded defaults", defaults);
    console.log("loaded config object", config);
  }

  return config;
};
