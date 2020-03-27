module.exports = {
  controller: function filterProducts(req, res) {
    res.send(501);
  },
  params: {
    request: "",
    query: {
      required: "name",
      validKeys: ["name", "price_le", "price_ge", "sort_name", "sort_price"],
      validValues: [/[a-z-A-Z]+/]
    },
    body: ""
  },
  path: "",
  middleware: []
};
