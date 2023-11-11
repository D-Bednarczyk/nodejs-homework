import express from "express";
import logger from "morgan";
import cors from "cors";
import { noFound } from "./controllers/errors/noFound.js";
import { internalErr } from "./controllers/errors/internalErr.js";
import { userRouter } from "./api/users.js";
import { router as contactsRouter } from "./api/contacts.js";
import setJWTStrategy from "./service/jwtStrategy.js";

const app = express();

const formatsLogger = app.get("env") === "development" ? "dev" : "short";

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

setJWTStrategy();
app.use("/api/contacts", contactsRouter);
app.use("/api/users", userRouter);

app.use(noFound);

app.use(internalErr);

export default app;
