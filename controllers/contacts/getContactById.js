import { contactById } from "../helpers.js";

const getContactById = async (req, res, next) => {
  try {
    const contactfound = await contactById(req.params.contactId);
    if (contactfound != null) {
      return res.status(200).json({
        contactfound,
      });
    }
    return res.status(404).json({
      message: "Not found",
    });
  } catch (err) {
    res.status(500).json(`An error occurred: ${err}`);
  }
};

export default getContactById;
