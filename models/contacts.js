const fs = require("fs").promises;
const path = require("path");
const { nanoid } = require("nanoid");

const contactsPath = path.join(__dirname, "contacts.json");

const listContacts = async () => {
  console.log(contactsPath);
  const contacts = JSON.parse(await fs.readFile(contactsPath));
  return contacts;
};

const getContactById = async (contactId) => {
  const contacts = JSON.parse(await fs.readFile(contactsPath));
  const found = contacts.find((contact) => contact.id === contactId);
  return found;
};

const removeContact = async (contactId) => {
  const contacts = JSON.parse(await fs.readFile(contactsPath));
  if (contacts.find((el) => el.id == contactId)) {
    await fs.writeFile(
      contactsPath,
      JSON.stringify(contacts.filter((contact) => contact.id != contactId))
    );
    return true;
  } else return false;
};

const addContact = async (body) => {
  const contacts = JSON.parse(await fs.readFile(contactsPath));
  const { name, email, phone } = body;
  const newContact = { id: nanoid(), name, email, phone };
  contacts.push(newContact);
  await fs.writeFile(contactsPath, JSON.stringify(contacts));
  return newContact;
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

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
