import { newContact } from "#repositories/contacts.js";

export const addContact = async (req, res, next) => {
  try {
    const body = req.body;

    const newContac = await newContact(body);
    return res.status(201).json({
      newContact: newContac,
    });
  } catch (err) {
    return res.status(500).json(`An error occurred: ${err}`);
  }
};
