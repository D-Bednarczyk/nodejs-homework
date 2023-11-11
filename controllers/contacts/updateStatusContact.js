import { changeContact } from "#repositories/contacts.js";

export const updateStatusContact = async (req, res, next) => {
  const body = req.body;
  const { contactId } = req.params;

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
