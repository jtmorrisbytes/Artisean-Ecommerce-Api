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

const routeDir = path.join(config.CWD, config.routesDir);
console.debug(`grabbing route module from  ${routeDir}`);
const routes = require(routeDir);
console.log("routes", routes);
// use the api server
// mount all the routes in the routes module programmatically
// console.log(`Mounting routes at ${routeDir}`);
// for (routeName in routes) {
//   let route = routes[routeName];
//   console.info(
//     "mounting route:'" + routeName + "'",
//     `at path ${config.apiBasePath + route.basePath}`
//   );
//   app.use(config.apiBasePath + route.basePath, route.router);
// }

app.listen(PORT, HOST, () => {
  console.log(`SERVER LISTENING on ${HOST}:${PORT}`);
});
