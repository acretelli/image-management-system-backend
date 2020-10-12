import dotenv from "dotenv";
import {AddressInfo} from "net";
import express from "express";
import cors from 'cors';
import { userRouter } from "./routes/userRouter";
import { imageRouter } from "./routes/imageRouter";
import { UserBusiness } from "./business/UserBusiness";
dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

app.use("/user", userRouter);
app.use("/images", imageRouter);

const server = app.listen(3003, () => {
    if (server) {
      const address = server.address() as AddressInfo;
      console.log(`Servidor rodando em http://localhost:${address.port}`);
    } else {
      console.error(`Falha ao rodar o servidor.`);
    }
});