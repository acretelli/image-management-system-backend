"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.collectionRouter = void 0;
var express_1 = __importDefault(require("express"));
var CollectionController_1 = require("../controller/CollectionController");
exports.collectionRouter = express_1.default.Router();
var collectionController = new CollectionController_1.CollectionController();
exports.collectionRouter.put("/add", collectionController.createCollection);
exports.collectionRouter.get("/all", collectionController.getAllCollections);
exports.collectionRouter.delete("/delete", collectionController.deleteCollection);
exports.collectionRouter.get("/:collectionId", collectionController.getCollectionById);
//# sourceMappingURL=collectionRouter.js.map