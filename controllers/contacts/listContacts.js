import Contact from "../../service/schemas/contacts.js";
import { Contacts } from "../helpers.js";

const listContacts = async (req, res, next) => {
  try {
    const contacts = await Contacts();
    return res.status(200).json({
      contacts,
    });
  } catch (err) {
    return res.status(500).json(`An error occurred: ${err}`);
  }
};
export default listContacts;
