module.exports = {
  controller: function deleteProduct(req, res) {
    let pIndex;
    let product;

    product = res.locals.data.find((product, index) => {
      if (req.params.id == product.id) {
        pIndex = index;
      }
      return req.params.id == product.id;
    });
    if (!product) {
      res.status(404).json({
        error: {
          type: "NotFoundError",
          description: "The product you were trying to delete was not found",
          param: "id",
          id: req.params.id
        },
        data: res.locals.data
      });
    } else {
      res.locals.data.splice(pIndex, 1);
      res.json({ data: res.locals.data });
    }
  },
  params: {
    request: ":id",
    query: "",
    body: "",
    headers: ""
  },
  path: "",
  middleware: []
};
