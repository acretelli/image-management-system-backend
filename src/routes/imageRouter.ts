import express from "express";
import { ImageController } from "../controller/ImageController";

export const imageRouter = express.Router();

const imageController = new ImageController();

imageRouter.post("/add", imageController.createImage);
imageRouter.get("/all", imageController.getAllImages);
imageRouter.get("/:imageId", imageController.getImageById);
imageRouter.delete("/:imageId/delete", imageController.deleteImage);