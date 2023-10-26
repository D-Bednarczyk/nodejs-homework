import fs from "fs";
import path from "path";
import Contact from "../service/schemas/contacts.js";

//const contactsPath = path.join(__dirname, "contacts.json");
process.cwd();
const contactsPath = path.join(process.cwd(), "./contacts.json");

const listContacts = async () => {
  try {
    return await Contact.find();
  } catch (err) {
    console.log("Error getting contact list: ", err);
    throw err;
  }
};

const getContactById = async (contactId) => {
  try {
    return await Contact.findOne({ _id: contactId });
  } catch (err) {
    console.log("Error: ", err);
    throw err;
  }
};

const removeContact = async (contactId) => {
  try {
    return await Contact.findByIdAndRemove({ _id: contactId });
  } catch (err) {
    console.log("Error: ", err);
    throw err;
  }
};

const addContact = async (body) => {
  try {
    const { name, email, phone, favorite } = body;
    return await Contact.create({ name, email, phone, favorite });
  } catch (err) {
    console.log("Error: ", err);
    throw err;
  }
};

const updateContact = async (contactId, body) => {
  const contacts = JSON.parse(await fs.readFile(contactsPath));
  const { name, email, phone } = body;
  const isContactactIdInFile = contacts.findIndex((el) => el.id == contactId);

  if (isContactactIdInFile != -1) {
    contacts[isContactactIdInFile] = {
      id: contactId,
      name: name,
      email: email,
      phone: phone,
    };
    await fs.writeFile(contactsPath, JSON.stringify(contacts));
    return contacts[isContactactIdInFile];
  } else return false;
};

export {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
