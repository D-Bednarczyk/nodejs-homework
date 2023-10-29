import express from "express";
export const router = express.Router();
import listContacts from "../controllers/contacts/listContacts.js";
import getContactById from "../controllers/contacts/getContactById.js";
import addContact from "../controllers/contacts/addContact.js";
import updateContact from "../controllers/contacts/updateContact.js";
import updateStatusContact from "../controllers/contacts/updateStatusContact.js";
import removeContact from "../controllers/contacts/removeContact.js";
//jak to uproscic

router.get("/", listContacts);
router.get("/:contactId", getContactById);
router.post("/", addContact);
router.put("/:contactId", updateContact);
router.put("/:contactId/favorite", updateStatusContact);
router.delete("/:contactId", removeContact);
