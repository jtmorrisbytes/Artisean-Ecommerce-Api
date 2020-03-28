let config = require("./lib/src/loadConfig")();
const express = require("express");
const path = require("path");
const morgan = require("morgan");
const app = express();

if (process.NODE_ENV === "production") {
  app.use(morgan("dev"));
} else {
  app.use(morgan("tiny"));
}
console.debug("app recieved config object", config);
console.info("Mounting information route for api");
app.get(config.apiBasePath, (req, res) => {
  res.json({
    info: {
      name: "Artesian Ecommerce api",
      version: "0.0.1"
    }
  });
});

console.log("mounting routers...");
const routeDir = path.join(config.CWD, config.routesDir);
console.debug(`grabbing route module from  ${routeDir}`);
const routes = require(routeDir);

for (route in routes) {
  console.debug(
    "route",
    route,
    "routes",
    routes,
    "routes[route]",
    routes[route]
  );
  const { router, basePath } = routes[route];
  app.use(config.apiBasePath, router);
}
console.log("routes", routes);

if (!config.NODE_ENV.includes("test")) {
  app.listen(config.port, config.host, () => {
    console.log(`READY ON ${config.host}:${config.port}`);
  });
}

module.exports = app;
