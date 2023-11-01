import express from "express";
import logger from "morgan";
import cors from "cors";
import { noFound } from "./controllers/errors/noFound.js";
import { internalErr } from "./controllers/errors/internalErr.js";

import { router as contactsRouter } from "./api/contacts.js";

const app = express();

const formatsLogger = app.get("env") === "development" ? "dev" : "short";

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());

app.use("/api/contacts", contactsRouter);

app.use(noFound);

app.use(internalErr);

export default app;
