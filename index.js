let config = require("./lib/src/loadConfig")();
const express = require("express");
const path = require("path");
const morgan = require("morgan");
const app = express();
let HOST = process.env.HOST || "127.0.0.1";
let PORT = +process.env.PORT;

// if publishing client and server together,
// make sure to include an app.use

if (process.NODE_ENV === "production") {
  PORT = PORT || 80;
  app.use(morgan("dev"));
} else {
  PORT = PORT || 3001;
  app.use(morgan("tiny"));
}

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

app.listen(PORT, HOST, () => {
  console.log(`SERVER LISTENING on ${HOST}:${PORT}`);
});
