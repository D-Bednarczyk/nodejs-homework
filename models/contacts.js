import Contact from "../service/schemas/contacts.js";

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

const updateContact = async (id, toUpdate) => {
  try {
    return Contact.findOneAndUpdate(
      { _id: id },
      { $set: toUpdate },
      { new: true }
    );
  } catch (err) {
    console.log("Error: ", err);
    throw err;
  }
};

const updateStatusContact = async (id, toUpdate) => {
  try {
    return Contact.findOneAndUpdate(
      { _id: id },
      { $set: toUpdate },
      { new: true }
    );
  } catch (err) {
    console.log("Error: ", err);
    throw err;
  }
};

export {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
  updateStatusContact,
};
