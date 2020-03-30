// do processing here
const bodyParser = require("body-parser");
const basePath = "/product";
const basePathPlural = basePath + "s";
const router = require("express").Router();
const data = require("./data.json");
const model = require("../../../lib/src/models/product");
const products = {
  get: require("./get"),
  post: require("./post"),
  put: require("./put"),
  del: require("./delete")
};

function validateID(req, res, next) {
  if (!req.params.id) {
    // if the parameter is missing from the request
    // return 422 (unproccessable entity)
    res.json({
      data: {},
      error: {
        type: "MissingRequestParam",
        descripton: "missing parmeter id",
        param: "id"
      }
    });
  } else if (!model.id.format.test(req.params.id)) {
    // the parameter was provided, but the type or format was incorrect
    res.status(400).json({
      data: {},
      error: {
        type: "TypeError",
        description: "parameter id",
        param: "id",
        expectedType: model.id.type,
        format: model.id.format.toString()
      }
    });
  } else if (+req.params.id < model.id.min || req.params.id >= model.id.max) {
    // the given input was out of range
    res.status(400).json({
      data: {},
      error: {
        type: "RangeError",
        description: "parameter id was out of range ",
        param: "id",
        min: model.id.min,
        max: model.id.max
      }
    });
  } else {
    next();
  }
}

router.use(bodyParser.json());

// router.use((req, res, next) => {
//   if (!req.get("Content-Type").includes("application/json")) {
//     res.status(400).send({
//       data: {},
//       error: {
//         type: "InvalidContentType",
//         description: "This endpoint only accepts application/json"
//       }
//     });
//   } else next();
// });
router.get(basePathPlural, products.get.all.controller.bind({ data }));
router.get(
  basePath + "/" + products.get.one.params.request,

  products.get.one.controller
);
// this route is expecting query params
router.get(basePathPlural, products.get.filter.controller);
router.post(
  basePath + "/" + products.post.one.params.request,
  validateID,
  products.post.one.controller
);
router.put(basePath + "/:id", products.put.one.controller.bind({ data }));
router.delete(
  basePath + "/" + products.del.params.request,
  validateID,
  products.del.controller.bind({ data: data })
);
module.exports = {
  router,
  basePath
};
