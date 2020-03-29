module.exports = {
  controller: function deleteProduct(req, res) {
    for (
      let productIndex = 0;
      productIndex < this.data.length;
      productIndex++
    ) {
      let product = this.data[productIndex];
      if (product.id == req.params.id) {
        this.data.splice(productIndex, 1);
        res.json({ data: this.data });
      }
    }
    res.status(404).json({
      error: {
        type: "NotFoundError",
        description: "The product you were trying to delete was not found",
        param: "id",
        id: req.params.id
      },
      data: this.data || []
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
