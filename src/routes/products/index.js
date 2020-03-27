// do processing here
const basePath = "/product";
const basePathPlural = basePath + "s";
const router = require("express").Router();

const products = {
  get: require("./get"),
  post: require("./post"),
  put: require("./put"),
  del: require("./delete")
};

router.get(basePathPlural, products.get.all.controller);
router.get(
  basePath + "/" + products.get.one.params.request,
  products.get.one.controller
);
// this route is expecting query params
router.get(basePathPlural, products.get.filter.controller);
router.post(
  basePath + "/" + products.post.one.params.request,
  products.post.one.controller
);
router.delete(
  basePath + "/" + products.del.params.request,
  products.del.controller
);
module.exports = {
  router,
  basePath
};
