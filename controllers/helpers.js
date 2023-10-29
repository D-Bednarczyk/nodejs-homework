import Contact from "../service/schemas/contacts.js";

export const Contacts = async () => {
  return await Contact.find();
};

export const contactById = async (contactId) => {
  return Contact.findOne({ _id: contactId });
};

export const removeContactById = async (contactId) => {
  return await Contact.findByIdAndRemove({ _id: contactId });
};

export const newContact = async (body) => {
  const { name, email, phone, favorite } = body;
  return await Contact.create({ name, email, phone, favorite });
};

export const changeContact = async (id, toUpdate) => {
  return Contact.findOneAndUpdate(
    { _id: id },
    { $set: toUpdate },
    { new: true }
  );
};
