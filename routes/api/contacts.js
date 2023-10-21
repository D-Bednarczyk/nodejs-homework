const express = require("express");
const router = express.Router();
const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
} = require("./../../models/contacts");
const Joi = require("joi");

const schemaValidation = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  phone: Joi.string().required(),
});

router.get("/", async (req, res, next) => {
  try {
    const contacts = await listContacts();
    res.status(200).json({
      contacts,
    });
  } catch (err) {
    res.status(500).json(`An error occurred: ${err}`);
  }
});

router.get("/:contactId", async (req, res, next) => {
  try {
    const contactfound = await getContactById(req.params.contactId);
    if (contactfound != null) {
      res.status(200).json({
        contactfound,
      });
    } else {
      res.status(404).json({
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
      res.status(400).json({
        message: resultValidate.error.message,
      });
    } else {
      const newContact = await addContact(body);
      res.status(201).json({
        newContact: newContact,
      });
    }
  } catch (err) {
    res.status(500).json(`An error occurred: ${err}`);
  }
});

router.delete("/:contactId", async (req, res, next) => {
  try {
    const removedResult = await removeContact(req.params.contactId);
    if (removedResult) {
      res.status(200).json({
        message: "contact deleted",
      });
    } else {
      res.status(404).json({
        message: "Not found",
      });
    }
  } catch (err) {
    res.status(500).json(`An error occurred: ${err}`);
  }
});

router.put("/:contactId", async (req, res, next) => {
  try {
    const body = req.body;
    const resultValidate = schemaValidation.validate(body);

    if (resultValidate.error) {
      res.status(400).json({
        message: resultValidate.error.message,
      });
    } else {
      const updatedContact = await updateContact(req.params.contactId, body);
      if (updatedContact) {
        res.status(201).json({
          updatedContact: updatedContact,
        });
      } else {
        res.status(404).json({
          message: "Not found",
        });
      }
    }
  } catch (err) {
    res.status(500).json(`An error occurred: ${err}`);
  }
});

module.exports = router;
