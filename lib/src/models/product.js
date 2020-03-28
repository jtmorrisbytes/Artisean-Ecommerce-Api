const joi = require("@hapi/joi");
modelInfo = {
  id: {
    type: "integer",
    min: 1,
    max: Number.MAX_SAFE_INTEGER
  },
  name: {
    type: "string",
    pattern: null,
    min: 5,
    max: 50
  },
  tags: {
    type: "array",
    items: {
      type: "string"
    }
  },
  price: {
    type: "number",
    required: true
  }
};
// eventually need  to add seller id
modelInfo.name.pattern = new RegExp(
  `/^[a-zA-Z0-9]{${modelInfo.name.min},${modelInfo.name.max}}$/`
);
const model = joi.object({
  id: joi
    .number()
    .integer()
    .min(modelInfo.id.min)
    .max(modelInfo.id.max)
    .required(),
  name: joi
    .string()
    .pattern(modelInfo.name.pattern)
    .required(),
  tags: joi
    .array()
    .items(joi.string())
    .optional(),
  price: joi.number().required()
});
module.exports = {
  model,
  get: {
    all: {
      request: null,
      response: joi
        .array()
        .items(model)
        .required()
    }
  },
  put: {
    request: model
  }
};
