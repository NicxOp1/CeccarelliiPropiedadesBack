const joi = require("joi");

const schema = joi.object({
  name: joi.string().required().min(3).messages({
    "string.empty": "name is required",
    "string.min":
      "This field is required, please, introduce a email with a minimum of 3 letters.",
    "any.required": "name is required",
  }),
  lastName: joi.string().required().min(3).messages({
    "string.empty": "lastName is required",
    "string.min":
      "This field is required, please, introduce a email with a minimum of 3 letters.",
    "any.required": "lastName is required",
  }),
  photo: joi.string().required().uri().messages({
    "string.empty": "photo is required",
    "string.uri": "photo must be a valid uri",
    "any.required": "photo is required",
  }),
  age: joi.number().required().min(18).messages({
    "number.empty": "age is required",
    "number.min": "age must be at least 18",
    "any.required": "age is required",
  }),
  email: joi.string().required().email({ minDomainSegments: 2 }).messages({
    "string.empty": "email is required",
    "string.email": "email must be a valid email",
    "any.required": "email is required",
  }),
  password: joi.string().alphanum().min(6).required().messages({
    "string.empty": "password is required",
    "string.min": "Must contain at least 6 characters",
    "any.required": "password is required",
  }),
});

module.exports = schema;
