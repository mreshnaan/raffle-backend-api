const Joi = require("@hapi/joi");

const supportedKeys = ["params", "body", "query"];

/**
 * Route validation using Joi
 * Takes a schema with properties defined using Joi:
 *  - params
 *  - body
 *  - query
 * Validates the request properties specified in the schema
 * @param {Object} schema { params, body, query }
 */

const validate = (schema) => (req, res, next) => {
  if (!schema) {
    return next();
  }

  const obj = {};

  supportedKeys.forEach((key) => {
    if (schema[key]) {
      obj[key] = req[key];
    }
  });

  const joiSchema = Joi.object(schema);
  const { error } = joiSchema.validate(obj);

  const valid = error == null;
  if (valid) {
    return next();
  } else {
    const { details } = error;
    const message = details.map((i) => i.message).join(",");

    console.log("error", message);
    return res.status(422).json({ error: message });
  }
};

module.exports = validate;
