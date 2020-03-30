module.exports = {
  controller: function deleteProduct(req, res) {
    for (
      let productIndex = 0;
      productIndex < res.locals.data.length;
      productIndex++
    ) {
      let product = res.locals.data[productIndex];
      if (product.id == req.params.id) {
        res.locals.data.splice(productIndex, 1);
        res.json({ data: res.locals.data });
      }
    }
    res.status(404).json({
      error: {
        type: "NotFoundError",
        description: "The product you were trying to delete was not found",
        param: "id",
        id: req.params.id
      },
      data: this.res.locals.data
    });
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
