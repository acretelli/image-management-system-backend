import express from "express";
import { ImageController } from "../controller/ImageController";

export const imageRouter = express.Router();

const imageController = new ImageController();

imageRouter.post("/add", imageController.createImage);
imageRouter.get("/all", imageController.getAllImages);
imageRouter.get("/search", imageController.searchImage);
imageRouter.post("/:imageId/addcollection", imageController.addImageToCollection);
imageRouter.delete("/:imageId/deleteFromcollection", imageController.deleteImageFromCollection);
imageRouter.delete("/:imageId/delete", imageController.deleteImage);
imageRouter.get("/:imageId", imageController.getImageById);
