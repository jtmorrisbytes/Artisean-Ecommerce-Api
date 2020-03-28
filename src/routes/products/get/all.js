/**
 * /template
 *  getallproducts
 *
 */
const joi = require("@hapi/joi");
const baseModel = require("../../../../lib/src/models/product");
// const requestModel;
function getAll(req, res) {
  res.send(501);
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
