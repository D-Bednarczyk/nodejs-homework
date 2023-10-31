import { removeContactById } from "../helpers.js";

export const removeContact = async (req, res, next) => {
  try {
    const removedResult = await removeContactById(req.params.contactId);
    if (removedResult) {
      return res.status(200).json({
        message: "contact deleted",
      });
    }
    return res.status(404).json({
      message: "Not found",
    });
  } catch (err) {
    return res.status(500).json(`An error occurred: ${err}`);
  }
};
