const model = require("../../../../lib/src/models/product");
module.exports = {
  controller: (addOne = (req, res) => {
    if (!res.locals.id) {
      console.warn(
        "Products.addOne: The controller function follows an autoincrement style and requires an id to be bound on 'res.locals.id'.\r\n" +
          "it will refuse to serve requests when not bound."
      );
    }
    if (!res.locals.data) {
      console.warn(
        "Products.addOne: the controller function requires the dataset to be bound to the function on 'res.locals.data'." +
          "it will refuse to serve requests when not bound"
      );
    }
    if (!res.locals.data || !res.locals.id) {
      res.status(500).send({
        data: {},
        error: {
          mesage: "internal server error",
          description:
            "The required data to serve this request was not found on the backend. Please contact the site administrator",
          reason:
            "Either data or id was not bound to res.locals on the controller function at this route",
          debug: {
            data: res.locals.data || null,
            id: res.locals.id || null
          }
        }
      });
    }
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
          if (!new RegExp(model[key].format).test(req.body[key])) {
            res.status(400).json({
              data: {},
              error: {
                type: "TypeError",
                description: `key '${key}' has an invalid format`,
                format: model[key].format.toString(),
                [key]: req.body[key]
              }
            });
          }
        }
      });
    let newData = {
      id: res.locals.id + 1,
      name: req.body.name,
      description: req.body.description,
      tags: req.body.tags,
      price: req.body.price
    };
    res.locals.pushData(newData);
    res.locals.incrementId();
    res.json({ data: newData });
  }),
  params: {
    request: "",
    body: "",
    query: ""
  },
  path: "",
  middleware: []
};
