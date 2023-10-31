import Contact from "#service/schemas/contacts.js";

export const Contacts = () => {
  return Contact.find();
};

export const contactById = (contactId) => {
  return Contact.findOne({ _id: contactId });
};

export const removeContactById = (contactId) => {
  return Contact.findByIdAndRemove({ _id: contactId });
};

export const newContact = (body) => {
  const { name, email, phone, favorite } = body;
  return Contact.create({ name, email, phone, favorite });
};

export const changeContact = async (id, toUpdate) => {
  return Contact.findOneAndUpdate(
    { _id: id },
    { $set: toUpdate },
    { new: true }
  );
};
