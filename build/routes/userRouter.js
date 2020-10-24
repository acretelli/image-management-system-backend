"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRouter = void 0;
var express_1 = __importDefault(require("express"));
var FileController_1 = require("../controller/FileController");
var UserController_1 = require("../controller/UserController");
exports.userRouter = express_1.default.Router();
var userController = new UserController_1.UserController();
exports.userRouter.post("/signup", userController.signup);
exports.userRouter.post("/login", userController.login);
exports.userRouter.get("/profile", userController.getProfile);
exports.userRouter.delete("/delete", userController.deleteUser);
exports.userRouter.get("/search", userController.searchUser);
exports.userRouter.get("/feed", userController.getUserFeed);
exports.userRouter.put("/upload", new FileController_1.FileController().fileUpload);
exports.userRouter.get("/:id", userController.getUserById);
exports.userRouter.post("/:id/follow", userController.followUser);
//# sourceMappingURL=userRouter.js.map