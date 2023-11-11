import express from "express";
export const userRouter = express.Router();
import {
  schemaValidationUser,
  schemaValidationSub,
} from "#validators/validators.js";
import { bodyValidate } from "#middlewares/validate.js";
import { auth } from "#middlewares/AuthorizationCheck.js";

import * as userControllers from "#controllers/users/index.js";

userRouter.post(
  "/signup",
  bodyValidate(schemaValidationUser),
  userControllers.userSignup
);
userRouter.post(
  "/login",
  bodyValidate(schemaValidationUser),
  userControllers.userLogin
);
userRouter.get("/logout", auth, userControllers.userLogout);
userRouter.get("/current", auth, userControllers.userCurrent);

userRouter.patch(
  "/",
  bodyValidate(schemaValidationSub),
  auth,
  userControllers.userSetsSubscription
);
