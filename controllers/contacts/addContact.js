import Joi from "joi";
import { newContact } from "../helpers.js";

const schemaValidation = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  phone: Joi.string().required(),
});

const addContact = async (req, res, next) => {
  try {
    const body = req.body;
    const resultValidate = schemaValidation.validate(body);

    if (resultValidate.error) {
      return res.status(400).json({
        message: resultValidate.error.message,
      });
    }

    const newContac = await newContact(body);
    return res.status(201).json({
      newContact: newContac,
    });
  } catch (err) {
    return res.status(500).json(`An error occurred: ${err}`);
  }
};
export default addContact;
