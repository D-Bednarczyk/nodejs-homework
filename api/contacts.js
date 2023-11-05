import express from "express";
export const router = express.Router();
import { auth } from "../service/AuthorizationCheck.js";
import * as contactControllers from "#controllers/contacts/index.js";
//import * as contactControllers from "#controllers/contacts";

router.get("/", auth, contactControllers.listContacts);
router.get("/:contactId", auth, contactControllers.getContactById);
router.post("/", auth, contactControllers.addContact);
router.put("/:contactId", auth, contactControllers.updateContact);
router.put(
  "/:contactId/favorite",
  auth,
  contactControllers.updateStatusContact
);
router.delete("/:contactId", auth, contactControllers.removeContact);
