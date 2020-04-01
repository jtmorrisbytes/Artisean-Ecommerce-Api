/**
 * /template
 *  getallproducts
 *
 */
const joi = require("@hapi/joi");
const baseModel = require("../../../../lib/src/models/product");
// const requestModel;
// this function has had the this keyword explicitly
// bound where this.data = the data in the parent controller
function getAll(req, res) {
  let { name, minPrice, maxPrice, sp, sn, limit } = req.query;
  console.log(req.query);
  let result = res.locals.data;
  if (name) {
    result = res.locals.data.filter(product => {
      return new RegExp(`${name}`, "i").test(product.name);
    });
  }
  if (minPrice && maxPrice) {
    result = result.filter(product => {
      return product.price >= minPrice && product.price <= maxPrice;
    });
  } else if (minPrice && !maxPrice) {
    result = result.filter(product => {
      return product.price >= minPrice;
    });
  } else if (maxPrice && !minPrice) {
    result = result.filter(product => {
      return product.price <= maxPrice;
    });
  }

  res.json({ data: result });
}
module.exports = {
  controller: getAll,
  params: {
    request: "",
    body: null,
    query: null
  },
  path: "",
  model: {
    request: null
    // response:
  },
  middleware: []
};
