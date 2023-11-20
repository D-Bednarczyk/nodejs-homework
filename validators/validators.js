import Joi from "joi";

export const schemaValidationContact = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  phone: Joi.string().required(),
});

export const schemaValidationFavoritiesContactFav = Joi.object({
  favorite: Joi.boolean().required(),
});

export const schemaValidationUser = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

export const schemaValidationSub = Joi.object({
  email: Joi.string().email().required(),
  subscription: Joi.string().valid("starter", "pro", "business").required(),
});

export const schemaValidationToken = Joi.object({
  email: Joi.string().email().required(),
});
