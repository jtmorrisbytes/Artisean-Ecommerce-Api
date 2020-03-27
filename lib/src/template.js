const joi = require("@hapi/joi");

/**
 * @swagger
 *definitions:
 *  Product:
 *    type: object
 *    properties:
 *      id:
 *        type: integer
 */

let model = joi.object({
  id: joi
    .number()
    .integer()
    .min(1)
    .max(Number.MAX_SAFE_INTEGER)
});
module.exports = { model: model };
