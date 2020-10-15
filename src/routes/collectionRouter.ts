import express from "express";
import { CollectionController } from "../controller/CollectionController";

export const collectionRouter = express.Router();

const collectionController = new CollectionController();

collectionRouter.put("/add", collectionController.createCollection);
collectionRouter.get("/all", collectionController.getAllCollections);
collectionRouter.delete("/delete", collectionController.deleteCollection);
collectionRouter.get("/:collectionId", collectionController.getCollectionById);
