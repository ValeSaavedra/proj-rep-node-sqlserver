//const joi = require("@hapi/joi");
const joi = require("joi");

const schemas = {
  accnum: joi.object().keys({
    dato: joi.string().pattern(new RegExp("^[1-9][0-9]{0,7}$")),
  }),
};

module.exports = schemas;
