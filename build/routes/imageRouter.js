"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.imageRouter = void 0;
var express_1 = __importDefault(require("express"));
var ImageController_1 = require("../controller/ImageController");
exports.imageRouter = express_1.default.Router();
var imageController = new ImageController_1.ImageController();
exports.imageRouter.post("/add", imageController.createImage);
exports.imageRouter.get("/all", imageController.getAllImages);
exports.imageRouter.get("/search", imageController.searchImage);
exports.imageRouter.post("/:imageId/addcollection", imageController.addImageToCollection);
exports.imageRouter.delete("/:imageId/deleteFromcollection", imageController.deleteImageFromCollection);
exports.imageRouter.delete("/:imageId/delete", imageController.deleteImage);
exports.imageRouter.get("/:imageId", imageController.getImageById);
//# sourceMappingURL=imageRouter.js.map