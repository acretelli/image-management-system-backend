import express from "express";
import { FileController } from "../controller/FileController";
import { UserController } from "../controller/UserController";

export const userRouter = express.Router();

const userController = new UserController();

userRouter.post("/signup", userController.signup);
userRouter.post("/login", userController.login);
userRouter.get("/profile", userController.getProfile);
userRouter.delete("/delete", userController.deleteUser);
userRouter.get("/search", userController.searchUser);
userRouter.get("/feed", userController.getUserFeed);
userRouter.put("/upload", new FileController().fileUpload);
userRouter.get("/:id", userController.getUserById);
userRouter.post("/:id/follow", userController.followUser);
userRouter.delete("/:id/unfollow", userController.unfollowUser);