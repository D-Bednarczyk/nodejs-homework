import express from "express";
export const userRouter = express.Router();
import {
  schemaValidationUser,
  schemaValidationSub,
  schemaValidationToken,
} from "#validators/validators.js";
import { bodyValidate } from "#middlewares/validate.js";
import { auth } from "#middlewares/AuthorizationCheck.js";
import { upload } from "#middlewares/storageMulter.js";
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
userRouter.patch(
  "/avatars",
  auth,
  upload.single("avatar"),
  userControllers.userAvatarUpdate
);

userRouter.get("/verify/:verificationToken", userControllers.userVerifyToken);
userRouter.post(
  "/verify",
  bodyValidate(schemaValidationToken),
  userControllers.userReVerifyToken
);
