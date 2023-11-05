import express from "express";
export const userRouter = express.Router();
import { auth } from "../service/AuthorizationCheck.js";

import * as userControllers from "#controllers/users/index.js";

userRouter.post("/signup", userControllers.userSignup);
userRouter.post("/login", userControllers.userLogin);
userRouter.get("/logout", auth, userControllers.userLogout);
userRouter.get("/current", auth, userControllers.userCurrent);
userRouter.patch("/", auth, userControllers.userSetsSubscription);
