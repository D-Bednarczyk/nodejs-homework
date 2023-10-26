import express from "express";
export const router = express.Router();

import {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
} from "./../../models/contacts.js";

import Joi from "joi";

const schemaValidation = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  phone: Joi.string().required(),
});

router.get("/", async (req, res, next) => {
  try {
    const contacts = await listContacts();
    return res.status(200).json({
      contacts,
    });
  } catch (err) {
    return res.status(500).json(`An error occurred: ${err}`);
  }
});

router.get("/:contactId", async (req, res, next) => {
  try {
    const contactfound = await getContactById(req.params.contactId);
    if (contactfound != null) {
      return res.status(200).json({
        contactfound,
      });
    } else {
      return res.status(404).json({
        message: "Not found",
      });
    }
  } catch (err) {
    res.status(500).json(`An error occurred: ${err}`);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const body = req.body;
    const resultValidate = schemaValidation.validate(body);

    if (resultValidate.error) {
      return res.status(400).json({
        message: resultValidate.error.message,
      });
    } else {
      const newContact = await addContact(body);
      return res.status(201).json({
        newContact: newContact,
      });
    }
  } catch (err) {
    return res.status(500).json(`An error occurred: ${err}`);
  }
});

router.delete("/:contactId", async (req, res, next) => {
  try {
    const removedResult = await removeContact(req.params.contactId);
    if (removedResult) {
      return res.status(200).json({
        message: "contact deleted",
      });
    } else {
      return res.status(404).json({
        message: "Not found",
      });
    }
  } catch (err) {
    return res.status(500).json(`An error occurred: ${err}`);
  }
});

router.put("/:contactId", async (req, res, next) => {
  try {
    const body = req.body;
    const resultValidate = schemaValidation.validate(body);

    if (resultValidate.error) {
      return res.status(400).json({
        message: resultValidate.error.message,
      });
    } else {
      const updatedContact = await updateContact(req.params.contactId, body);
      if (updatedContact) {
        return res.status(201).json({
          updatedContact: updatedContact,
        });
      } else {
        return res.status(404).json({
          message: "Not found",
        });
      }
    }
  } catch (err) {
    return res.status(500).json(`An error occurred: ${err}`);
  }
});
