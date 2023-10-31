import express from "express";
export const router = express.Router();

import * as contactControllers from "#controllers/contacts/index.js";
//import * as contactControllers from "#controllers/contacts";

router.get("/", contactControllers.listContacts);
router.get("/:contactId", contactControllers.getContactById);
router.post("/", contactControllers.addContact);
router.put("/:contactId", contactControllers.updateContact);
router.put("/:contactId/favorite", contactControllers.updateStatusContact);
router.delete("/:contactId", contactControllers.removeContact);
