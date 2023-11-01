import express from "express";
export const userRouter = express.Router();

import * as userControllers from "#controllers/users/index.js";
//import * as contactControllers from "#controllers/contacts";

userRouter.post("/signup", userControllers.userSignup);
userRouter.post("/login", userControllers.userLogin);
userRouter.get("/logout", userControllers.userLogout);
userRouter.get("/current", userControllers.userCurrent);
