const model = require("../../../../lib/src/models/product");
const data = require("../data.json");
module.exports = {
  controller: function getOne(req, res) {
    let result = data.find(product => {
      return product.id == req.params.id;
    });
    if (!result) {
      res.status(404).json({
        data: {},
        error: {
          type: "NotFoundError",
          errorDescripton: "The object with the requested id was not found",
          param: "id",
          id: req.params.id
        }
      });
    }
    res.json({ data: result });
  },
  params: {
    request: ":id",
    body: "",
    query: ""
  },
  path: "",
  middleware: []
};
