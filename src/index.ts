import dotenv from "dotenv";
import {AddressInfo} from "net";
import express from "express";
import fileupload from 'express-fileupload';
import cors from 'cors';
import { userRouter } from "./routes/userRouter";
import { imageRouter } from "./routes/imageRouter";
import { collectionRouter } from "./routes/collectionRouter";
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
app.use(fileupload());

app.use("/user", userRouter);
app.use("/images", imageRouter);
app.use("/collection", collectionRouter);

const server = app.listen(3003, () => {
    if (server) {
      const address = server.address() as AddressInfo;
      console.log(`Servidor rodando em http://localhost:${address.port}`);
    } else {
      console.error(`Falha ao rodar o servidor.`);
    }
});