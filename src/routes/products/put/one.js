module.exports = {
  controller: function updateOne(req, res) {
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
    } else if (!req.params.id) {
      res.status(400).json({
        data: {},
        error: { description: "missing property 'id' in request", params: "id" }
      });
    }
    for (let i = 0; i < this.data.length; i++) {
      if (req.params.id == this.data[i].id) {
        let oldData = this.data[i];
        let newData = {
          ...oldData,
          name: req.body.name || oldData.name,
          description: req.body.description || oldData.description,
          price: req.body.price || oldData.price
        };

        this.data[i] = newData;
        res.json({ data: newData });
      }
    }
    console.log("updateOne");
  },
  params: {
    req: ":id",
    body: null,
    header: null
  },
  path: "",
  middleware: []
};
