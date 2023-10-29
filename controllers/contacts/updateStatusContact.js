import { changeContact } from "../helpers.js";
import Joi from "joi";

const schemaValidationFavorities = Joi.object({
  favorite: Joi.boolean().required(),
});

const updateStatusContact = async (req, res, next) => {
  const body = req.body;
  const { contactId } = req.params;
  const resultValidate = schemaValidationFavorities.validate(body);

  if (resultValidate.error) {
    return res.status(400).json({
      message: resultValidate.error.message,
    });
  }
  try {
    const updatedContact = await changeContact(contactId, body);
    if (updatedContact) {
      return res.status(200).json({
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

export default updateStatusContact;
