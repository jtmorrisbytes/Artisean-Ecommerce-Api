const model = require("../../../../lib/src/models/product");
module.exports = {
  controller: function addOne(req, res) {
    console.log(model.keys.split(",").values());
    if (!req.get("Content-Type").includes("application/json")) {
      res.status(400).send({
        data: {},
        error: {
          type: "InvalidContentType",
          description: "This endpoint only accepts application/json",
          accept: "application/json"
        }
      });
    } else if (!req.body) {
      res
        .status(400)
        .json({ data: {}, error: { description: "missing body in request" } });
    }
    model.keys
      .replace("id,", "")
      .split(",")
      .forEach(key => {
        console.log(model[key]);
        if (model[key].required === true && !req.body[key]) {
          res.status(400).json({
            data: {},
            error: {
              type: "TypeError",
              description: `missing key '${key}' in request`,
              body: key
            }
          });
        } else if (model[key].format) {
          if (!model[key].format.test(req.body[key])) {
            res.status(400).json({
              data: {},
              error: {
                type: "TypeError",
                description: `key '${key}' has an invalid format`,
                format: model[key].format.toString()
              }
            });
          }
        }
      });

    res.json("OK");
  },
  params: {
    request: "",
    body: "",
    query: ""
  },
  path: "",
  middleware: []
};
