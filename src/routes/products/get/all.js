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
  res.json({ data: this.data });
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
