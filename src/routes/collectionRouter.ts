import express from "express";
import { CollectionController } from "../controller/CollectionController";

export const collectionRouter = express.Router();

const collectionController = new CollectionController();

collectionRouter.put("/add", collectionController.createCollection);
collectionRouter.get("/all", collectionController.getAllCollections);
collectionRouter.get("/:collectionId", collectionController.getCollectionById);
collectionRouter.delete("/:collectionId/delete", collectionController.deleteCollection);
collectionRouter.delete("/:collectionId/removeImage", collectionController.deleteImageFromCollection);
