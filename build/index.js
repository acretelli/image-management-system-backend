"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var dotenv_1 = __importDefault(require("dotenv"));
var express_1 = __importDefault(require("express"));
var cors_1 = __importDefault(require("cors"));
var userRouter_1 = require("./routes/userRouter");
var imageRouter_1 = require("./routes/imageRouter");
var collectionRouter_1 = require("./routes/collectionRouter");
dotenv_1.default.config();
var app = express_1.default();
app.use(express_1.default.json());
app.use(cors_1.default());
app.use("/user", userRouter_1.userRouter);
app.use("/images", imageRouter_1.imageRouter);
app.use("/collection", collectionRouter_1.collectionRouter);
var server = app.listen(3003, function () {
    if (server) {
        var address = server.address();
        console.log("Servidor rodando em http://localhost:" + address.port);
    }
    else {
        console.error("Falha ao rodar o servidor.");
    }
});
//# sourceMappingURL=index.js.map