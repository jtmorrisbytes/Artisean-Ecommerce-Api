const model = require("../../../../lib/src/models/product");
const modelInfo = model.modelInfo;
const data = require("../data.json");
module.exports = {
  controller: function getOne(req, res) {
    if (!req.params.id) {
      // if the parameter is missing from the request
      // return 422 (unproccessable entity)
      res.sendStatus(422);
    }
    if (!modelInfo.id.format.test(req.params.id)) {
      // the parameter was provided, but the type was incorrect
      res.sendStatus(400);
    }
    let result = data.find(product => {
      return product.id == req.params.id;
    });
    if (!result) {
      res.sendStatus(404);
    }
    res.json([result]);
  },
  params: {
    request: ":id",
    body: "",
    query: ""
  },
  path: "",
  middleware: []
};
