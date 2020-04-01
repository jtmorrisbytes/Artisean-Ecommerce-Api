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
  let { name, p_le, p_ge, sp, sn, limit } = req.query;
  console.log(req.query);
  let result = res.locals.data;
  if (name) {
    result = res.locals.data.filter(product => {
      return new RegExp(`${name}`, "i").test(product.name);
    });
  }
  if (p_ge && p_le) {
    result = result.filter(product => {
      return product.price >= p_ge && product.price <= p_le;
    });
  } else if (p_ge && !p_le) {
    result = result.filter(product => {
      return product.price >= p_ge;
    });
  } else if (p_le && !p_ge) {
    result = result.filter(product => {
      return product.price <= p_le;
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
