let config = require("./lib/src/loadConfig")();
const express = require("express");
const path = require("path");
const morgan = require("morgan");
const app = express();
if (config.NODE_ENV === "development") {
  app.use(morgan("dev"));
} else if (config.NODE_ENV === "production") {
  app.use(morgan("tiny"));
} else if (config.DEBUG === true || process.env.DEBUG === true) {
  app.use(morgan("dev"));
}
console.debug(`serving static files at ${config.staticDir}`);
app.use(express.static(config.staticDir));
console.debug("app recieved config object", config);
console.info("Mounting information route for api");
app.get(config.apiBasePath, (req, res) => {
  res.json({
    info: {
      name: "Artesian Ecommerce api",
      version: "0.0.1",
    },
  });
});

console.log("mounting routers...");
const routeDir = path.join(config.CWD, config.routesDir);
console.debug(`grabbing route module from  ${routeDir}`);
const routes = require(routeDir);

for (route in routes) {
  // console.debug(
  //   "route",
  //   route,
  //   "routes",
  //   routes,
  //   "routes[route]",
  //   routes[route]
  // );
  const { router, basePath } = routes[route];
  app.use(config.apiBasePath, router);
}

if (!config.NODE_ENV.includes("test")) {
  app.listen(config.PORT, config.HOST, () => {
    console.log(`READY ON ${config.HOST}:${config.PORT}`);
  });
}

module.exports = app;
