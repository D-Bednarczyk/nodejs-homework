import express from "express";
export const router = express.Router();
import {
  schemaValidationContact,
  schemaValidationFavoritiesContactFav,
} from "#validators/validators.js";
import { bodyValidate } from "#middlewares/validate.js";
import { auth } from "#middlewares/AuthorizationCheck.js";
import * as contactControllers from "#controllers/contacts/index.js";
//import * as contactControllers from "#controllers/contacts";

router.get("/", auth, contactControllers.listContacts);
router.get("/:contactId", auth, contactControllers.getContactById);
router.post(
  "/",
  bodyValidate(schemaValidationContact),
  auth,
  contactControllers.addContact
);
router.put(
  "/:contactId",
  bodyValidate(schemaValidationContact),
  auth,
  contactControllers.updateContact
);
router.put(
  "/:contactId/favorite",
  bodyValidate(schemaValidationFavoritiesContactFav),
  auth,
  contactControllers.updateStatusContact
);
router.delete("/:contactId", auth, contactControllers.removeContact);
