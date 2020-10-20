import express from "express";
import { UserController } from "../controller/UserController";

export const userRouter = express.Router();

const userController = new UserController();

userRouter.post("/signup", userController.signup);
userRouter.post("/login", userController.login);
userRouter.get("/profile", userController.getProfile);
userRouter.delete("/delete", userController.deleteUser);
userRouter.get("/search", userController.searchUser);
userRouter.get("/feed", userController.getUserFeed);
userRouter.get("/:id", userController.getUserById);
userRouter.post("/:id/follow", userController.followUser);