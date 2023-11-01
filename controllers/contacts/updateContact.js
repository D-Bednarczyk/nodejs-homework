import { changeContact } from "../helpers.js";

import Joi from "joi";

const schemaValidation = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  phone: Joi.string().required(),
});

export const updateContact = async (req, res, next) => {
  const body = req.body;
  const { contactId } = req.params;
  console.log(contactId);
  const resultValidate = schemaValidation.validate(body);

  if (resultValidate.error) {
    return res.status(400).json({
      message: resultValidate.error.message,
    });
  }
  try {
    const updatedContact = await changeContact(contactId, body);
    if (updatedContact) {
      return res.status(201).json({
        updatedContact: updatedContact,
      });
    }
    return res.status(404).json({
      message: "Not found",
    });
  } catch (err) {
    return res.status(500).json(`An error occurred: ${err}`);
  }
};
